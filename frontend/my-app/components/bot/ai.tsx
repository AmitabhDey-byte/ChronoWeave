"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AiCoachCard() {
  const router = useRouter();

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md p-6 flex flex-col justify-center items-center h-[250px] text-center">
      <div className="w-20 h-20 relative mb-4">
        <Image
          src="/bot.png"
          alt="AI Coach"
          fill
          className="object-contain"
        />
      </div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
        Need Help?
      </h3>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Ask our AI Civic Coach about laws, rights and duties.
      </p>

      {/* Button */}
      <button
        onClick={() => router.push("/aicoach")}
        className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold text-sm transition-all transform hover:scale-105 active:scale-95"
      >
        Ask Coach
      </button>
    </div>
  );
}