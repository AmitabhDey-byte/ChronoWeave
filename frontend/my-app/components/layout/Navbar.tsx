"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter(); // ✅ FIX: initialize router inside component

  return (
    <>
      <style>{`
        .nav-container {
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          max-width: 1200px;
          height: 64px;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          z-index: 1000;
        }
        .nav-logo {
          font-weight: 800;
          font-size: 20px;
          color: #fff;
          letter-spacing: -0.5px;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }
        .nav-links {
          display: flex;
          gap: 32px;
        }
        .nav-link {
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: color 0.2s;
        }
        .nav-link:hover { color: #fff; }
        .nav-btn {
          background: #fff;
          color: #000;
          padding: 10px 20px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 700;
          border: none;
          cursor: pointer;
        }
      `}</style>

      <nav className="nav-container">
        <div
          className="nav-logo"
          onClick={() => router.push("/")} // optional: go home on click
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #7c4dff, #00b4d8)",
            }}
          />
          ChronoWeave
        </div>

        <div className="nav-links">
          <a href="#" className="nav-link">Features</a>
          <a href="#" className="nav-link">Templates</a>
          <a href="#" className="nav-link">Community</a>
        </div>

        <button
          className="nav-btn"
          style={{
            background: "transparent",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
          onClick={() => router.push("/dashboard")}
        >
          Get Started
        </button>
      </nav>
    </>
  );
}