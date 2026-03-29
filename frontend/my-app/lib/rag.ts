// Simple RAG implementation for the frontend
// This simulates RAG functionality using the processed learning data

export interface LearningResource {
  title: string;
  content: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  prerequisites?: string[];
  tags: string[];
  relevanceScore?: number;
}

export interface UserProfile {
  experienceLevel: string;
  learningGoals: string[];
  interests: string[];
  preferredPace: string;
  timeCommitment: string;
  background: string;
}

// Mock learning data based on the processed chunks
const learningResources: LearningResource[] = [
  {
    title: "Android Development Fundamentals",
    content: "Learn the basics of Android development including activity lifecycle, intents, and basic UI components.",
    category: "mobile-dev",
    difficulty: "beginner",
    estimatedTime: "3-4 weeks",
    tags: ["android", "java", "kotlin", "mobile"]
  },
  {
    title: "iOS Development with Swift",
    content: "Master iOS development using Swift, covering app structure, UI design, and modern iOS frameworks.",
    category: "mobile-dev",
    difficulty: "beginner",
    estimatedTime: "4-6 weeks",
    tags: ["ios", "swift", "mobile", "apple"]
  },
  {
    title: "React Native Cross-Platform Development",
    content: "Build apps for both Android and iOS using a single codebase with React Native.",
    category: "mobile-dev",
    difficulty: "intermediate",
    estimatedTime: "6-8 weeks",
    prerequisites: ["javascript", "react"],
    tags: ["react-native", "javascript", "cross-platform"]
  },
  {
    title: "Web Development with React",
    content: "Build modern web applications using React, Next.js, and contemporary frontend technologies.",
    category: "web-dev",
    difficulty: "beginner",
    estimatedTime: "8-12 weeks",
    tags: ["react", "javascript", "frontend", "nextjs"]
  },
  {
    title: "Backend Development with Node.js",
    content: "Create server-side applications, APIs, and database integrations using Node.js and Express.",
    category: "backend",
    difficulty: "intermediate",
    estimatedTime: "6-10 weeks",
    prerequisites: ["javascript"],
    tags: ["nodejs", "express", "api", "backend"]
  },
  {
    title: "Python for Data Science",
    content: "Learn data analysis, visualization, and machine learning fundamentals using Python.",
    category: "data-science",
    difficulty: "beginner",
    estimatedTime: "10-14 weeks",
    tags: ["python", "data-science", "machine-learning", "pandas"]
  },
  {
    title: "UI/UX Design Principles",
    content: "Master user interface and user experience design, including design systems and prototyping.",
    category: "ui-ux",
    difficulty: "beginner",
    estimatedTime: "6-8 weeks",
    tags: ["ui", "ux", "design", "figma", "prototyping"]
  },
  {
    title: "DevOps and Deployment",
    content: "Learn containerization, CI/CD pipelines, and cloud deployment strategies.",
    category: "devops",
    difficulty: "advanced",
    estimatedTime: "8-12 weeks",
    prerequisites: ["basic programming"],
    tags: ["docker", "kubernetes", "aws", "ci-cd", "cloud"]
  },
  {
    title: "TypeScript Advanced Concepts",
    content: "Deep dive into TypeScript generics, advanced types, and enterprise-level patterns.",
    category: "web-dev",
    difficulty: "advanced",
    estimatedTime: "4-6 weeks",
    prerequisites: ["javascript", "basic typescript"],
    tags: ["typescript", "advanced", "generics", "patterns"]
  },
  {
    title: "Machine Learning with Python",
    content: "Build and deploy machine learning models using scikit-learn and TensorFlow.",
    category: "data-science",
    difficulty: "advanced",
    estimatedTime: "12-16 weeks",
    prerequisites: ["python", "statistics", "linear algebra"],
    tags: ["machine-learning", "tensorflow", "scikit-learn", "ai"]
  }
];

export class LearningRAG {
  private resources: LearningResource[] = learningResources;

  // Simulate semantic search based on user profile
  searchRelevantContent(userProfile: UserProfile, query?: string): LearningResource[] {
    let filteredResources = [...this.resources];

    // Filter by experience level
    if (userProfile.experienceLevel) {
      const levelMap = {
        'beginner': ['beginner'],
        'intermediate': ['beginner', 'intermediate'],
        'advanced': ['intermediate', 'advanced']
      };

      const allowedLevels = levelMap[userProfile.experienceLevel as keyof typeof levelMap] || [];
      filteredResources = filteredResources.filter(resource =>
        allowedLevels.includes(resource.difficulty)
      );
    }

    // Filter by learning goals
    if (userProfile.learningGoals.length > 0) {
      filteredResources = filteredResources.filter(resource =>
        userProfile.learningGoals.includes(resource.category)
      );
    }

    // Boost relevance based on interests
    filteredResources.forEach(resource => {
      let score = 1;

      // Interest matching
      const interestMatches = resource.tags.filter(tag =>
        userProfile.interests.some(interest =>
          tag.toLowerCase().includes(interest.toLowerCase()) ||
          interest.toLowerCase().includes(tag.toLowerCase())
        )
      );
      score += interestMatches.length * 0.5;

      // Goal matching
      if (userProfile.learningGoals.includes(resource.category)) {
        score += 1;
      }

      // Difficulty appropriateness
      if (userProfile.experienceLevel === resource.difficulty) {
        score += 0.3;
      }

      resource.relevanceScore = score;
    });

    // Sort by relevance score
    filteredResources.sort((a, b) =>
      (b.relevanceScore || 0) - (a.relevanceScore || 0)
    );

    return filteredResources.slice(0, 8); // Return top 8 recommendations
  }

