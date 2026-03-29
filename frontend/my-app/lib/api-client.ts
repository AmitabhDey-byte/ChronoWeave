const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000").replace(/\/$/, "");

export type LearnerProfile = {
  experienceLevel: string;
  learningGoals: string[];
  interests: string[];
  preferredPace?: string;
  timeCommitment?: string;
  background?: string;
};

export type Diagnostics = {
  ragReady: boolean;
  documentsIndexed: number;
  generatorReady: boolean;
  generatorFallback: boolean;
  generatorError?: string | null;
};

export type RecommendationResponse = {
  status: string;
  headline: string;
  summary: string;
  focusAreas: string[];
  topSource: string;
  diagnostics: Diagnostics;
};

export type RoadmapStep = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

export type RoadmapResponse = {
  status: string;
  query: string;
  overview: string;
  steps: RoadmapStep[];
  sources: Array<{
    source: string;
    distance?: number;
    excerpt: string;
  }>;
  diagnostics: Diagnostics;
};

export type HealthResponse = {
  status: string;
  ragReady: boolean;
  documentsIndexed: number;
  generatorReady: boolean;
  generatorFallback: boolean;
  generatorError?: string | null;
};

async function fetchFromAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${API_BASE_URL}${cleanEndpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const detail = await response.text();
      throw new Error(detail || `Server responded with ${response.status}`);
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error("ChronoWeave connection error:", error);
    throw new Error("The frontend couldn't reach ChronoWeave backend. Start FastAPI on port 8000 and try again.");
  }
}

export function fetchHealth() {
  return fetchFromAPI<HealthResponse>("/health");
}

export function fetchRecommendations(profile: LearnerProfile) {
  return fetchFromAPI<RecommendationResponse>("/api/v1/recommendations", {
    method: "POST",
    body: JSON.stringify({ profile }),
  });
}

export function generateRoadmap(profile: LearnerProfile) {
  return fetchFromAPI<RoadmapResponse>("/api/v1/roadmap/generate", {
    method: "POST",
    body: JSON.stringify({ profile }),
  });
}
