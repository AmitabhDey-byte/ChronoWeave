"use client";
import { useState, useEffect, useRef } from "react";

const EyeIcon: React.FC<{ open: boolean }> = ({ open }) =>
  open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
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

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passFocused, setPassFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const validate = () => {
    const e: { email?: string; password?: string } = {};
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "That doesn't look right";
    if (password.length < 6) e.password = "Too short";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1600));
    setLoading(false);
    setDone(true);
  };

  if (done) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#0a0a0f",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Space Grotesk', sans-serif",
        flexDirection: "column",
        gap: "16px",
      }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Syne:wght@400;700;800&display=swap');
          @keyframes popIn { 0% { transform: scale(0.8); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
          @keyframes textSlide { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
        `}</style>
        <div style={{
          width: 80, height: 80, borderRadius: "50%",
          background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
          display: "flex", alignItems: "center", justifyContent: "center",
          animation: "popIn 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards",
          fontSize: 36,
        }}>✓</div>
        <p style={{
          color: "#fff", fontSize: 28, fontFamily: "'Syne', sans-serif",
          fontWeight: 800, animation: "textSlide 0.5s 0.2s ease both",
        }}>you're in 🔥</p>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Syne:wght@400;700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body { background: #0a0a0f; }

        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -20px) rotate(5deg); }
          66% { transform: translate(-15px, 15px) rotate(-3deg); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-25px, 20px) rotate(-8deg); }
        }
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0); }
          40% { transform: translate(20px, -30px); }
          80% { transform: translate(-10px, 10px); }
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 0.8; }
          100% { transform: scale(1.6); opacity: 0; }
        }

        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          opacity: 0.18;
        }
        .blob-1 {
          width: 500px; height: 500px;
          background: #7c3aed;
          top: -100px; left: -150px;
          animation: float1 12s ease-in-out infinite;
        }
        .blob-2 {
          width: 380px; height: 380px;
          background: #06b6d4;
          bottom: -80px; right: -100px;
          animation: float2 10s ease-in-out infinite;
        }
        .blob-3 {
          width: 300px; height: 300px;
          background: #ec4899;
          top: 40%; left: 40%;
          animation: float3 14s ease-in-out infinite;
        }

        .card {
          animation: fadeSlideIn 0.7s cubic-bezier(0.22,1,0.36,1) both;
        }

        .input-wrap {
          position: relative;
        }
        .input-field {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px;
          padding: 16px 20px;
          font-size: 15px;
          color: #fff;
          font-family: 'Space Grotesk', sans-serif;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
          letter-spacing: 0.01em;
        }
        .input-field::placeholder { color: rgba(255,255,255,0.25); }
        .input-field:focus {
          border-color: rgba(124,58,237,0.7);
          background: rgba(124,58,237,0.06);
          box-shadow: 0 0 0 4px rgba(124,58,237,0.12);
        }
        .input-field.error {
          border-color: rgba(239,68,68,0.6);
          box-shadow: 0 0 0 4px rgba(239,68,68,0.08);
        }

        .label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          margin-bottom: 8px;
          font-family: 'Space Grotesk', sans-serif;
        }

        .error-msg {
          font-size: 12px;
          color: #f87171;
          margin-top: 6px;
          font-family: 'Space Grotesk', sans-serif;
          letter-spacing: 0.01em;
        }

        .btn-primary {
          width: 100%;
          padding: 17px;
          border: none;
          border-radius: 14px;
          font-size: 15px;
          font-weight: 700;
          font-family: 'Space Grotesk', sans-serif;
          letter-spacing: 0.03em;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%);
          color: #fff;
          transition: transform 0.15s, box-shadow 0.15s, opacity 0.15s;
          box-shadow: 0 4px 24px rgba(124,58,237,0.35);
        }
        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(124,58,237,0.5);
        }
        .btn-primary:active:not(:disabled) {
          transform: translateY(0);
        }
        .btn-primary:disabled { opacity: 0.7; cursor: not-allowed; }

        .btn-shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%);
          background-size: 200% 100%;
          animation: shimmer 1.8s infinite;
        }

        .btn-google {
          width: 100%;
          padding: 15px;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 14px;
          font-size: 14px;
          font-weight: 500;
          font-family: 'Space Grotesk', sans-serif;
          cursor: pointer;
          background: rgba(255,255,255,0.04);
          color: rgba(255,255,255,0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: background 0.2s, border-color 0.2s, transform 0.15s;
          letter-spacing: 0.01em;
        }
        .btn-google:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.2);
          transform: translateY(-1px);
        }

        .divider {
          display: flex;
          align-items: center;
          gap: 12px;
          color: rgba(255,255,255,0.2);
          font-size: 12px;
          font-family: 'Space Grotesk', sans-serif;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .divider::before, .divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.08);
        }

        .link {
          color: #a78bfa;
          text-decoration: none;
          font-weight: 600;
          border-bottom: 1px solid transparent;
          transition: border-color 0.2s;
          cursor: pointer;
        }
        .link:hover { border-color: #a78bfa; }

        .spinner {
          width: 20px; height: 20px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          display: inline-block;
          vertical-align: middle;
          margin-right: 8px;
        }

        .tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 100px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.08);
          font-size: 12px;
          color: rgba(255,255,255,0.5);
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 500;
        }
        .tag-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 0 0 rgba(34,197,94,0.5);
          animation: pulse-ring 1.5s ease infinite;
          position: relative;
        }
        .tag-dot::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: #22c55e;
        }

        .noise {
          position: absolute;
          inset: 0;
          opacity: 0.03;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 200px;
        }

        .stagger-1 { animation-delay: 0.05s; }
        .stagger-2 { animation-delay: 0.12s; }
        .stagger-3 { animation-delay: 0.19s; }
        .stagger-4 { animation-delay: 0.26s; }
        .stagger-5 { animation-delay: 0.33s; }
        .stagger-6 { animation-delay: 0.40s; }
        .stagger-7 { animation-delay: 0.47s; }
        .stagger-8 { animation-delay: 0.54s; }

        .field-block {
          animation: fadeSlideIn 0.6s cubic-bezier(0.22,1,0.36,1) both;
          opacity: 0;
        }

        .eye-btn {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: rgba(255,255,255,0.3);
          display: flex;
          align-items: center;
          padding: 4px;
          transition: color 0.2s;
        }
        .eye-btn:hover { color: rgba(255,255,255,0.7); }

        .grid-line {
          position: absolute;
          pointer-events: none;
          opacity: 0.04;
        }

        .forgot-link {
          font-size: 13px;
          font-family: 'Space Grotesk', sans-serif;
          color: rgba(255,255,255,0.35);
          cursor: pointer;
          transition: color 0.2s;
          text-align: right;
          display: block;
          margin-top: 8px;
        }
        .forgot-link:hover { color: #a78bfa; }
      `}</style>

      <div
        ref={containerRef}
        style={{
          minHeight: "100vh",
          background: "#0a0a0f",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          padding: "24px",
        }}
      >
        {/* Noise overlay */}
        <div className="noise" />

        {/* Animated blobs */}
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />

        {/* Subtle grid lines */}
        {[...Array(6)].map((_, i) => (
          <div key={i} className="grid-line" style={{
            left: `${(i + 1) * 16.66}%`,
            top: 0, bottom: 0,
            width: "1px",
            background: "white",
          }} />
        ))}

        {/* Mouse-tracked gradient */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(124,58,237,0.06) 0%, transparent 70%)`,
          pointerEvents: "none",
          transition: "background 0.1s",
        }} />

        {/* Card */}
        <div
          className="card"
          style={{
            width: "100%",
            maxWidth: "440px",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "28px",
            padding: "clamp(32px, 5vw, 48px)",
            backdropFilter: "blur(20px)",
            position: "relative",
            zIndex: 10,
            boxShadow: "0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          {/* Status tag */}
          <div className="field-block stagger-1" style={{ marginBottom: "28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div className="tag">
              <div style={{ position: "relative", width: 6, height: 6, flexShrink: 0 }}>
                <div className="tag-dot" />
              </div>
              All systems normal
            </div>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.25)", fontFamily: "'Space Grotesk', sans-serif" }}>v2.4</span>
          </div>

          {/* Headline */}
          <div className="field-block stagger-2" style={{ marginBottom: "8px" }}>
            <h1 style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(32px, 6vw, 42px)",
              color: "#fff",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}>
              Welcome<br />
              <span style={{
                background: "linear-gradient(90deg, #a78bfa, #67e8f9, #f0abfc)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                back. ✦
              </span>
            </h1>
          </div>

          <div className="field-block stagger-3" style={{ marginBottom: "32px" }}>
            <p style={{
              fontSize: "14px",
              color: "rgba(255,255,255,0.35)",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 400,
              letterSpacing: "0.01em",
              lineHeight: 1.6,
            }}>
              Sign in to continue. No drama, just vibes. 🤙
            </p>
          </div>

          {/* Google button */}
          <div className="field-block stagger-4" style={{ marginBottom: "24px" }}>
            <button className="btn-google">
              <GoogleIcon />
              Continue with Google
            </button>
          </div>

          {/* Divider */}
          <div className="field-block stagger-4 divider" style={{ marginBottom: "24px" }}>
            or
          </div>

          {/* Fields */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

            {/* Email */}
            <div className="field-block stagger-5">
              <label className="label">Email</label>
              <div className="input-wrap">
                <input
                  className={`input-field ${errors.email ? "error" : ""}`}
                  type="email"
                  placeholder="you@somewhere.cool"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: undefined })); }}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                />
              </div>
              {errors.email && <p className="error-msg">⚠ {errors.email}</p>}
            </div>

            {/* Password */}
            <div className="field-block stagger-6">
              <label className="label">Password</label>
              <div className="input-wrap">
                <input
                  className={`input-field ${errors.password ? "error" : ""}`}
                  type={showPassword ? "text" : "password"}
                  placeholder="shhh... 🤫"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setErrors(p => ({ ...p, password: undefined })); }}
                  style={{ paddingRight: "48px" }}
                  onFocus={() => setPassFocused(true)}
                  onBlur={() => setPassFocused(false)}
                />
                <button className="eye-btn" onClick={() => setShowPassword(p => !p)}>
                  <EyeIcon open={showPassword} />
                </button>
              </div>
              {errors.password && <p className="error-msg">⚠ {errors.password}</p>}
              <span className="forgot-link">Forgot password?</span>
            </div>

            {/* Submit */}
            <div className="field-block stagger-7" style={{ paddingTop: "4px" }}>
              <button
                className="btn-primary"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading && <div className="btn-shimmer" />}
                {loading ? (
                  <><span className="spinner" /> Signing you in…</>
                ) : (
                  "Sign in →"
                )}
              </button>
            </div>

            {/* Footer */}
            <div className="field-block stagger-8" style={{ textAlign: "center" }}>
              <p style={{
                fontSize: "13px",
                color: "rgba(255,255,255,0.3)",
                fontFamily: "'Space Grotesk', sans-serif",
                lineHeight: 1.7,
              }}>
                New here?{" "}
                <span className="link">Create an account</span>
                {" "}— it's free 🎉
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}