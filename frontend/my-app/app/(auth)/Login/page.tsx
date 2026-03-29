import { useState, useEffect, useRef, CSSProperties } from "react";

// ─────────────────────────────────────────────
//  Types
// ─────────────────────────────────────────────
type Field = "email" | "password";
interface FormState  { email: string; password: string }
interface TouchState { email: boolean; password: boolean }

// ─────────────────────────────────────────────
//  Validation
// ─────────────────────────────────────────────
const validateEmail    = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "hmm, that email looks off";
const validatePassword = (v: string) => v.length >= 8 ? "" : "needs 8+ chars";

// ─────────────────────────────────────────────
//  SVG Icons
// ─────────────────────────────────────────────
const EyeIcon = ({ open }: { open: boolean }) =>
  open ? (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

// ─────────────────────────────────────────────
//  Morphing aurora blobs background
// ─────────────────────────────────────────────
function AuroraCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf: number;
    let t = 0;

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    const blobs = [
      { x: 0.2,  y: 0.25, r: 0.38, color: "rgba(255,75,110,0.18)",  speed: 0.0004, phase: 0 },
      { x: 0.78, y: 0.2,  r: 0.32, color: "rgba(0,230,180,0.15)",   speed: 0.0003, phase: 2 },
      { x: 0.5,  y: 0.75, r: 0.42, color: "rgba(120,60,255,0.14)",  speed: 0.0005, phase: 4 },
      { x: 0.15, y: 0.7,  r: 0.28, color: "rgba(255,180,0,0.10)",   speed: 0.0006, phase: 1 },
      { x: 0.85, y: 0.65, r: 0.30, color: "rgba(0,180,255,0.12)",   speed: 0.00035,phase: 3 },
    ];

    const draw = () => {
      t++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      blobs.forEach(b => {
        const cx = (b.x + Math.sin(t * b.speed + b.phase) * 0.12) * canvas.width;
        const cy = (b.y + Math.cos(t * b.speed + b.phase) * 0.10) * canvas.height;
        const r  = b.r * Math.min(canvas.width, canvas.height) * (1 + Math.sin(t * b.speed * 2) * 0.08);
        const g  = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        g.addColorStop(0, b.color);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      position: "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0
    }}/>
  );
}

// ─────────────────────────────────────────────
//  Animated floating tags (decorative)
// ─────────────────────────────────────────────
const TAGS = ["#vibes ✦", "secure 🔒", "no cap fr", "ur safe here", "lowkey aesthetic", "it's giving 🔥", "#logged", "slay bestie"];

