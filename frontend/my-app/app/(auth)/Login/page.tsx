import { useState, useEffect, CSSProperties } from "react";

// ─────────────────────────────────────────────
//  Types
// ─────────────────────────────────────────────
type Field = "email" | "password";
interface FormState  { email: string; password: string }
interface TouchState { email: boolean; password: boolean }

// ─────────────────────────────────────────────
//  Validation
// ─────────────────────────────────────────────
const validateEmail    = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "not valid babe";
const validatePassword = (v: string) => v.length >= 8 ? "" : "too short (8+ chars)";

// ─────────────────────────────────────────────
//  Icons
// ─────────────────────────────────────────────
const EyeIcon = ({ open }: { open: boolean }) =>
  open ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );

const GoogleIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

// ─────────────────────────────────────────────
//  Sticker component
// ─────────────────────────────────────────────
function Sticker({ text, style }: { text: string; style: CSSProperties }) {
  return (
    <div style={{
      position: "absolute",
      fontFamily: "'Cabin', sans-serif",
      fontWeight: 800,
      fontSize: "11px",
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      padding: "5px 10px",
      border: "2px solid #0a0a0a",
      userSelect: "none",
      pointerEvents: "none",
      zIndex: 10,
      lineHeight: 1.2,
      ...style,
    }}>{text}</div>
  );
}