  // Generate personalized learning roadmap
  generateRoadmap(userProfile: UserProfile): {
    phases: Array<{
      title: string;
      duration: string;
      resources: LearningResource[];
      focus: string;
    }>;
    totalDuration: string;
    milestones: string[];
  } {
    const relevantResources = this.searchRelevantContent(userProfile);

    // Group resources by difficulty for phased learning
    const beginnerResources = relevantResources.filter(r => r.difficulty === 'beginner');
    const intermediateResources = relevantResources.filter(r => r.difficulty === 'intermediate');
    const advancedResources = relevantResources.filter(r => r.difficulty === 'advanced');

    // Calculate timeline based on user's pace and time commitment
    const getPhaseDuration = (resources: LearningResource[]) => {
      const totalWeeks = resources.reduce((sum, resource) => {
        const weeks = parseInt(resource.estimatedTime.split('-')[1] || resource.estimatedTime.split('-')[0]);
        return sum + weeks;
      }, 0);

      // Adjust based on time commitment
      const timeMultiplier = {
        '5-10': 2, // Double time for part-time
        '10-20': 1.5,
        '20-30': 1.2,
        '30+': 1
      }[userProfile.timeCommitment] || 1.5;

      return Math.ceil(totalWeeks * timeMultiplier);
    };

    const phases = [];

    if (beginnerResources.length > 0) {
      phases.push({
        title: "Foundation Building",
        duration: `${getPhaseDuration(beginnerResources)} weeks`,
        resources: beginnerResources,
        focus: "Master the fundamentals and core concepts"
      });
    }

    if (intermediateResources.length > 0) {
      phases.push({
        title: "Skill Development",
        duration: `${getPhaseDuration(intermediateResources)} weeks`,
        resources: intermediateResources,
        focus: "Build practical skills and real-world applications"
      });
    }

    if (advancedResources.length > 0) {
      phases.push({
        title: "Expert Mastery",
        duration: `${getPhaseDuration(advancedResources)} weeks`,
        resources: advancedResources,
        focus: "Specialize and master advanced concepts"
      });
    }

    const totalWeeks = phases.reduce((sum, phase) => {
      return sum + parseInt(phase.duration.split(' ')[0]);
    }, 0);

    const milestones = [
      "Complete first project",
      "Build portfolio website",
      "Contribute to open source",
      "Land first job/internship",
      "Lead a development team"
    ];

    return {
      phases,
      totalDuration: `${totalWeeks} weeks`,
      milestones
    };
  }

  // Get learning recommendations based on current progress
  getRecommendations(userProfile: UserProfile, completedTopics: string[] = []): LearningResource[] {
    const relevantResources = this.searchRelevantContent(userProfile);

    // Filter out completed topics and prioritize next logical steps
    return relevantResources
      .filter(resource => !completedTopics.includes(resource.title))
      .slice(0, 5);
  }

  // Simulate AI-powered learning suggestions
  getAISuggestions(userProfile: UserProfile): string[] {
    const suggestions = [];

    if (userProfile.experienceLevel === 'beginner') {
      suggestions.push("Start with interactive coding platforms like freeCodeCamp");
      suggestions.push("Join coding communities on Discord and Reddit");
      suggestions.push("Practice daily coding challenges on platforms like LeetCode");
    }

    if (userProfile.learningGoals.includes('web-dev')) {
      suggestions.push("Build responsive layouts with CSS Grid and Flexbox");
      suggestions.push("Learn version control with Git and GitHub");
      suggestions.push("Deploy your first website using Vercel or Netlify");
    }

    if (userProfile.preferredPace === 'intensive') {
      suggestions.push("Dedicate specific hours each day to focused learning");
      suggestions.push("Join study groups for accountability");
      suggestions.push("Track progress with detailed learning journals");
    }

    if (userProfile.timeCommitment === '5-10') {
      suggestions.push("Focus on high-impact, practical projects");
      suggestions.push("Use weekends for deep-dive learning sessions");
      suggestions.push("Prioritize quality over quantity in learning");
    }

    return suggestions.slice(0, 5);
  }
}

// Export singleton instance
export const learningRAG = new LearningRAG();