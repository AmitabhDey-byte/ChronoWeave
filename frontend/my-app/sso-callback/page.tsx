"use client";

import { useEffect } from "react";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function SSOCallbackPage() {
  const { handleRedirectCallback } = useClerk();
  const router = useRouter();

  useEffect(() => {
    handleRedirectCallback({}).catch(() => router.push("/login"));
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500&display=swap');
        body { background: #080810; margin: 0; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        .wrap{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;background:#080810}
        .spinner{width:36px;height:36px;border:3px solid rgba(139,92,246,0.2);border-top-color:#7c3aed;border-radius:50%;animation:spin 0.8s linear infinite}
        .txt{font-family:'DM Sans',sans-serif;font-size:14px;color:rgba(255,255,255,0.3);animation:fadeIn 0.5s 0.2s ease both;opacity:0}
      `}</style>
      <div className="wrap">
        <div className="spinner" />
        <p className="txt">Completing sign-in…</p>
      </div>
    </>
  );
}