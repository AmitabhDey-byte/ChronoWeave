"use client";

import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function VerifyPage() {
  const { signUp } = useSignUp();
  const router = useRouter();

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendLoading, setResendLoading] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    try {
      setLoading(true);
      setError("");

      if (!signUp) {
        setError("Sign-up session not found. Please start again.");
        return;
      }

      const result = await signUp.attemptEmailAddressVerification({ code });
      if (result.status === "complete") {
        router.push("/Dashboard");
        return;
      }

      setError("Verification is still pending. Please use the latest code from your email.");
    } catch (err: unknown) {
      console.error(err);
      setError("Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendLoading) return;

    try {
      setResendLoading(true);
      if (!signUp) {
        setError("Sign-up session not found. Please start again.");
        return;
      }
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setError("Fresh code sent. Check your inbox and paste the newest one.");
    } catch (err: unknown) {
      console.error(err);
      setError("Failed to resend code. Please try again.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0c29] text-white p-4">
      <div className="w-full max-w-md p-8 bg-white/5 rounded-2xl backdrop-blur-xl border border-white/10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Verify Your Email</h1>
          <p className="text-white/60">We&apos;ve sent a verification code to your email address. Please enter it below.</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Enter verification code"
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 outline-none focus:border-purple-500 transition-colors text-center text-lg font-mono"
              value={code}
              onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
              maxLength={6}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || code.length !== 6}
            className="w-full p-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-white/60 mb-2">Didn&apos;t receive the code?</p>
          <button
            onClick={handleResend}
            disabled={resendLoading}
            className="text-purple-400 hover:text-purple-300 transition-colors disabled:opacity-50"
          >
            {resendLoading ? "Sending..." : "Resend Code"}
          </button>
        </div>

        <p className="mt-6 text-sm text-center text-white/60">
          <span onClick={() => router.push("/sign-up")} className="cursor-pointer text-purple-400 hover:text-purple-300 transition-colors">
            Back to Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}
