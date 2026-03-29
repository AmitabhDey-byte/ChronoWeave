import { SignIn } from "@clerk/nextjs";

import { AuthShell } from "@/components/auth/AuthShell";

export default function SignInPage() {
  return (
    <AuthShell
      title="Welcome back to your learning studio."
      subtitle="Jump into your dashboard, refresh your profile, and keep the roadmap energy going."
      alternateText="Need an account?"
      alternateLabel="Create one"
      alternateHref="/sign-up"
    >
      <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" fallbackRedirectUrl="/Dashboard" />
    </AuthShell>
  );
}
