import { useState, useEffect, useRef } from "react";

const GOOGLE_ICON = (
  <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
    <path d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 2.9l5.7-5.7C34.5 6.5 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z" fill="#FFC107"/>
    <path d="M6.3 14.7l6.6 4.8C14.7 16.1 19 13 24 13c3.1 0 5.8 1.1 8 2.9l5.7-5.7C34.5 6.5 29.6 4 24 4c-7.7 0-14.4 4.4-17.7 10.7z" fill="#FF3D00"/>
    <path d="M24 44c5.5 0 10.4-2 14.1-5.3l-6.5-5.5C29.5 35 26.9 36 24 36c-5.3 0-9.7-3.3-11.3-8H6.1C9.4 39.7 16.2 44 24 44z" fill="#4CAF50"/>
    <path d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.3 4.1-4.2 5.4l6.5 5.5C40 36.5 44 30.7 44 24c0-1.2-.1-2.3-.4-3.5z" fill="#1976D2"/>
  </svg>
);

const GITHUB_ICON = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const EyeIcon = ({ open }) => open ? (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
) : (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

function PasswordStrength({ password }) {
  const checks = [
    { label: "8+ characters", pass: password.length >= 8 },
    { label: "Uppercase", pass: /[A-Z]/.test(password) },
    { label: "Number", pass: /\d/.test(password) },
    { label: "Symbol", pass: /[^a-zA-Z0-9]/.test(password) },
  ];
  const score = checks.filter(c => c.pass).length;
  const colors = ["#ff4d4d", "#ff944d", "#ffd24d", "#4dff91"];
  const labels = ["Weak", "Fair", "Good", "Strong"];

  if (!password) return null;

  return (
    <div style={{ marginTop: "10px" }}>
      <div style={{ display: "flex", gap: "6px", marginBottom: "8px" }}>
        {[0,1,2,3].map(i => (
          <div key={i} style={{
            flex: 1, height: "3px", borderRadius: "99px",
            background: i < score ? colors[score - 1] : "rgba(255,255,255,0.1)",
            transition: "background 0.3s ease"
          }}/>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {checks.map((c, i) => (
            <span key={i} style={{
              display: "flex", alignItems: "center", gap: "4px",
              fontSize: "11px", color: c.pass ? "#4dff91" : "rgba(255,255,255,0.3)",
              transition: "color 0.3s"
            }}>
              <span style={{
                width: "14px", height: "14px", borderRadius: "50%",
                background: c.pass ? "#4dff91" : "rgba(255,255,255,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#000", transition: "all 0.3s", flexShrink: 0
              }}>
                {c.pass && <CheckIcon />}
              </span>
              {c.label}
            </span>
          ))}
        </div>
        {score > 0 && (
          <span style={{ fontSize: "11px", fontWeight: 600, color: colors[score-1], letterSpacing: "0.05em" }}>
            {labels[score-1]}
          </span>
        )}
      </div>
    </div>
  );
}

function FloatingParticles() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          width: `${Math.random() * 4 + 1}px`,
          height: `${Math.random() * 4 + 1}px`,
          borderRadius: "50%",
          background: `rgba(${Math.random() > 0.5 ? "130,80,255" : "80,200,255"},${Math.random() * 0.4 + 0.1})`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animation: `float ${Math.random() * 10 + 8}s ease-in-out infinite`,
          animationDelay: `${Math.random() * 8}s`,
        }}/>
      ))}
    </div>
  );
}

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setTimeout(() => setMounted(true), 50); }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Enter a valid email";
    if (form.password.length < 8) e.password = "Password must be at least 8 characters";
    if (!agreed) e.agreed = "Please accept the terms";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1800));
    setSubmitting(false);
    setSubmitted(true);
  };

  const inputStyle = (field) => ({
    width: "100%",
    padding: "14px 16px",
    background: focused === field ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.04)",
    border: `1px solid ${errors[field] ? "rgba(255,80,80,0.6)" : focused === field ? "rgba(130,80,255,0.8)" : "rgba(255,255,255,0.1)"}`,
    borderRadius: "12px",
    color: "#fff",
    fontSize: "15px",
    outline: "none",
    transition: "all 0.2s ease",
    boxSizing: "border-box",
    fontFamily: "'DM Sans', sans-serif",
    boxShadow: focused === field ? "0 0 0 3px rgba(130,80,255,0.15)" : "none",
  });

  if (submitted) return (
    <>
      <style>{CSS}</style>
      <div style={{ minHeight: "100vh", background: "#080810", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ textAlign: "center", animation: "fadeUp 0.6s ease forwards" }}>
          <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "linear-gradient(135deg, #8250ff, #50c8ff)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: "36px", boxShadow: "0 0 40px rgba(130,80,255,0.5)" }}>✓</div>
          <h2 style={{ color: "#fff", fontSize: "28px", fontWeight: 700, marginBottom: "12px" }}>You're in!</h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "16px" }}>Welcome aboard. Check your email to verify your account.</p>
        </div>
      </div>
    </>
  );

  return (
    <>
      <style>{CSS}</style>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap" rel="stylesheet"/>

      <div style={{ minHeight: "100vh", background: "#080810", display: "flex", fontFamily: "'DM Sans', sans-serif", position: "relative", overflow: "hidden" }}>
        <FloatingParticles />

        {/* Background blobs */}
        <div style={{ position: "fixed", top: "-20%", left: "-10%", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(130,80,255,0.15) 0%, transparent 70%)", pointerEvents: "none" }}/>
        <div style={{ position: "fixed", bottom: "-20%", right: "-10%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(80,200,255,0.1) 0%, transparent 70%)", pointerEvents: "none" }}/>

        {/* Left Panel */}
        <div style={{
          flex: 1, display: "none", flexDirection: "column", justifyContent: "center", padding: "80px",
          position: "relative", borderRight: "1px solid rgba(255,255,255,0.05)",
          "@media(min-width:900px)": { display: "flex" }
        }} className="left-panel">
          <div style={{ marginBottom: "60px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "48px" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "linear-gradient(135deg, #8250ff, #50c8ff)", flexShrink: 0 }}/>
              <span style={{ color: "#fff", fontSize: "18px", fontWeight: 700, fontFamily: "'Syne', sans-serif", letterSpacing: "-0.02em" }}>Vortex</span>
            </div>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 800, color: "#fff", lineHeight: 1.1, marginBottom: "24px", letterSpacing: "-0.03em" }}>
              Build something<br/>
              <span style={{ background: "linear-gradient(90deg, #8250ff, #50c8ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>remarkable.</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "17px", lineHeight: 1.7, maxWidth: "380px" }}>
              Join thousands of creators and builders shipping their best work with the tools they deserve.
            </p>
          </div>

          {/* Testimonial */}
          <div style={{ padding: "28px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", maxWidth: "420px" }}>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "15px", lineHeight: 1.7, marginBottom: "20px", fontStyle: "italic" }}>
              "Vortex completely changed how our team ships features. The speed is unreal."
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "linear-gradient(135deg, #f093fb, #f5576c)" }}/>
              <div>
                <div style={{ color: "#fff", fontSize: "14px", fontWeight: 600 }}>Sarah Chen</div>
                <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "13px" }}>CTO at Amplitude</div>
              </div>
              <div style={{ marginLeft: "auto", color: "#fbbf24", fontSize: "13px" }}>★★★★★</div>
            </div>
          </div>
        </div>

        {/* Right Panel — Form */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px", minHeight: "100vh" }}>
          <div style={{
            width: "100%", maxWidth: "440px",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.6s cubic-bezier(0.16,1,0.3,1)"
          }}>
            {/* Mobile logo */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "40px" }} className="mobile-logo">
              <div style={{ width: "28px", height: "28px", borderRadius: "7px", background: "linear-gradient(135deg, #8250ff, #50c8ff)" }}/>
              <span style={{ color: "#fff", fontSize: "17px", fontWeight: 700, fontFamily: "'Syne', sans-serif" }}>Vortex</span>
            </div>

            <div style={{ marginBottom: "36px" }}>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "32px", fontWeight: 800, color: "#fff", marginBottom: "8px", letterSpacing: "-0.03em" }}>Create account</h2>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "15px" }}>
                Already have one? <a href="#" style={{ color: "#8250ff", textDecoration: "none", fontWeight: 500 }}>Sign in →</a>
              </p>
            </div>

            {/* Social buttons */}
            <div style={{ display: "flex", gap: "12px", marginBottom: "28px" }}>
              {[
                { icon: GOOGLE_ICON, label: "Google" },
                { icon: GITHUB_ICON, label: "GitHub" }
              ].map(({ icon, label }) => (
                <button key={label} style={{
                  flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                  padding: "13px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px", color: "#fff", fontSize: "14px", fontWeight: 500,
                  cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s"
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.09)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
                >
                  {icon} {label}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "28px" }}>
              <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.08)" }}/>
              <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "13px" }}>or continue with email</span>
              <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.08)" }}/>
            </div>

            {/* Fields */}
            <div style={{ display: "flex", flexDirection: "column", gap: "18px", marginBottom: "24px" }}>
              {/* Name */}
              <div>
                <label style={{ display: "block", color: "rgba(255,255,255,0.6)", fontSize: "13px", fontWeight: 500, marginBottom: "8px", letterSpacing: "0.02em" }}>FULL NAME</label>
                <input
                  type="text" placeholder="Alex Johnson" value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                  style={inputStyle("name")}
                />
                {errors.name && <p style={{ color: "#ff6b6b", fontSize: "12px", marginTop: "6px" }}>{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label style={{ display: "block", color: "rgba(255,255,255,0.6)", fontSize: "13px", fontWeight: 500, marginBottom: "8px", letterSpacing: "0.02em" }}>EMAIL</label>
                <input
                  type="email" placeholder="you@company.com" value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                  style={inputStyle("email")}
                />
                {errors.email && <p style={{ color: "#ff6b6b", fontSize: "12px", marginTop: "6px" }}>{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <label style={{ display: "block", color: "rgba(255,255,255,0.6)", fontSize: "13px", fontWeight: 500, marginBottom: "8px", letterSpacing: "0.02em" }}>PASSWORD</label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"} placeholder="Create a strong password" value={form.password}
                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                    onFocus={() => setFocused("password")} onBlur={() => setFocused(null)}
                    style={{ ...inputStyle("password"), paddingRight: "48px" }}
                  />
                  <button onClick={() => setShowPassword(v => !v)} style={{
                    position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.35)",
                    padding: "4px", display: "flex", alignItems: "center", transition: "color 0.2s"
                  }}
                    onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}
                    onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.35)"}
                  >
                    <EyeIcon open={showPassword} />
                  </button>
                </div>
                <PasswordStrength password={form.password} />
                {errors.password && <p style={{ color: "#ff6b6b", fontSize: "12px", marginTop: "6px" }}>{errors.password}</p>}
              </div>
            </div>

            {/* Terms */}
            <div style={{ marginBottom: "28px" }}>
              <label style={{ display: "flex", alignItems: "flex-start", gap: "12px", cursor: "pointer" }}>
                <div onClick={() => setAgreed(v => !v)} style={{
                  width: "20px", height: "20px", borderRadius: "6px", flexShrink: 0, marginTop: "1px",
                  background: agreed ? "linear-gradient(135deg, #8250ff, #50c8ff)" : "rgba(255,255,255,0.05)",
                  border: `1px solid ${agreed ? "transparent" : errors.agreed ? "rgba(255,80,80,0.6)" : "rgba(255,255,255,0.15)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.2s", color: "#fff", cursor: "pointer"
                }}>
                  {agreed && <CheckIcon />}
                </div>
                <span style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px", lineHeight: 1.6 }}>
                  I agree to Vortex's{" "}
                  <a href="#" style={{ color: "#8250ff", textDecoration: "none" }}>Terms of Service</a>{" "}
                  and{" "}
                  <a href="#" style={{ color: "#8250ff", textDecoration: "none" }}>Privacy Policy</a>
                </span>
              </label>
              {errors.agreed && <p style={{ color: "#ff6b6b", fontSize: "12px", marginTop: "8px" }}>{errors.agreed}</p>}
            </div>

            {/* Submit */}
            <button onClick={handleSubmit} disabled={submitting} style={{
              width: "100%", padding: "16px",
              background: submitting ? "rgba(130,80,255,0.5)" : "linear-gradient(135deg, #8250ff 0%, #50c8ff 100%)",
              border: "none", borderRadius: "14px", color: "#fff",
              fontSize: "16px", fontWeight: 600, cursor: submitting ? "not-allowed" : "pointer",
              fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.01em",
              transition: "all 0.3s ease", position: "relative", overflow: "hidden",
              boxShadow: submitting ? "none" : "0 8px 32px rgba(130,80,255,0.35)"
            }}
              onMouseEnter={e => { if (!submitting) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(130,80,255,0.5)"; }}}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = submitting ? "none" : "0 8px 32px rgba(130,80,255,0.35)"; }}
            >
              {submitting ? (
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                  <span style={{ width: "18px", height: "18px", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite", display: "inline-block" }}/>
                  Creating account…
                </span>
              ) : "Create account →"}
            </button>

            {/* Footer badges */}
            <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginTop: "28px" }}>
              {["256-bit SSL", "GDPR Ready", "SOC 2"].map(badge => (
                <span key={badge} style={{ color: "rgba(255,255,255,0.2)", fontSize: "12px", display: "flex", alignItems: "center", gap: "5px" }}>
                  <span style={{ color: "rgba(130,80,255,0.6)" }}>✓</span> {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #080810; }
  input::placeholder { color: rgba(255,255,255,0.2); }
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px #10101e inset !important;
    -webkit-text-fill-color: #fff !important;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px) translateX(0px); }
    33% { transform: translateY(-20px) translateX(10px); }
    66% { transform: translateY(10px) translateX(-10px); }
  }
  .left-panel { display: none; }
  .mobile-logo { display: flex; }
  @media (min-width: 900px) {
    .left-panel { display: flex !important; }
    .mobile-logo { display: none !important; }
  }
`;