// ─────────────────────────────────────────────
//  Marquee strip
// ─────────────────────────────────────────────
function Marquee({ text, bg, fg, rotate = 0 }: { text: string; bg: string; fg: string; rotate?: number }) {
  const repeated = Array(12).fill(text).join("  ✶  ");
  return (
    <div style={{
      overflow: "hidden",
      background: bg,
      borderTop: "2.5px solid #0a0a0a",
      borderBottom: "2.5px solid #0a0a0a",
      padding: "7px 0",
      transform: `rotate(${rotate}deg)`,
      transformOrigin: "center",
      whiteSpace: "nowrap",
    }}>
      <div style={{
        display: "inline-block",
        animation: "scrollLeft 18s linear infinite",
        fontFamily: "'Cabin', sans-serif",
        fontWeight: 800,
        fontSize: "12px",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: fg,
      }}>{repeated}&nbsp;&nbsp;&nbsp;{repeated}</div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  Main
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
  const [ticks,     setTicks]     = useState(0);

  useEffect(() => { setTimeout(() => setMounted(true), 60); }, []);

  // ticking clock for live timestamp display
  useEffect(() => {
    const id = setInterval(() => setTicks(t => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

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
    await new Promise(r => setTimeout(r, 1600));
    setLoading(false);
    setSubmitted(true);
  };

  const inputStyle = (f: Field): CSSProperties => ({
    width: "100%",
    padding: "13px 16px",
    background: "#fffef7",
    border: `3px solid ${touched[f] && errors[f] ? "#ff1744" : focused[f] ? "#ff2d78" : "#0a0a0a"}`,
    borderRadius: "0px",
    fontFamily: "'Cabin', sans-serif",
    fontWeight: 600,
    fontSize: "15px",
    color: "#0a0a0a",
    outline: "none",
    boxShadow: focused[f] ? "4px 4px 0 #ff2d78" : "4px 4px 0 #0a0a0a",
    transition: "border-color 0.15s, box-shadow 0.15s",
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cabin:ital,wght@0,400;0,600;0,700;0,800;1,700&family=Bebas+Neue&family=DM+Serif+Display:ital@1&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body { background: #f5f0e8; }

        ::selection { background: #ffe600; color: #0a0a0a; }

        input::placeholder { color: #b0a89a; font-size: 13px; font-style: italic; }
        input:focus { outline: none; }
        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 40px #fffef7 inset !important;
          -webkit-text-fill-color: #0a0a0a !important;
        }

        @keyframes scrollLeft {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes popBounce {
          0%  { transform: scale(0) rotate(-10deg); }
          60% { transform: scale(1.12) rotate(3deg); }
          80% { transform: scale(0.96) rotate(-1deg); }
          100%{ transform: scale(1) rotate(0); }
        }
        @keyframes wiggle {
          0%,100% { transform: rotate(-2deg); }
          50%     { transform: rotate(2deg); }
        }
        @keyframes stampIn {
          from { transform: scale(2) rotate(-20deg); opacity: 0; }
          to   { transform: scale(1) rotate(-8deg); opacity: 1; }
        }

        .submit-btn:hover:not(:disabled) {
          transform: translate(-2px, -2px) !important;
          box-shadow: 6px 6px 0 #0a0a0a !important;
        }
        .submit-btn:active:not(:disabled) {
          transform: translate(2px, 2px) !important;
          box-shadow: 2px 2px 0 #0a0a0a !important;
        }
        .google-btn:hover {
          background: #ffe600 !important;
        }
        .signup-link:hover { text-decoration: underline; }
      `}</style>

      {/* ── Page bg with dot pattern ── */}
      <div style={{
        minHeight: "100vh",
        background: "#f5f0e8",
        backgroundImage: "radial-gradient(circle, #c8bfb0 1px, transparent 1px)",
        backgroundSize: "24px 24px",
        fontFamily: "'Cabin', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}>

        {/* Top marquee */}
        <div style={{ position: "relative", zIndex: 5 }}>
          <Marquee text="nexus app · sign in now · welcome back · secure login · your space" bg="#ff2d78" fg="#fffef7" />
        </div>

        {/* ── Main grid ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr minmax(0, 480px) 1fr",
          gridTemplateRows: "auto",
          minHeight: "calc(100vh - 36px)",
          gap: 0,
        }}>

          {/* Left column – editorial decoration */}
          <div style={{
            borderRight: "3px solid #0a0a0a",
            padding: "40px 28px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            overflow: "hidden",
          }}>
            {/* Big rotated number */}
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(80px, 12vw, 160px)",
              lineHeight: 0.85,
              color: "#ffe600",
              WebkitTextStroke: "3px #0a0a0a",
              userSelect: "none",
              animation: mounted ? "fadeUp 0.6s ease 0.1s both" : "none",
            }}>01</div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(14px, 2vw, 22px)",
                letterSpacing: "0.12em",
                color: "#0a0a0a",
                lineHeight: 1.3,
                animation: mounted ? "fadeUp 0.6s ease 0.2s both" : "none",
              }}>
                THE ONLY<br/>
                APP YOU<br/>
                NEED. FR.
              </div>
              <div style={{
                display: "flex", gap: "6px", flexWrap: "wrap",
                animation: mounted ? "fadeUp 0.6s ease 0.3s both" : "none",
              }}>
                {["🔥 trending", "✦ new drop", "💅 exclusive"].map(tag => (
                  <span key={tag} style={{
                    display: "inline-block",
                    background: "#0a0a0a",
                    color: "#f5f0e8",
                    fontFamily: "'Cabin', sans-serif",
                    fontWeight: 700,
                    fontSize: "10px",
                    letterSpacing: "0.06em",
                    padding: "4px 8px",
                    textTransform: "uppercase",
                  }}>{tag}</span>
                ))}
              </div>
              {/* Live clock */}
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(12px, 1.8vw, 18px)",
                letterSpacing: "0.08em",
                color: "#888078",
                animation: mounted ? "fadeUp 0.6s ease 0.4s both" : "none",
              }}>{timeStr}</div>
            </div>
          </div>

          {/* ── Center – form ── */}
          <div style={{
            borderRight: "3px solid #0a0a0a",
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}>

            {/* Top bar */}
            <div style={{
              borderBottom: "3px solid #0a0a0a",
              padding: "16px 32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "#fffef7",
            }}>
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "22px", letterSpacing: "0.1em" }}>NEXUS</span>
              <span style={{
                background: "#ffe600",
                border: "2px solid #0a0a0a",
                fontFamily: "'Cabin', sans-serif",
                fontWeight: 800,
                fontSize: "10px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "3px 10px",
              }}>v2.0 beta</span>
            </div>

            {/* Form area */}
            <div style={{
              flex: 1,
              padding: "40px 32px 40px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              position: "relative",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.65s cubic-bezier(.22,1,.36,1), transform 0.65s cubic-bezier(.22,1,.36,1)",
            }}>

              {/* Stickers */}
              <Sticker text="🌟 hot" style={{ top: "16px", right: "28px", background: "#ff2d78", color: "#fff", transform: "rotate(6deg)", animation: "wiggle 3s ease-in-out infinite" }} />

              {/* Heading */}
              <div style={{ marginBottom: "32px" }}>
                <div style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontStyle: "italic",
                  fontSize: "clamp(42px, 6vw, 64px)",
                  lineHeight: 0.9,
                  color: "#0a0a0a",
                  marginBottom: "4px",
                  letterSpacing: "-1px",
                }}>
                  Sign<br/>
                  <span style={{ WebkitTextStroke: "2px #0a0a0a", color: "transparent" }}>back</span>{" "}
                  <span style={{ color: "#ff2d78" }}>in.</span>
                </div>
                <p style={{
                  fontFamily: "'Cabin', sans-serif",
                  fontWeight: 600,
                  fontSize: "13px",
                  color: "#888078",
                  letterSpacing: "0.04em",
                  marginTop: "10px",
                }}>
                  your crew is waiting ✦
                </p>
              </div>

              {/* ── SUCCESS ── */}
              {submitted ? (
                <div style={{
                  textAlign: "center",
                  padding: "32px 0",
                  animation: "fadeUp 0.4s ease",
                }}>
                  <div style={{
                    width: "80px", height: "80px",
                    background: "#ffe600",
                    border: "3px solid #0a0a0a",
                    boxShadow: "5px 5px 0 #0a0a0a",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 20px",
                    animation: "popBounce 0.5s cubic-bezier(.175,.885,.32,1.275) forwards",
                  }}>
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "36px", letterSpacing: "0.08em", color: "#0a0a0a", marginBottom: "6px" }}>
                    YOU'RE IN!
                  </div>
                  <p style={{ fontFamily: "'Cabin', sans-serif", fontWeight: 600, fontSize: "13px", color: "#888078" }}>
                    redirecting now…
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>

                  {/* Email */}
                  <div style={{ marginBottom: "24px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px" }}>
                      <label style={{
                        fontFamily: "'Cabin', sans-serif", fontWeight: 800, fontSize: "11px",
                        letterSpacing: "0.12em", textTransform: "uppercase", color: "#0a0a0a",
                      }}>Email address</label>
                      {touched.email && errors.email && (
                        <span style={{
                          fontFamily: "'Cabin', sans-serif", fontWeight: 700, fontSize: "11px",
                          color: "#ff1744", fontStyle: "italic",
                          animation: "fadeUp 0.2s ease",
                        }}>⚠ {errors.email}</span>
                      )}
                    </div>
                    <input
                      type="email" autoComplete="email" placeholder="your@email.com"
                      value={form.email}
                      onChange={handleChange("email")}
                      onBlur={handleBlur("email")}
                      onFocus={() => setFocused(f => ({ ...f, email: true }))}
                      style={inputStyle("email")}
                      disabled={loading}
                    />
                  </div>

                  {/* Password */}
                  <div style={{ marginBottom: "10px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px" }}>
                      <label style={{
                        fontFamily: "'Cabin', sans-serif", fontWeight: 800, fontSize: "11px",
                        letterSpacing: "0.12em", textTransform: "uppercase", color: "#0a0a0a",
                      }}>Password</label>
                      {touched.password && errors.password && (
                        <span style={{
                          fontFamily: "'Cabin', sans-serif", fontWeight: 700, fontSize: "11px",
                          color: "#ff1744", fontStyle: "italic",
                          animation: "fadeUp 0.2s ease",
                        }}>⚠ {errors.password}</span>
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
                        style={{ ...inputStyle("password"), paddingRight: "48px" }}
                        disabled={loading}
                      />
                      <button type="button" onClick={() => setShowPwd(v => !v)} style={{
                        position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)",
                        background: "none", border: "none", cursor: "pointer",
                        color: showPwd ? "#ff2d78" : "#888078",
                        display: "flex", alignItems: "center",
                        transition: "color 0.15s",
                      }}>
                        <EyeIcon open={showPwd} />
                      </button>
                    </div>
                  </div>

                  {/* Forgot */}
                  <div style={{ textAlign: "right", marginBottom: "28px" }}>
                    <button type="button" style={{
                      background: "none", border: "none", cursor: "pointer",
                      fontFamily: "'Cabin', sans-serif", fontWeight: 700,
                      fontSize: "12px", color: "#888078",
                      textDecoration: "underline", textDecorationStyle: "dotted",
                    }}>forgot password?</button>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="submit-btn"
                    disabled={loading || !allValid}
                    style={{
                      width: "100%", padding: "16px",
                      border: "3px solid #0a0a0a",
                      borderRadius: "0px",
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "20px", letterSpacing: "0.15em",
                      cursor: allValid && !loading ? "pointer" : "not-allowed",
                      background: allValid && !loading ? "#ff2d78" : "#e0d8cc",
                      color: allValid && !loading ? "#fffef7" : "#a8a090",
                      boxShadow: allValid && !loading ? "4px 4px 0 #0a0a0a" : "4px 4px 0 #c8bfb0",
                      transform: "translate(0, 0)",
                      transition: "all 0.15s",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                      marginBottom: "20px",
                    } as CSSProperties}
                  >
                    {loading ? (
                      <>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="3" strokeLinecap="round"
                          style={{ animation: "spin 0.7s linear infinite" }}>
                          <path d="M21 12a9 9 0 0 0-9-9"/>
                          <path d="M21 12a9 9 0 1 1-18 0" strokeOpacity="0.25"/>
                        </svg>
                        LOADING...
                      </>
                    ) : "SIGN IN NOW →"}
                  </button>

                  {/* Divider */}
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                    <div style={{ flex: 1, height: "2px", background: "#0a0a0a" }}/>
                    <span style={{ fontFamily: "'Cabin', sans-serif", fontWeight: 800, fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" }}>or</span>
                    <div style={{ flex: 1, height: "2px", background: "#0a0a0a" }}/>
                  </div>

                  {/* Google */}
                  <button
                    type="button"
                    className="google-btn"
                    style={{
                      width: "100%", padding: "13px",
                      border: "3px solid #0a0a0a",
                      borderRadius: "0px",
                      background: "#fffef7",
                      fontFamily: "'Cabin', sans-serif", fontWeight: 800,
                      fontSize: "13px", letterSpacing: "0.06em", textTransform: "uppercase",
                      cursor: "pointer",
                      boxShadow: "4px 4px 0 #0a0a0a",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                      transition: "background 0.15s",
                      color: "#0a0a0a",
                      marginBottom: "28px",
                    } as CSSProperties}
                  >
                    <GoogleIcon />
                    Continue with Google
                  </button>
                </form>
              )}

              {/* Sign up */}
              {!submitted && (
                <div style={{
                  borderTop: "2px dashed #c8bfb0",
                  paddingTop: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}>
                  <span style={{ fontFamily: "'Cabin', sans-serif", fontWeight: 600, fontSize: "12px", color: "#888078" }}>
                    no account?
                  </span>
                  <button
                    type="button"
                    className="signup-link"
                    style={{
                      background: "#ffe600",
                      border: "2.5px solid #0a0a0a",
                      boxShadow: "3px 3px 0 #0a0a0a",
                      padding: "6px 16px",
                      fontFamily: "'Cabin', sans-serif",
                      fontWeight: 800, fontSize: "12px",
                      letterSpacing: "0.06em", textTransform: "uppercase",
                      cursor: "pointer",
                      color: "#0a0a0a",
                      transition: "box-shadow 0.15s, transform 0.15s",
                    }}
                  >
                    join free →
                  </button>
                </div>
              )}
            </div>

            {/* Bottom marquee on card */}
            <Marquee text="free forever · no ads · open source · built different · stay locked in" bg="#ffe600" fg="#0a0a0a" />
          </div>

          {/* Right column – editorial decoration */}
          <div style={{
            padding: "40px 28px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-end",
            position: "relative",
            overflow: "hidden",
          }}>

            {/* Stamp */}
            <div style={{
              background: "#ff2d78",
              border: "3px solid #0a0a0a",
              borderRadius: "50%",
              width: "100px", height: "100px",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              transform: "rotate(-8deg)",
              boxShadow: "4px 4px 0 #0a0a0a",
              animation: mounted ? "stampIn 0.5s cubic-bezier(.175,.885,.32,1.275) 0.3s both" : "none",
              cursor: "default",
              userSelect: "none",
            }}>
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "13px", letterSpacing: "0.1em", color: "#fffef7", lineHeight: 1.1, textAlign: "center" }}>100%<br/>FREE</span>
            </div>

            {/* Big number bottom */}
            <div style={{ textAlign: "right" }}>
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(80px, 12vw, 160px)",
                lineHeight: 0.85,
                color: "transparent",
                WebkitTextStroke: "3px #0a0a0a",
                userSelect: "none",
                animation: mounted ? "fadeUp 0.6s ease 0.15s both" : "none",
              }}>24</div>

              <div style={{
                marginTop: "16px",
                display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px",
              }}>
                {[
                  { dot: "#ff2d78", label: "No tracking" },
                  { dot: "#ffe600", label: "No data selling" },
                  { dot: "#00e676", label: "End-to-end encrypted" },
                ].map(item => (
                  <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{
                      fontFamily: "'Cabin', sans-serif", fontWeight: 700, fontSize: "11px",
                      color: "#0a0a0a", letterSpacing: "0.04em",
                    }}>{item.label}</span>
                    <div style={{
                      width: "10px", height: "10px",
                      background: item.dot,
                      border: "2px solid #0a0a0a",
                      borderRadius: "50%",
                      flexShrink: 0,
                    }}/>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "3px solid #0a0a0a",
          background: "#0a0a0a",
          padding: "10px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <span style={{ fontFamily: "'Cabin', sans-serif", fontWeight: 700, fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#888078" }}>
            © 2025 Nexus Inc.
          </span>
          <span style={{ fontFamily: "'Cabin', sans-serif", fontWeight: 700, fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#888078" }}>
            Privacy · Terms · Contact
          </span>
        </div>
      </div>
    </>
  );
}
