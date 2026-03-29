"use client";

import { useState, useEffect } from "react";
import { useSignUp, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function VerifyPage() {
  const { signUp } = useSignUp();
  const { setActive } = useClerk();
  const router = useRouter();

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendLoading, setResendLoading] = useState(false);

  useEffect(() => {
    // If the user is already verified, redirect them
    if (signUp.status === "complete") {
      router.push("/");
    }
  }, [signUp.status, router]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    try {
      setLoading(true);
      setError("");

      // Simplified verification - in a real implementation, you'd call the appropriate Clerk method
      setError("Email verification is not fully implemented yet. Please check your email for instructions.");
    } catch (err: any) {
      console.error(err);
      setError(err?.errors?.[0]?.message || "Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendLoading) return;

    try {
      setResendLoading(true);
      // Simplified resend - in a real implementation, you'd call the appropriate Clerk method
      setError("Resend functionality not implemented yet.");
    } catch (err: any) {
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
          <p className="text-white/60">
            We've sent a verification code to your email address. Please enter it below.
          </p>
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
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
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
          <p className="text-sm text-white/60 mb-2">
            Didn't receive the code?
          </p>
          <button
            onClick={handleResend}
            disabled={resendLoading}
            className="text-purple-400 hover:text-purple-300 transition-colors disabled:opacity-50"
          >
            {resendLoading ? "Sending..." : "Resend Code"}
          </button>
        </div>

        <p className="mt-6 text-sm text-center text-white/60">
          <span
            onClick={() => router.push("/signup")}
            className="cursor-pointer text-purple-400 hover:text-purple-300 transition-colors"
          >
            Back to Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}