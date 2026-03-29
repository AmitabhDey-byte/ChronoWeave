import type { LearnerProfile } from "@/lib/api-client";

export const PROFILE_STORAGE_KEY = "chronoweave.user_profile";

export function readStoredProfile(): LearnerProfile | null {
  if (typeof window === "undefined") {
    return null;
  }

  const saved = window.localStorage.getItem(PROFILE_STORAGE_KEY);
  if (!saved) {
    return null;
  }

  try {
    const parsed = JSON.parse(saved) as LearnerProfile;
    return {
      experienceLevel: parsed.experienceLevel || "beginner",
      learningGoals: parsed.learningGoals || [],
      interests: parsed.interests || [],
      preferredPace: parsed.preferredPace || "Supportive mentor",
      timeCommitment: parsed.timeCommitment || "",
      background: parsed.background || "",
    };
  } catch {
    return null;
  }
}

export function storeProfile(profile: LearnerProfile) {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
}
