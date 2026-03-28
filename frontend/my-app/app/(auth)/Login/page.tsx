"use client";
import { useState, useEffect, useRef } from "react";

// ============================================================
//  Types
// ============================================================
type Field = "email" | "password";

interface FormState {
  email: string;
  password: string;
}

interface TouchedState {
  email: boolean;
  password: boolean;
}

// ============================================================
//  Tiny SVG icons (no icon library needed)
// ============================================================
const EyeIcon = ({ open }: { open: boolean }) =>
  open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

// ============================================================
//  Validation helpers
// ============================================================
const validateEmail = (v: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Enter a valid email address";

const validatePassword = (v: string) =>
  v.length >= 8 ? "" : "Password must be at least 8 characters";

// ============================================================
//  Particle canvas (subtle animated background)
// ============================================================
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const COUNT = 55;
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.4,
      dx: (Math.random() - 0.5) * 0.25,
      dy: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.5 + 0.15,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
        ctx.fill();
      });

      // Draw faint connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(255,255,255,${0.07 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}

// ============================================================
//  Main Login Page
// ============================================================
export default function LoginPage() {
  const [form, setForm] = useState<FormState>({ email: "", password: "" });
  const [errors, setErrors] = useState<FormState>({ email: "", password: "" });
  const [touched, setTouched] = useState<TouchedState>({ email: false, password: false });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  const validate = (field: Field, value: string) => {
    if (field === "email") return validateEmail(value);
    if (field === "password") return validatePassword(value);
    return "";
  };

  const handleChange = (field: Field) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: validate(field, value) }));
    }
  };

  const handleBlur = (field: Field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validate(field, form[field]) }));
  };

  const allValid =
    form.email !== "" &&
    form.password !== "" &&
    validateEmail(form.email) === "" &&
    validatePassword(form.password) === "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    const emailErr = validate("email", form.email);
    const passErr = validate("password", form.password);
    setErrors({ email: emailErr, password: passErr });
    if (emailErr || passErr) return;

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    setIsLoading(false);
    setSubmitted(true);
  };

  // ─── styles ──────────────────────────────────────────────
  const stylesBase: Record<string, React.CSSProperties> = {
    root: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
      background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
      position: "relative",
      overflow: "hidden",
      padding: "24px",
    },
    glowOrb1: {
      position: "absolute",
      top: "-120px",
      right: "-80px",
      width: "480px",
      height: "480px",
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(120,80,255,0.35) 0%, transparent 70%)",
      pointerEvents: "none",
    },
    glowOrb2: {
      position: "absolute",
      bottom: "-100px",
      left: "-60px",
      width: "360px",
      height: "360px",
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(0,200,255,0.2) 0%, transparent 70%)",
      pointerEvents: "none",
    },
    card: {
      position: "relative",
      zIndex: 1,
      width: "100%",
      maxWidth: "440px",
      background: "rgba(255,255,255,0.04)",
      backdropFilter: "blur(28px)",
      WebkitBackdropFilter: "blur(28px)",
      border: "1px solid rgba(255,255,255,0.10)",
      borderRadius: "24px",
      padding: "48px 44px 40px",
      boxShadow: "0 32px 80px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.12)",
      opacity: mounted ? 1 : 0,
      transform: mounted ? "translateY(0)" : "translateY(28px)",
      transition: "opacity 0.65s cubic-bezier(.22,1,.36,1), transform 0.65s cubic-bezier(.22,1,.36,1)",
    },
    logoRow: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginBottom: "32px",
    },
    logoMark: {
      width: "38px",
      height: "38px",
      borderRadius: "10px",
      background: "linear-gradient(135deg, #7c4dff, #00b4d8)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      boxShadow: "0 4px 14px rgba(124,77,255,0.5)",
    },
    logoText: {
      fontSize: "17px",
      fontWeight: 700,
      color: "#fff",
      letterSpacing: "-0.3px",
    },
    heading: {
      fontSize: "28px",
      fontWeight: 800,
      color: "#ffffff",
      letterSpacing: "-0.6px",
      marginBottom: "6px",
      lineHeight: 1.15,
    },
    subHeading: {
      fontSize: "14px",
      color: "rgba(255,255,255,0.5)",
      marginBottom: "32px",
      lineHeight: 1.5,
    },
    label: {
      display: "block",
      fontSize: "12px",
      fontWeight: 600,
      color: "rgba(255,255,255,0.6)",
      letterSpacing: "0.6px",
      textTransform: "uppercase" as const,
      marginBottom: "8px",
    },
    inputWrapper: {
      position: "relative" as const,
      marginBottom: "4px",
    },
    inputIcon: {
      position: "absolute" as const,
      left: "14px",
      top: "50%",
      transform: "translateY(-50%)",
      color: "rgba(255,255,255,0.35)",
      pointerEvents: "none" as const,
      display: "flex",
      alignItems: "center",
    },
    eyeBtn: {
      position: "absolute" as const,
      right: "13px",
      top: "50%",
      transform: "translateY(-50%)",
      background: "none",
      border: "none",
      cursor: "pointer",
      color: "rgba(255,255,255,0.4)",
      display: "flex",
      alignItems: "center",
      padding: "2px",
      transition: "color 0.2s",
    },
    errorMsg: {
      fontSize: "12px",
      color: "rgba(255,100,120,0.9)",
      marginTop: "6px",
      minHeight: "16px",
    },
    fieldGroup: {
      marginBottom: "20px",
    },
    forgotRow: {
      display: "flex",
      justifyContent: "flex-end",
      marginBottom: "28px",
      marginTop: "-6px",
    },
    forgotLink: {
      fontSize: "12.5px",
      color: "rgba(160,130,255,0.85)",
      textDecoration: "none",
      fontWeight: 500,
      transition: "color 0.2s",
      cursor: "pointer",
      background: "none",
      border: "none",
    },
    submitBtn: {
      width: "100%",
      padding: "14px",
      borderRadius: "12px",
      border: "none",
      cursor: "pointer",
      fontFamily: "inherit",
      fontSize: "15px",
      fontWeight: 700,
      letterSpacing: "0.2px",
      color: "#fff",
      background: "linear-gradient(135deg, #7c4dff 0%, #00b4d8 100%)",
      boxShadow: "0 6px 24px rgba(124,77,255,0.4)",
      transition: "all 0.25s cubic-bezier(.22,1,.36,1)",
      transform: "translateY(0)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      marginBottom: "20px",
    } as React.CSSProperties,
    divider: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      marginBottom: "20px",
    },
    dividerLine: {
      flex: 1,
      height: "1px",
      background: "rgba(255,255,255,0.1)",
    },
    dividerText: {
      fontSize: "12px",
      color: "rgba(255,255,255,0.3)",
      fontWeight: 500,
    },
    googleBtn: {
      width: "100%",
      padding: "13px",
      borderRadius: "12px",
      border: "1.5px solid rgba(255,255,255,0.12)",
      cursor: "pointer",
      fontFamily: "inherit",
      fontSize: "14.5px",
      fontWeight: 600,
      color: "rgba(255,255,255,0.85)",
      background: "rgba(255,255,255,0.04)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      transition: "background 0.2s, border-color 0.2s",
      marginBottom: "28px",
    },
    signupRow: {
      textAlign: "center" as const,
      fontSize: "13.5px",
      color: "rgba(255,255,255,0.4)",
    },
    signupLink: {
      color: "rgba(160,130,255,0.9)",
      fontWeight: 600,
      textDecoration: "none",
      marginLeft: "4px",
      cursor: "pointer",
      background: "none",
      border: "none",
      fontFamily: "inherit",
      fontSize: "inherit",
    },
    successOverlay: {
      position: "absolute" as const,
      inset: 0,
      borderRadius: "24px",
      background: "rgba(15,12,41,0.97)",
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      justifyContent: "center",
      gap: "16px",
      zIndex: 10,
      opacity: submitted ? 1 : 0,
      pointerEvents: submitted ? "auto" : "none",
      transition: "opacity 0.4s ease",
    },
    successIcon: {
      width: "64px",
      height: "64px",
      borderRadius: "50%",
      background: "linear-gradient(135deg, #7c4dff, #00b4d8)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 8px 30px rgba(124,77,255,0.5)",
      animation: submitted ? "popIn 0.45s cubic-bezier(.175,.885,.32,1.275) forwards" : "none",
    },
    successHeading: {
      fontSize: "22px",
      fontWeight: 800,
      color: "#fff",
      letterSpacing: "-0.4px",
    },
    successSub: {
      fontSize: "14px",
      color: "rgba(255,255,255,0.5)",
      textAlign: "center" as const,
      maxWidth: "260px",
    },
  };

  // ─── Focus state tracking ────────────────────────────────
  const [focused, setFocused] = useState<{ email: boolean; password: boolean }>({
    email: false,
    password: false,
  });

  // ─── Build dynamic input styles ──────────────────────────
  const inputStyleFn = (hasError: boolean, isFocused: boolean): React.CSSProperties => ({
    width: "100%",
    padding: "12px 16px 12px 40px",
    borderRadius: "12px",
    border: hasError ? "1.5px solid rgba(255,100,120,0.6)" : isFocused ? "1.5px solid rgba(160,130,255,0.7)" : "1.5px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.06)",
    color: "#fff",
    fontFamily: "inherit",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s, background 0.2s",
    boxShadow: isFocused ? "0 0 0 3px rgba(160,130,255,0.15)" : "none",
  });

  const styles = stylesBase;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 40px rgba(124,77,255,0.08) inset !important;
          -webkit-text-fill-color: #fff !important;
          caret-color: #fff;
        }
        @keyframes popIn {
          from { transform: scale(0.5); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px) !important;
          box-shadow: 0 10px 32px rgba(124,77,255,0.55) !important;
        }
        .submit-btn:active:not(:disabled) {
          transform: translateY(0) !important;
        }
        .google-btn:hover {
          background: rgba(255,255,255,0.08) !important;
          border-color: rgba(255,255,255,0.22) !important;
        }
        .eye-btn:hover { color: rgba(255,255,255,0.75) !important; }
        .forgot-link:hover { color: rgba(180,160,255,1) !important; }
        .signup-link:hover { color: rgba(200,180,255,1) !important; }
      `}</style>

      <div style={styles.root}>
        <ParticleCanvas />
        <div style={styles.glowOrb1} />
        <div style={styles.glowOrb2} />

        <div style={styles.card}>
          {/* Success overlay */}
          <div style={styles.successOverlay}>
            <div style={styles.successIcon}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div style={styles.successHeading}>Welcome back!</div>
            <div style={styles.successSub}>You've successfully signed in. Redirecting you now…</div>
          </div>

          {/* Logo */}
          <div style={styles.logoRow}>
            <div style={styles.logoMark}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
            <span style={styles.logoText}>Nexus</span>
          </div>

          {/* Heading */}
          <h1 style={styles.heading}>Sign in to your account</h1>
          <p style={styles.subHeading}>Enter your credentials to continue where you left off.</p>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div style={styles.fieldGroup}>
              <label htmlFor="email" style={styles.label}>Email</label>
              <div style={styles.inputWrapper}>
                <span style={styles.inputIcon}><MailIcon /></span>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange("email")}
                  onBlur={handleBlur("email")}
                  onFocus={() => setFocused((f) => ({ ...f, email: true }))}
                  onBlurCapture={() => setFocused((f) => ({ ...f, email: false }))}
                  style={inputStyleFn(!!errors.email && touched.email, focused.email)}
                  disabled={isLoading || submitted}
                />
              </div>
              <div style={styles.errorMsg}>{touched.email ? errors.email : ""}</div>
            </div>

            {/* Password */}
            <div style={styles.fieldGroup}>
              <label htmlFor="password" style={styles.label}>Password</label>
              <div style={styles.inputWrapper}>
                <span style={styles.inputIcon}><LockIcon /></span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange("password")}
                  onBlur={() => {
                    handleBlur("password")();
                    setFocused((f) => ({ ...f, password: false }));
                  }}
                  onFocus={() => setFocused((f) => ({ ...f, password: true }))}
                  style={inputStyleFn(!!errors.password && touched.password, focused.password)}
                  disabled={isLoading || submitted}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  style={styles.eyeBtn}
                  className="eye-btn"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>
              <div style={styles.errorMsg}>{touched.password ? errors.password : ""}</div>
            </div>

            {/* Forgot */}
            <div style={styles.forgotRow}>
              <button type="button" style={styles.forgotLink} className="forgot-link">
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="submit-btn"
              disabled={isLoading || submitted || !allValid}
              style={{
                ...styles.submitBtn,
                background: (allValid && !isLoading)
                  ? "linear-gradient(135deg, #7c4dff 0%, #00b4d8 100%)"
                  : "rgba(255,255,255,0.08)",
                boxShadow: (allValid && !isLoading) ? "0 6px 24px rgba(124,77,255,0.4)" : "none",
                cursor: (allValid && !isLoading) ? "pointer" : "not-allowed",
              }}
            >
              {isLoading ? (
                <>
                  <svg
                    width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" strokeLinecap="round"
                    style={{ animation: "spin 0.75s linear infinite" }}
                  >
                    <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" strokeOpacity="0.25" />
                    <path d="M21 12a9 9 0 0 0-9-9" />
                  </svg>
                  Signing in…
                </>
              ) : (
                "Sign in"
              )}
            </button>

            {/* Divider */}
            <div style={styles.divider}>
              <div style={styles.dividerLine} />
              <span style={styles.dividerText}>or</span>
              <div style={styles.dividerLine} />
            </div>

            {/* Google */}
            <button type="button" style={styles.googleBtn} className="google-btn">
              <GoogleIcon />
              Continue with Google
            </button>
          </form>

          {/* Sign up row */}
          <div style={styles.signupRow}>
            Don't have an account?
            <button type="button" style={styles.signupLink} className="signup-link">
              Create one free
            </button>
          </div>
        </div>
      </div>
    </>
  );
}