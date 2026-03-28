"use client";
import { useState, useEffect, useRef, useCallback } from "react";

type FormState = { name: string; email: string; password: string };
type Errors = { name?: string; email?: string; password?: string; agreed?: string };

const CheckIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const EyeIcon = ({ open }: { open: boolean }) =>
  open ? (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );

const PasswordStrength = ({ password }: { password: string }) => {
  const checks = [
    { label: "8+ chars", pass: password.length >= 8 },
    { label: "Uppercase", pass: /[A-Z]/.test(password) },
    { label: "Number", pass: /\d/.test(password) },
    { label: "Symbol", pass: /[^a-zA-Z0-9]/.test(password) },
  ];
  const score = checks.filter(c => c.pass).length;
  const colors = ["#e63946", "#f4a261", "#e9c46a", "#52b788"];
  const labels = ["Weak", "Fair", "Good", "Strong"];
  if (!password) return null;
  return (
    <div style={{ marginTop: "14px" }}>
      <div style={{ display: "flex", gap: "5px", marginBottom: "10px" }}>
        {[0, 1, 2, 3].map(i => (
          <div key={i} style={{
            flex: 1, height: "2px",
            background: i < score ? colors[score - 1] : "rgba(255,255,255,0.1)",
            transition: "background 0.4s ease", borderRadius: "2px",
          }} />
        ))}
      </div>
      <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
        {checks.map((c, i) => (
          <span key={i} style={{
            fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase",
            color: c.pass ? "#52b788" : "rgba(255,255,255,0.3)",
            display: "flex", alignItems: "center", gap: "4px",
            transition: "color 0.3s ease",
          }}>
            {c.pass && <CheckIcon />}{c.label}
          </span>
        ))}
        {score > 0 && (
          <span style={{
            marginLeft: "auto", fontSize: "10px", letterSpacing: "0.14em",
            textTransform: "uppercase", color: colors[score - 1], fontWeight: 600,
            transition: "color 0.4s",
          }}>{labels[score - 1]}</span>
        )}
      </div>
    </div>
  );
};

