import { SignUp } from "@clerk/nextjs";

import { AuthShell } from "@/components/auth/AuthShell";

export default function SignUpPage() {
  return (
    <AuthShell
      title="Start your next era with a profile that actually knows you."
      subtitle="Create an account to keep your learner identity, roadmap preferences, and recommendations in one place."
      alternateText="Already have an account?"
      alternateLabel="Sign in"
      alternateHref="/sign-in"
    >
      <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" fallbackRedirectUrl="/Dashboard" />
    </AuthShell>
  );
}
