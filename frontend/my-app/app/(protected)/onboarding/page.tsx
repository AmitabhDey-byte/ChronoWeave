"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import QuestionCard from "@/components/onboarding/QuestionCard";
import OptionSelector from "@/components/onboarding/OptionSelector";
import ProgressStepper from "@/components/onboarding/ProgressStepper";
import { Button } from "@/components/ui/button";
import {
  Code,
  Palette,
  Database,
  Shield,
  Brain,
  Rocket,
  BookOpen,
  Target,
  Zap,
  Users,
  Trophy,
  Star
} from "lucide-react";

type OnboardingData = {
  experienceLevel: string;
  learningGoals: string[];
  interests: string[];
  preferredPace: string;
  timeCommitment: string;
  background: string;
};

const questions = [
  {
    id: "experience",
    title: "What's your coding experience level?",
    description: "This helps us create a personalized learning path for you.",
    type: "single",
    options: [
      { id: "beginner", label: "Beginner", description: "New to programming, just getting started", icon: <BookOpen size={20} /> },
      { id: "intermediate", label: "Intermediate", description: "Have some experience, know basics", icon: <Code size={20} /> },
      { id: "advanced", label: "Advanced", description: "Experienced developer, looking to specialize", icon: <Zap size={20} /> }
    ]
  },
  {
    id: "goals",
    title: "What are your main learning goals?",
    description: "Select all that apply. We'll build your roadmap around these objectives.",
    type: "multiple",
    options: [
      { id: "web-dev", label: "Web Development", description: "Build websites and web applications", icon: <Code size={20} /> },
      { id: "mobile-dev", label: "Mobile Development", description: "Create mobile apps", icon: <Rocket size={20} /> },
      { id: "data-science", label: "Data Science", description: "Analyze data and build ML models", icon: <Brain size={20} /> },
      { id: "ui-ux", label: "UI/UX Design", description: "Design beautiful user interfaces", icon: <Palette size={20} /> },
      { id: "backend", label: "Backend Development", description: "Build servers and APIs", icon: <Database size={20} /> },
      { id: "devops", label: "DevOps", description: "Deployment and infrastructure", icon: <Shield size={20} /> }
    ]
  },
  {
    id: "interests",
    title: "What technologies interest you most?",
    description: "Help us understand your preferences to recommend the best tools and frameworks.",
    type: "multiple",
    options: [
      { id: "javascript", label: "JavaScript/TypeScript", description: "Most popular web language", icon: <Code size={20} /> },
      { id: "python", label: "Python", description: "Versatile for web, data, and AI", icon: <Brain size={20} /> },
      { id: "react", label: "React/Next.js", description: "Modern frontend framework", icon: <Zap size={20} /> },
      { id: "ai-ml", label: "AI & Machine Learning", description: "Future of technology", icon: <Brain size={20} /> },
      { id: "cloud", label: "Cloud Computing", description: "Scalable infrastructure", icon: <Rocket size={20} /> },
      { id: "design", label: "Design Systems", description: "Creating beautiful experiences", icon: <Palette size={20} /> }
    ]
  },
  {
    id: "pace",
    title: "What's your preferred learning pace?",
    description: "We'll adjust the roadmap intensity based on your availability.",
    type: "single",
    options: [
      { id: "intensive", label: "Intensive", description: "Full-time learning, quick progress", icon: <Zap size={20} /> },
      { id: "balanced", label: "Balanced", description: "Part-time, steady progress", icon: <Target size={20} /> },
      { id: "casual", label: "Casual", description: "Flexible, learn at your own pace", icon: <BookOpen size={20} /> }
    ]
  },
  {
    id: "time",
    title: "How much time can you commit weekly?",
    description: "This helps us create realistic milestones and deadlines.",
    type: "single",
    options: [
      { id: "5-10", label: "5-10 hours", description: "Weekend warrior approach", icon: <BookOpen size={20} /> },
      { id: "10-20", label: "10-20 hours", description: "Dedicated part-time learning", icon: <Target size={20} /> },
      { id: "20-30", label: "20-30 hours", description: "Almost full-time commitment", icon: <Zap size={20} /> },
      { id: "30+", label: "30+ hours", description: "Full-time learning journey", icon: <Rocket size={20} /> }
    ]
  },
  {
    id: "background",
    title: "What's your background?",
    description: "Understanding your starting point helps us build the perfect foundation.",
    type: "single",
    options: [
      { id: "student", label: "Student", description: "Currently in school or university", icon: <BookOpen size={20} /> },
      { id: "career-changer", label: "Career Changer", description: "Switching to tech from another field", icon: <Rocket size={20} /> },
      { id: "self-taught", label: "Self-Taught", description: "Learning independently", icon: <Target size={20} /> },
      { id: "professional", label: "Professional", description: "Working in tech, want to upskill", icon: <Trophy size={20} /> }
    ]
  }
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    experienceLevel: "",
    learningGoals: [],
    interests: [],
    preferredPace: "",
    timeCommitment: "",
    background: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const currentQuestion = questions[currentStep];
  const isLastStep = currentStep === questions.length - 1;

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleOptionChange = (selected: string[]) => {
    const field = currentQuestion.id;
    setOnboardingData(prev => ({
      ...prev,
      [field]: currentQuestion.type === "multiple" ? selected : selected[0] || ""
    }));
  };

  const handleComplete = async () => {
    setIsLoading(true);

    // Save onboarding data to localStorage (since we're doing frontend-only)
    localStorage.setItem("userProfile", JSON.stringify(onboardingData));
    localStorage.setItem("onboardingCompleted", "true");

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Redirect to dashboard
    router.push("/Dashboard");
  };

  const canProceed = () => {
    const field = currentQuestion.id;
    const value = onboardingData[field as keyof OnboardingData];

    if (currentQuestion.type === "multiple") {
      return Array.isArray(value) && value.length > 0;
    }
    return value && value.toString().trim() !== "";
  };

  if (isLoading) {
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-6 text-white">
        {/* Glow Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/30 blur-[140px] rounded-full animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/30 blur-[140px] rounded-full animate-pulse" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="mx-auto w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full"
          />
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Creating Your Learning Roadmap</h2>
            <p className="text-white/60">Analyzing your preferences and building personalized content...</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-6 text-white">
      {/* Glow Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/30 blur-[140px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/30 blur-[140px] rounded-full animate-pulse" />
      </div>

      <div className="w-full max-w-4xl space-y-8">
        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <ProgressStepper
            steps={questions.map(q => q.title)}
            currentStep={currentStep}
          />
          <p className="text-white/60 mt-4">
            Step {currentStep + 1} of {questions.length}
          </p>
        </motion.div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <QuestionCard
              title={currentQuestion.title}
              description={currentQuestion.description}
              onNext={canProceed() ? handleNext : undefined}
              onBack={currentStep > 0 ? handleBack : undefined}
              isLast={isLastStep}
            >
              <OptionSelector
                options={currentQuestion.options}
                selected={
                  currentQuestion.type === "multiple"
                    ? (onboardingData[currentQuestion.id as keyof OnboardingData] as string[])
                    : [onboardingData[currentQuestion.id as keyof OnboardingData] as string].filter(Boolean)
                }
                onChange={handleOptionChange}
                multiple={currentQuestion.type === "multiple"}
              />
            </QuestionCard>
          </motion.div>
        </AnimatePresence>

        {/* Skip Option */}
        {currentStep < questions.length - 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <button
              onClick={() => router.push("/Dashboard")}
              className="text-white/40 hover:text-white/60 text-sm underline transition-colors"
            >
              Skip onboarding and go to dashboard
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}