export default function SignupPage() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMouse({ x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height });
  }, []);

  const validate = (): Errors => {
    const e: Errors = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Enter a valid email";
    if (form.password.length < 8) e.password = "Minimum 8 characters";
    if (!agreed) e.agreed = "You must accept the terms";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1600));
    setSubmitting(false);
    setSubmitted(true);
  };

  const handleChange = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const getInputStyle = (field: string): React.CSSProperties => ({
    width: "100%",
    background: focusedField === field ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.03)",
    border: "none",
    borderBottom: `1px solid ${focusedField === field ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.15)"}`,
    padding: "14px 0",
    fontSize: "14px", color: "#f5f2ec", outline: "none",
    fontFamily: "'Playfair Display', Georgia, serif",
    letterSpacing: "0.02em", boxSizing: "border-box" as const,
    transition: "background 0.3s ease, border-color 0.3s ease",
    caretColor: "#f5f2ec",
  });

  if (submitted) {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500&display=swap');
          @keyframes successReveal { from{opacity:0;transform:scale(0.94)} to{opacity:1;transform:scale(1)} }
          * { box-sizing:border-box; margin:0; padding:0; }
        `}</style>
        <div style={{ minHeight:"100vh", background:"#0d0b09", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'DM Sans',sans-serif" }}>
          <div style={{ textAlign:"center", animation:"successReveal 0.9s ease forwards" }}>
            <div style={{ fontSize:"9px", letterSpacing:"0.35em", textTransform:"uppercase", color:"rgba(255,255,255,0.3)", marginBottom:"32px" }}>Account created</div>
            <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"clamp(64px,10vw,112px)", lineHeight:0.88, color:"#f5f2ec", fontStyle:"italic", fontWeight:400, marginBottom:"32px" }}>
              You're<br/>in.
            </div>
            <div style={{ fontSize:"9px", letterSpacing:"0.25em", textTransform:"uppercase", color:"rgba(255,255,255,0.18)" }}>Welcome to the club</div>
          </div>
        </div>
      </>
    );
  }

  const orbData = [
    { size: 500, bx: 15, by: 20, color: "rgba(110,70,50,0.2)", speed: 0.055 },
    { size: 380, bx: 72, by: 62, color: "rgba(50,70,110,0.16)", speed: 0.04 },
    { size: 300, bx: 48, by: 82, color: "rgba(70,95,70,0.12)", speed: 0.075 },
  ];

  const tickerWords = ["Creative","·","Visionary","·","Maker","·","Innovator","·","Builder","·","Thinker","·"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        ::placeholder { color:rgba(255,255,255,0.18) !important; font-style:italic; }
        @keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-5px)} 75%{transform:translateX(5px)} }
        @keyframes scanline { from{transform:translateY(-150px)} to{transform:translateY(110vh)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulseDot { 0%,100%{opacity:0.35;transform:scale(1)} 50%{opacity:1;transform:scale(1.5)} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes shimmer { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        .mag-btn:not(:disabled):hover { background:rgba(255,255,255,0.12) !important; border-color:rgba(255,255,255,0.38) !important; letter-spacing:0.28em !important; }
        .mag-btn:not(:disabled):active { transform:scale(0.98) !important; }
        .ticker-track { overflow:hidden; }
        .ticker-inner { display:flex; white-space:nowrap; animation:ticker 22s linear infinite; }
        .ticker-inner:hover { animation-play-state:paused; }
        .link-hover { transition:color 0.2s,border-color 0.2s; }
        .link-hover:hover { color:rgba(255,255,255,0.85) !important; border-bottom-color:rgba(255,255,255,0.5) !important; }
      `}</style>

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        style={{ minHeight:"100vh", background:"#0d0b09", display:"grid", gridTemplateColumns:"1fr 1fr", fontFamily:"'DM Sans',sans-serif", position:"relative", overflow:"hidden" }}
      >
        {/* Mouse-tracking ambient orbs */}
        {mounted && orbData.map((orb, i) => (
          <div key={i} style={{
            position:"fixed",
            width:orb.size, height:orb.size, borderRadius:"50%",
            background:orb.color, filter:"blur(90px)", pointerEvents:"none",
            left:`${orb.bx + (mouse.x - 0.5) * orb.speed * 100}%`,
            top:`${orb.by + (mouse.y - 0.5) * orb.speed * 100}%`,
            transform:"translate(-50%,-50%)",
            transition:"left 1.4s cubic-bezier(0.23,1,0.32,1), top 1.4s cubic-bezier(0.23,1,0.32,1)",
            zIndex:0,
          }} />
        ))}

        {/* Scanline grid overlay */}
        <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:1, background:"repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.025) 2px,rgba(0,0,0,0.025) 4px)" }} />

        {/* Moving light sweep */}
        <div style={{ position:"fixed", left:0, right:0, height:"150px", pointerEvents:"none", zIndex:1, background:"linear-gradient(transparent,rgba(255,255,255,0.014),transparent)", animation:"scanline 9s linear infinite" }} />

        {/* Center divider */}
        <div style={{ position:"absolute", left:"50%", top:"8%", bottom:"8%", width:"1px", background:"linear-gradient(to bottom,transparent,rgba(255,255,255,0.08) 25%,rgba(255,255,255,0.08) 75%,transparent)", zIndex:2 }} />

        {/* ── LEFT PANEL ── */}
        <div style={{ padding:"clamp(48px,6vw,88px)", display:"flex", flexDirection:"column", justifyContent:"space-between", position:"relative", zIndex:3 }}>

          {/* Top row */}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", animation:"fadeUp 0.6s ease 0.1s both" }}>
            <span style={{ fontSize:"9px", letterSpacing:"0.3em", textTransform:"uppercase", color:"rgba(255,255,255,0.22)" }}>Est. 2025</span>
            <div style={{ display:"flex", gap:"7px", alignItems:"center" }}>
              {[0, 0.35, 0.7].map((d, i) => (
                <div key={i} style={{ width:"5px", height:"5px", borderRadius:"50%", background:"rgba(255,255,255,0.28)", animation:`pulseDot 2.2s ease ${d}s infinite` }} />
              ))}
            </div>
          </div>

          {/* Headline */}
          <div style={{ animation:"fadeUp 0.8s ease 0.22s both" }}>
            <div style={{ fontSize:"9px", letterSpacing:"0.3em", textTransform:"uppercase", color:"rgba(255,255,255,0.26)", marginBottom:"28px" }}>Members only</div>
            <h1 style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"clamp(56px,5.8vw,92px)", fontWeight:900, lineHeight:0.9, color:"#f5f2ec", letterSpacing:"-0.025em" }}>
              Begin<br />
              <span style={{ fontStyle:"italic", fontWeight:400, color:"rgba(255,255,255,0.48)" }}>your</span><br />
              story.
            </h1>

            {/* Shimmer line */}
            <div style={{ marginTop:"28px", position:"relative", height:"1px", width:"100%", maxWidth:"280px", overflow:"hidden" }}>
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.55),transparent)", backgroundSize:"200% 100%", animation:"shimmer 3.5s linear infinite" }} />
            </div>

            <p style={{ marginTop:"24px", fontSize:"13px", lineHeight:1.85, color:"rgba(255,255,255,0.32)", maxWidth:"280px", fontWeight:300, letterSpacing:"0.01em" }}>
              Join a curated community of thinkers, makers, and doers who move the world forward.
            </p>
          </div>

          {/* Ticker */}
          <div style={{ animation:"fadeUp 0.7s ease 0.5s both" }}>
            <div style={{ height:"1px", background:"rgba(255,255,255,0.06)", marginBottom:"18px" }} />
            <div className="ticker-track">
              <div className="ticker-inner" style={{ color:"rgba(255,255,255,0.16)", fontSize:"9px", letterSpacing:"0.25em", textTransform:"uppercase" }}>
                {[...tickerWords, ...tickerWords].map((w, i) => <span key={i} style={{ marginRight:"22px" }}>{w}</span>)}
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div style={{ padding:"clamp(48px,6vw,88px)", display:"flex", flexDirection:"column", justifyContent:"center", position:"relative", zIndex:3 }}>

          {/* Header */}
          <div style={{ marginBottom:"44px", animation:"fadeUp 0.7s ease 0.18s both" }}>
            <div style={{ fontSize:"9px", letterSpacing:"0.28em", textTransform:"uppercase", color:"rgba(255,255,255,0.26)", marginBottom:"14px" }}>Create account</div>
            <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"clamp(30px,3vw,44px)", fontWeight:700, lineHeight:1.05, color:"#f5f2ec", letterSpacing:"-0.015em" }}>
              Welcome,<br />
              <span style={{ fontStyle:"italic", fontWeight:400, color:"rgba(255,255,255,0.45)" }}>let's get started.</span>
            </h2>
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:"30px", maxWidth:"420px" }}>

            {/* Name */}
            {[
              { key: "name", label: "Full Name", placeholder: "Your full name", type: "text" },
              { key: "email", label: "Email Address", placeholder: "you@example.com", type: "text" },
            ].map((f, idx) => (
              <div key={f.key} style={{ opacity:mounted?1:0, transform:mounted?"translateY(0)":"translateY(20px)", transition:`opacity 0.6s ease ${0.3 + idx * 0.12}s, transform 0.6s ease ${0.3 + idx * 0.12}s` }}>
                <label style={{ display:"block", fontSize:"9px", letterSpacing:"0.28em", textTransform:"uppercase", color:"rgba(255,255,255,0.3)", marginBottom:"8px", fontFamily:"'DM Sans',sans-serif" }}>{f.label}</label>
                <input
                  style={getInputStyle(f.key)}
                  placeholder={f.placeholder}
                  value={form[f.key as keyof FormState]}
                  onChange={handleChange(f.key as keyof FormState)}
                  onFocus={() => setFocusedField(f.key)}
                  onBlur={() => setFocusedField(null)}
                />
                {errors[f.key as keyof Errors] && (
                  <p style={{ marginTop:"8px", fontSize:"11px", color:"#e63946", letterSpacing:"0.05em", animation:"shake 0.3s ease" }}>{errors[f.key as keyof Errors]}</p>
                )}
              </div>
            ))}

            {/* Password */}
            <div style={{ opacity:mounted?1:0, transform:mounted?"translateY(0)":"translateY(20px)", transition:"opacity 0.6s ease 0.54s, transform 0.6s ease 0.54s" }}>
              <label style={{ display:"block", fontSize:"9px", letterSpacing:"0.28em", textTransform:"uppercase", color:"rgba(255,255,255,0.3)", marginBottom:"8px", fontFamily:"'DM Sans',sans-serif" }}>Password</label>
              <div style={{ position:"relative" }}>
                <input
                  style={{ ...getInputStyle("password"), paddingRight:"40px" }}
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  value={form.password}
                  onChange={handleChange("password")}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                />
                <button
                  onClick={() => setShowPassword(p => !p)}
                  onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.28)")}
                  style={{ position:"absolute", right:0, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:"rgba(255,255,255,0.28)", padding:"4px", display:"flex", alignItems:"center", transition:"color 0.2s" }}
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>
              {errors.password && <p style={{ marginTop:"8px", fontSize:"11px", color:"#e63946", letterSpacing:"0.05em", animation:"shake 0.3s ease" }}>{errors.password}</p>}
              <PasswordStrength password={form.password} />
            </div>

            {/* Terms */}
            <div style={{ opacity:mounted?1:0, transform:mounted?"translateY(0)":"translateY(20px)", transition:"opacity 0.6s ease 0.66s, transform 0.6s ease 0.66s" }}>
              <label style={{ display:"flex", alignItems:"flex-start", gap:"14px", cursor:"pointer" }}>
                <div
                  onClick={() => setAgreed(p => !p)}
                  style={{
                    width:"18px", height:"18px", minWidth:"18px",
                    border:`1px solid ${agreed ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.18)"}`,
                    background:agreed ? "rgba(255,255,255,0.12)" : "transparent",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    marginTop:"1px", transition:"all 0.25s ease", cursor:"pointer",
                    color:"rgba(255,255,255,0.9)",
                  }}
                >
                  {agreed && <CheckIcon />}
                </div>
                <span style={{ fontSize:"12px", color:"rgba(255,255,255,0.32)", lineHeight:1.65, letterSpacing:"0.01em" }}>
                  I agree to the{" "}
                  <span className="link-hover" style={{ color:"rgba(255,255,255,0.7)", borderBottom:"1px solid rgba(255,255,255,0.25)", cursor:"pointer" }}>Terms of Service</span>
                  {" "}and{" "}
                  <span className="link-hover" style={{ color:"rgba(255,255,255,0.7)", borderBottom:"1px solid rgba(255,255,255,0.25)", cursor:"pointer" }}>Privacy Policy</span>
                </span>
              </label>
              {errors.agreed && <p style={{ marginTop:"8px", fontSize:"11px", color:"#e63946", letterSpacing:"0.05em", animation:"shake 0.3s ease" }}>{errors.agreed}</p>}
            </div>

            {/* Submit */}
            <div style={{ opacity:mounted?1:0, transform:mounted?"translateY(0)":"translateY(20px)", transition:"opacity 0.6s ease 0.78s, transform 0.6s ease 0.78s" }}>
              <button
                className="mag-btn"
                onClick={handleSubmit}
                disabled={submitting}
                onMouseMove={e => {
                  if (submitting) return;
                  const r = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - r.left - r.width / 2;
                  const y = e.clientY - r.top - r.height / 2;
                  e.currentTarget.style.transform = `translate(${x * 0.14}px,${y * 0.14}px)`;
                }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translate(0,0)"; }}
                style={{
                  width:"100%", padding:"18px 24px",
                  background:"rgba(255,255,255,0.06)",
                  border:"1px solid rgba(255,255,255,0.16)",
                  color:submitting ? "rgba(255,255,255,0.28)" : "#f5f2ec",
                  fontSize:"10px", letterSpacing:"0.2em", textTransform:"uppercase",
                  cursor:submitting ? "not-allowed" : "pointer",
                  fontFamily:"'DM Sans',sans-serif", fontWeight:500,
                  transition:"background 0.3s, border-color 0.3s, transform 0.25s cubic-bezier(0.23,1,0.32,1), letter-spacing 0.3s",
                  position:"relative", overflow:"hidden",
                }}
              >
                {submitting ? (
                  <span style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"10px" }}>
                    <span style={{ width:"12px", height:"12px", border:"1px solid rgba(255,255,255,0.25)", borderTopColor:"rgba(255,255,255,0.8)", borderRadius:"50%", display:"inline-block", animation:"spin 0.75s linear infinite" }} />
                    Creating account
                  </span>
                ) : "Create Account →"}
              </button>

              <div style={{ display:"flex", alignItems:"center", gap:"12px", margin:"20px 0" }}>
                <div style={{ flex:1, height:"1px", background:"rgba(255,255,255,0.06)" }} />
                <span style={{ fontSize:"10px", color:"rgba(255,255,255,0.18)", letterSpacing:"0.1em" }}>or</span>
                <div style={{ flex:1, height:"1px", background:"rgba(255,255,255,0.06)" }} />
              </div>

              <p style={{ textAlign:"center", fontSize:"12px", color:"rgba(255,255,255,0.22)", letterSpacing:"0.02em" }}>
                Already a member?{" "}
                <span
                  className="link-hover"
                  style={{ color:"rgba(255,255,255,0.6)", cursor:"pointer", borderBottom:"1px solid rgba(255,255,255,0.18)" }}
                >
                  Sign in
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}