function FloatingTags() {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {TAGS.map((tag, i) => (
        <div key={i} style={{
          position: "absolute",
          left:  `${8 + (i % 4) * 24}%`,
          top:   `${10 + Math.floor(i / 4) * 45}%`,
          fontFamily: "'Syne', sans-serif",
          fontSize: "11px",
          fontWeight: 600,
          color: "rgba(255,255,255,0.07)",
          letterSpacing: "0.05em",
          animation: `floatTag ${6 + i * 0.7}s ease-in-out infinite`,
          animationDelay: `${i * 0.4}s`,
          whiteSpace: "nowrap",
          userSelect: "none",
        }}>{tag}</div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
//  Password strength meter
// ─────────────────────────────────────────────
function StrengthMeter({ password }: { password: string }) {
  const score = Math.min(
    (password.length >= 8 ? 1 : 0) +
    (/[A-Z]/.test(password) ? 1 : 0) +
    (/[0-9]/.test(password) ? 1 : 0) +
    (/[^A-Za-z0-9]/.test(password) ? 1 : 0),
    4
  );
  if (!password) return null;
  const labels = ["", "weak", "okay", "good", "strong 💪"];
  const colors = ["", "#ff4d6d", "#ffbe0b", "#06d6a0", "#00f5d4"];
  return (
    <div style={{ marginTop: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
      <div style={{ display: "flex", gap: "4px", flex: 1 }}>
        {[1,2,3,4].map(n => (
          <div key={n} style={{
            flex: 1, height: "3px", borderRadius: "99px",
            background: n <= score ? colors[score] : "rgba(255,255,255,0.1)",
            transition: "background 0.3s",
          }}/>
        ))}
      </div>
      <span style={{ fontSize: "11px", color: colors[score], fontFamily: "'Syne', sans-serif", fontWeight: 600, minWidth: "60px" }}>
        {labels[score]}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────
//  Main Login Page
// ─────────────────────────────────────────────
export default function LoginPage() {
  const [form,      setForm]      = useState<FormState>({ email: "", password: "" });
  const [errors,    setErrors]    = useState<FormState>({ email: "", password: "" });
  const [touched,   setTouched]   = useState<TouchState>({ email: false, password: false });
  const [focused,   setFocused]   = useState<TouchState>({ email: false, password: false });
  const [showPwd,   setShowPwd]   = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [mounted,   setMounted]   = useState(false);
  const [hoverBtn,  setHoverBtn]  = useState(false);
  const [hoverG,    setHoverG]    = useState(false);

  useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);

  const validate = (f: Field, v: string) =>
    f === "email" ? validateEmail(v) : validatePassword(v);

  const handleChange = (f: Field) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setForm(p => ({ ...p, [f]: v }));
    if (touched[f]) setErrors(p => ({ ...p, [f]: validate(f, v) }));
  };

  const handleBlur = (f: Field) => () => {
    setTouched(p => ({ ...p, [f]: true }));
    setErrors(p => ({ ...p, [f]: validate(f, form[f]) }));
    setFocused(p => ({ ...p, [f]: false }));
  };

  const allValid =
    form.email !== "" && form.password !== "" &&
    validateEmail(form.email) === "" && validatePassword(form.password) === "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    const ee = validate("email", form.email);
    const pe = validate("password", form.password);
    setErrors({ email: ee, password: pe });
    if (ee || pe) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1800));
    setLoading(false);
    setSubmitted(true);
  };

  // ─── Shared input style builder ──────────────
  const inputStyle = (f: Field): CSSProperties => ({
    width: "100%",
    padding: f === "password" ? "14px 48px 14px 18px" : "14px 18px",
    background: "rgba(255,255,255,0.05)",
    border: `1.5px solid ${
      touched[f] && errors[f]
        ? "rgba(255,75,110,0.7)"
        : focused[f]
        ? "rgba(0,230,180,0.6)"
        : "rgba(255,255,255,0.1)"
    }`,
    borderRadius: "16px",
    color: "#fff",
    fontFamily: "'Syne', sans-serif",
    fontSize: "14px",
    fontWeight: 500,
    outline: "none",
    boxShadow: focused[f]
      ? "0 0 0 4px rgba(0,230,180,0.10), inset 0 1px 0 rgba(255,255,255,0.05)"
      : "inset 0 1px 0 rgba(255,255,255,0.04)",
    transition: "border-color 0.2s, box-shadow 0.2s",
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body { background: #080810; }

        ::selection { background: rgba(0,230,180,0.3); }

        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 40px rgba(255,255,255,0.05) inset !important;
          -webkit-text-fill-color: #fff !important;
          caret-color: #00e6b4;
        }
        input::placeholder { color: rgba(255,255,255,0.2); font-size: 13px; }

        @keyframes floatTag {
          0%, 100% { transform: translateY(0px) rotate(-1deg); opacity: 0.6; }
          50%       { transform: translateY(-14px) rotate(1deg); opacity: 1; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes successBounce {
          0%   { transform: scale(0) rotate(-15deg); opacity: 0; }
          60%  { transform: scale(1.15) rotate(4deg); }
          80%  { transform: scale(0.95) rotate(-2deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes pulseRing {
          0%   { box-shadow: 0 0 0 0 rgba(0,230,180,0.4); }
          70%  { box-shadow: 0 0 0 12px rgba(0,230,180,0); }
          100% { box-shadow: 0 0 0 0 rgba(0,230,180,0); }
        }

        .field-row { margin-bottom: 20px; }

        .label-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 10px;
        }
        .field-label {
          font-family: 'Syne', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
        }
        .field-error {
          font-family: 'Syne', sans-serif;
          font-size: 11px;
          font-weight: 500;
          color: #ff6b8a;
          animation: fadeSlideUp 0.2s ease;
        }

        .submit-btn:hover:not(:disabled) { filter: brightness(1.08); }
        .submit-btn:active:not(:disabled) { transform: scale(0.98) !important; }

        .google-btn:hover {
          background: rgba(255,255,255,0.08) !important;
          border-color: rgba(255,255,255,0.2) !important;
        }

        .tag-pill {
          display: inline-flex; align-items: center;
          padding: 4px 12px;
          border-radius: 99px;
          border: 1px solid rgba(255,255,255,0.1);
          font-family: 'Syne', sans-serif;
          font-size: 11px; font-weight: 600;
          color: rgba(255,255,255,0.5);
          background: rgba(255,255,255,0.04);
          letter-spacing: 0.04em;
        }
      `}</style>

      {/* ── Background ── */}
      <div style={{ position: "fixed", inset: 0, background: "#080810", zIndex: -1 }} />
      <AuroraCanvas />
      <FloatingTags />

      {/* ── Grain texture ── */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
        opacity: 0.5,
      }} />

      {/* ── Page shell ── */}
      <div style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        padding: "32px 16px", position: "relative", zIndex: 2,
      }}>
        <div style={{
          width: "100%", maxWidth: "420px",
          opacity:    mounted ? 1 : 0,
          transform:  mounted ? "translateY(0) scale(1)" : "translateY(32px) scale(0.97)",
          transition: "opacity 0.7s cubic-bezier(.22,1,.36,1), transform 0.7s cubic-bezier(.22,1,.36,1)",
        }}>

          {/* ── Card ── */}
          <div style={{
            background: "rgba(255,255,255,0.035)",
            backdropFilter: "blur(40px)",
            WebkitBackdropFilter: "blur(40px)",
            border: "1px solid rgba(255,255,255,0.09)",
            borderRadius: "32px",
            padding: "44px 40px 40px",
            boxShadow: "0 40px 100px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 0 1px rgba(255,255,255,0.03)",
            position: "relative",
            overflow: "hidden",
          }}>

            {/* card inner glow */}
            <div style={{
              position: "absolute", top: "-60px", left: "50%", transform: "translateX(-50%)",
              width: "280px", height: "160px",
              background: "radial-gradient(ellipse, rgba(0,230,180,0.08) 0%, transparent 70%)",
              pointerEvents: "none",
            }} />

            {/* ── Success screen ── */}
            {submitted && (
              <div style={{
                position: "absolute", inset: 0, borderRadius: "32px",
                background: "rgba(8,8,16,0.96)",
                backdropFilter: "blur(20px)",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                gap: "20px", zIndex: 20,
                animation: "fadeSlideUp 0.35s ease forwards",
              }}>
                <div style={{
                  width: "72px", height: "72px", borderRadius: "50%",
                  background: "linear-gradient(135deg, #00e6b4, #00c9ff)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  animation: "successBounce 0.6s cubic-bezier(.175,.885,.32,1.275) forwards, pulseRing 1.5s ease 0.6s",
                }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#080810" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{
                    fontFamily: "'Instrument Serif', serif", fontStyle: "italic",
                    fontSize: "28px", color: "#fff", marginBottom: "8px",
                  }}>you're in ✦</div>
                  <p style={{
                    fontFamily: "'Syne', sans-serif", fontSize: "13px",
                    color: "rgba(255,255,255,0.4)", lineHeight: 1.6,
                  }}>redirecting to your space…</p>
                </div>
              </div>
            )}

            {/* ── Header ── */}
            <div style={{ marginBottom: "32px" }}>
              {/* Logo */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "32px" }}>
                <div style={{
                  width: "36px", height: "36px", borderRadius: "12px",
                  background: "linear-gradient(135deg, #ff4d6d, #ff9a3c)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 4px 16px rgba(255,77,109,0.4)",
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                  </svg>
                </div>
                <span style={{
                  fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "16px",
                  color: "#fff", letterSpacing: "-0.3px",
                }}>nexus</span>
                <span className="tag-pill" style={{ marginLeft: "auto" }}>beta ✦</span>
              </div>

              {/* Heading */}
              <h1 style={{
                fontFamily: "'Instrument Serif', serif", fontStyle: "italic",
                fontSize: "38px", fontWeight: 400, color: "#fff",
                lineHeight: 1.1, letterSpacing: "-0.5px", marginBottom: "8px",
              }}>
                welcome<br/>
                <span style={{
                  background: "linear-gradient(90deg, #00e6b4, #00c9ff, #a78bfa)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "shimmer 4s linear infinite",
                }}>back.</span>
              </h1>
              <p style={{
                fontFamily: "'Syne', sans-serif", fontSize: "13px",
                color: "rgba(255,255,255,0.38)", lineHeight: 1.6,
              }}>
                sign in to pick up where you left off
              </p>
            </div>

            {/* ── Form ── */}
            <form onSubmit={handleSubmit} noValidate>

              {/* Email */}
              <div className="field-row">
                <div className="label-row">
                  <span className="field-label">Email</span>
                  {touched.email && errors.email && (
                    <span className="field-error">↳ {errors.email}</span>
                  )}
                </div>
                <input
                  type="email" autoComplete="email" placeholder="you@somewhere.com"
                  value={form.email}
                  onChange={handleChange("email")}
                  onBlur={handleBlur("email")}
                  onFocus={() => setFocused(f => ({ ...f, email: true }))}
                  style={inputStyle("email")}
                  disabled={loading || submitted}
                />
              </div>

              {/* Password */}
              <div className="field-row">
                <div className="label-row">
                  <span className="field-label">Password</span>
                  {touched.password && errors.password && (
                    <span className="field-error">↳ {errors.password}</span>
                  )}
                </div>
                <div style={{ position: "relative" }}>
                  <input
                    type={showPwd ? "text" : "password"}
                    autoComplete="current-password" placeholder="min. 8 characters"
                    value={form.password}
                    onChange={handleChange("password")}
                    onBlur={handleBlur("password")}
                    onFocus={() => setFocused(f => ({ ...f, password: true }))}
                    style={inputStyle("password")}
                    disabled={loading || submitted}
                  />
                  <button type="button"
                    onClick={() => setShowPwd(v => !v)}
                    style={{
                      position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)",
                      background: "none", border: "none", cursor: "pointer",
                      color: showPwd ? "rgba(0,230,180,0.8)" : "rgba(255,255,255,0.3)",
                      display: "flex", alignItems: "center", transition: "color 0.2s",
                    }}
                  >
                    <EyeIcon open={showPwd} />
                  </button>
                </div>
                <StrengthMeter password={form.password} />
              </div>

              {/* Forgot */}
              <div style={{ textAlign: "right", marginBottom: "28px", marginTop: "-4px" }}>
                <button type="button" style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontFamily: "'Syne', sans-serif", fontSize: "12px", fontWeight: 600,
                  color: "rgba(167,139,250,0.8)", letterSpacing: "0.02em",
                  transition: "color 0.2s",
                }}>
                  forgot password?
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="submit-btn"
                disabled={loading || submitted || !allValid}
                onMouseEnter={() => setHoverBtn(true)}
                onMouseLeave={() => setHoverBtn(false)}
                style={{
                  width: "100%", padding: "15px",
                  borderRadius: "16px", border: "none",
                  fontFamily: "'Syne', sans-serif", fontSize: "14px", fontWeight: 800,
                  letterSpacing: "0.06em", textTransform: "uppercase",
                  cursor: allValid && !loading ? "pointer" : "not-allowed",
                  background: allValid && !loading
                    ? "linear-gradient(135deg, #00e6b4 0%, #00c9ff 50%, #a78bfa 100%)"
                    : "rgba(255,255,255,0.06)",
                  color: allValid && !loading ? "#080810" : "rgba(255,255,255,0.25)",
                  boxShadow: allValid && !loading && hoverBtn
                    ? "0 8px 32px rgba(0,230,180,0.4)"
                    : allValid && !loading
                    ? "0 4px 20px rgba(0,230,180,0.25)"
                    : "none",
                  transform: hoverBtn && allValid && !loading ? "translateY(-2px)" : "translateY(0)",
                  transition: "all 0.25s cubic-bezier(.22,1,.36,1)",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  marginBottom: "16px",
                } as CSSProperties}
              >
                {loading ? (
                  <>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
                      stroke="rgba(8,8,16,0.6)" strokeWidth="2.5" strokeLinecap="round"
                      style={{ animation: "spin 0.7s linear infinite" }}>
                      <path d="M21 12a9 9 0 0 0-9-9"/>
                      <path d="M21 12a9 9 0 1 1-18 0" strokeOpacity="0.2"/>
                    </svg>
                    signing in…
                  </>
                ) : "sign in →"}
              </button>

              {/* Divider */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.07)" }}/>
                <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.25)", fontWeight: 600 }}>or</span>
                <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.07)" }}/>
              </div>

              {/* Google */}
              <button
                type="button"
                className="google-btn"
                onMouseEnter={() => setHoverG(true)}
                onMouseLeave={() => setHoverG(false)}
                style={{
                  width: "100%", padding: "13px",
                  borderRadius: "16px",
                  border: "1.5px solid rgba(255,255,255,0.1)",
                  background: hoverG ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.04)",
                  color: "rgba(255,255,255,0.75)",
                  fontFamily: "'Syne', sans-serif", fontSize: "13px", fontWeight: 700,
                  letterSpacing: "0.04em", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                  transition: "all 0.2s",
                  marginBottom: "32px",
                } as CSSProperties}
              >
                <GoogleIcon />
                continue with google
              </button>
            </form>

            {/* Sign up */}
            <div style={{
              textAlign: "center",
              fontFamily: "'Syne', sans-serif", fontSize: "13px",
              color: "rgba(255,255,255,0.35)",
            }}>
              new here?{" "}
              <button type="button" style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "inherit", fontSize: "inherit", fontWeight: 700,
                color: "rgba(167,139,250,0.9)",
                transition: "color 0.2s",
              }}>
                create a free account ✦
              </button>
            </div>

          </div>

          {/* ── Below-card hint ── */}
          <p style={{
            textAlign: "center", marginTop: "20px",
            fontFamily: "'Syne', sans-serif", fontSize: "11px",
            color: "rgba(255,255,255,0.18)", letterSpacing: "0.04em",
          }}>
            🔒 end-to-end encrypted · no ads · no bs
          </p>
        </div>
      </div>
    </>
  );
}
