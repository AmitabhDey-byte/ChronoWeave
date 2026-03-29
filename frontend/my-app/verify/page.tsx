"use client";

import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function VerifyPage() {
  const { signUp } = useSignUp();
  const router = useRouter();
  const [code, setCode] = useState("");

  const handleVerify = async () => {
    try {
      // Simplified verification - in a real implementation, you'd call the appropriate Clerk method
      alert("Email verification is not fully implemented yet. Please check your email for instructions.");
      router.push("/");
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center text-white bg-black">
      <div>
        <input
          placeholder="Enter code"
          onChange={(e) => setCode(e.target.value)}
          className="p-2 text-black"
        />
        <button onClick={handleVerify}>Verify</button>
      </div>
    </div>
  );
}