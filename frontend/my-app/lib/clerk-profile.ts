import type { LearnerProfile } from "@/lib/api-client";

export type ChronoWeaveProfile = {
  displayName: string;
  bio: string;
  location: string;
  vibe: string;
};

type MetadataRecord = Record<string, unknown>;

function isRecord(value: unknown): value is MetadataRecord {
  return typeof value === "object" && value !== null;
}

function readRecord(value: unknown, key: string): MetadataRecord | null {
  if (!isRecord(value)) {
    return null;
  }

  const nested = value[key];
  return isRecord(nested) ? nested : null;
}

export function readChronoWeaveProfile(metadata: unknown): ChronoWeaveProfile {
  const profile = readRecord(metadata, "chronoweaveProfile");

  return {
    displayName: typeof profile?.displayName === "string" ? profile.displayName : "",
    bio: typeof profile?.bio === "string" ? profile.bio : "",
    location: typeof profile?.location === "string" ? profile.location : "",
    vibe: typeof profile?.vibe === "string" ? profile.vibe : "",
  };
}

export function readChronoWeaveLearnerProfile(metadata: unknown): LearnerProfile | null {
  const learner = readRecord(metadata, "chronoweaveLearnerProfile");
  if (!learner) {
    return null;
  }

  const learningGoals = Array.isArray(learner.learningGoals)
    ? learner.learningGoals.filter((item): item is string => typeof item === "string")
    : [];
  const interests = Array.isArray(learner.interests)
    ? learner.interests.filter((item): item is string => typeof item === "string")
    : [];

  return {
    experienceLevel: typeof learner.experienceLevel === "string" ? learner.experienceLevel : "beginner",
    learningGoals,
    interests,
    preferredPace: typeof learner.preferredPace === "string" ? learner.preferredPace : "",
    timeCommitment: typeof learner.timeCommitment === "string" ? learner.timeCommitment : "",
    background: typeof learner.background === "string" ? learner.background : "",
  };
}

export function mergeMetadata(
  currentMetadata: unknown,
  profile: ChronoWeaveProfile,
  learnerProfile: LearnerProfile,
): MetadataRecord {
  const root = isRecord(currentMetadata) ? currentMetadata : {};

  return {
    ...root,
    chronoweaveProfile: profile,
    chronoweaveLearnerProfile: learnerProfile,
  };
}

export function toList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}
