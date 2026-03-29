"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/layout/Navbar";

export default function LandingPage() {
  const router = useRouter(); // ✅ FIXED (inside component)

  return (
    <>
      <style>{`
        .hero-root {
          min-height: 100vh;
          background: #0f0c29;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 0 24px;
          position: relative;
          overflow: hidden;
        }
        .hero-title {
          font-size: clamp(40px, 8vw, 84px);
          font-weight: 800;
          color: #fff;
          line-height: 1;
          letter-spacing: -2px;
          max-width: 900px;
          margin-bottom: 24px;
          z-index: 2;
        }
        .hero-title span {
          background: linear-gradient(135deg, #7c4dff, #00b4d8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-subtitle {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.5);
          max-width: 540px;
          line-height: 1.6;
          margin-bottom: 40px;
          z-index: 2;
        }
        .cta-group {
          display: flex;
          gap: 16px;
          z-index: 2;
        }
        .glow-bg {
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(124,77,255,0.15) 0%, transparent 70%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }
      `}</style>

      <div className="hero-root">
        <Navbar />
        <div className="glow-bg" />
        
        <h1 className="hero-title">
          Weave your future with <span>AI Precision.</span>
        </h1>
        
        <p className="hero-subtitle">
          The ultimate roadmap generator for students. Turn your chaos into a structured path to success in seconds.
        </p>

        <div className="cta-group">
          <button
            className="nav-btn"
            style={{ padding: "16px 32px", fontSize: "16px" }}
            onClick={() => router.push("/signup")}
          >
            Build My Roadmap
          </button>

          <button
            className="nav-btn"
            style={{
              background: "transparent",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            Watch Demo
          </button>
        </div>
      </div>
    </>
  );
}