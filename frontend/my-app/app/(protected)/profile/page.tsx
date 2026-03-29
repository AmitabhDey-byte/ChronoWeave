"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { BadgeCheck, Brain, Clock3, LibraryBig, MapPin, PencilLine, Sparkles } from "lucide-react";

import ProfileEditor, { type EditableProfile } from "@/components/profile/ProfileEditor";
import { Card } from "@/components/ui/card";
import { mergeMetadata, readChronoWeaveLearnerProfile, readChronoWeaveProfile, toList } from "@/lib/clerk-profile";
import { readStoredProfile, storeProfile } from "@/lib/profile";
import type { LearnerProfile } from "@/lib/api-client";

export default function ProfilePage() {
  const { isLoaded, user } = useUser();
  const [profile, setProfile] = useState<LearnerProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const localProfile = readStoredProfile();
      const clerkProfile = readChronoWeaveLearnerProfile(user?.unsafeMetadata);

      if (localProfile) {
        setProfile(localProfile);
        return;
      }

      if (clerkProfile) {
        storeProfile(clerkProfile);
        setProfile(clerkProfile);
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, [user?.unsafeMetadata]);

  if (!isLoaded) {
    return null;
  }

  const metadataProfile = readChronoWeaveProfile(user?.unsafeMetadata);
  const mergedProfile = profile || readChronoWeaveLearnerProfile(user?.unsafeMetadata);
  const displayName = metadataProfile.displayName || user?.fullName || user?.firstName || "Creator";
  const email = user?.primaryEmailAddress?.emailAddress || "";

  const defaultValues: EditableProfile = {
    displayName,
    email,
    location: metadataProfile.location,
    bio: metadataProfile.bio,
    vibe: metadataProfile.vibe,
    experienceLevel: mergedProfile?.experienceLevel || "beginner",
    preferredPace: mergedProfile?.preferredPace || "",
    timeCommitment: mergedProfile?.timeCommitment || "",
    learningGoals: mergedProfile?.learningGoals.join(", ") || "",
    interests: mergedProfile?.interests.join(", ") || "",
    background: mergedProfile?.background || "",
  };

  const saveProfile = async (data: EditableProfile) => {
    if (!user) {
      return;
    }

    const learnerProfile: LearnerProfile = {
      experienceLevel: data.experienceLevel,
      preferredPace: data.preferredPace,
      timeCommitment: data.timeCommitment,
      learningGoals: toList(data.learningGoals),
      interests: toList(data.interests),
      background: data.background,
    };

    setIsSaving(true);
    setError(null);
    setStatus(null);

    try {
      await user.update({
        unsafeMetadata: mergeMetadata(
          user.unsafeMetadata,
          {
            displayName: data.displayName,
            bio: data.bio,
            location: data.location,
            vibe: data.vibe,
          },
          learnerProfile,
        ),
      });

      storeProfile(learnerProfile);
      setProfile(learnerProfile);
      setIsEditing(false);
      setStatus("Profile synced with Clerk and updated for your roadmap studio.");
    } catch (saveError) {
      console.error(saveError);
      setError("We couldn't save your profile just yet. Please try once more.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!mergedProfile && !isEditing) {
    return (
      <div className="profile-stack">
        <div className="profile-hero">
          <div className="profile-hero__identity">
            <div className="profile-avatar">{displayName.charAt(0).toUpperCase()}</div>
            <div>
              <p className="eyebrow">Signed-in identity</p>
              <h2>{displayName}</h2>
              <p className="muted">{email || "No email found"}</p>
            </div>
          </div>
          <button className="button button--primary" type="button" onClick={() => setIsEditing(true)}>
            <PencilLine size={16} />
            Build profile
          </button>
        </div>

        <div className="placeholder-state">
          <h2>No learner profile yet</h2>
          <p className="muted">Complete onboarding or build your profile here to personalize recommendations and roadmap generation.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-stack">
      <div className="profile-hero">
        <div className="profile-hero__identity">
          <div className="profile-avatar">{displayName.charAt(0).toUpperCase()}</div>
          <div className="profile-meta">
            <p className="eyebrow">Learner identity</p>
            <h2>{displayName}</h2>
            <p>{metadataProfile.bio || "Design your learning identity so recommendations hit harder."}</p>
            <div className="profile-meta__row">
              <span><MapPin size={14} /> {metadataProfile.location || "Location not set"}</span>
              <span><Sparkles size={14} /> {metadataProfile.vibe || "Still defining the vibe"}</span>
            </div>
          </div>
        </div>
        <button className="button button--secondary" type="button" onClick={() => setIsEditing((current) => !current)}>
          <PencilLine size={16} />
          {isEditing ? "Close editor" : "Edit profile"}
        </button>
      </div>

      {status ? <div className="status-banner status-banner--success">{status}</div> : null}
      {error ? <div className="status-banner status-banner--error">{error}</div> : null}

      <div className="profile-stat-grid">
        <Card>
          <p className="eyebrow"><Brain size={14} style={{ marginRight: 6, verticalAlign: "text-bottom" }} />Experience</p>
          <h3 style={{ marginTop: 0 }}>{mergedProfile?.experienceLevel || "beginner"}</h3>
        </Card>
        <Card>
          <p className="eyebrow"><Clock3 size={14} style={{ marginRight: 6, verticalAlign: "text-bottom" }} />Time commitment</p>
          <h3 style={{ marginTop: 0 }}>{mergedProfile?.timeCommitment || "Flexible"}</h3>
        </Card>
        <Card>
          <p className="eyebrow"><LibraryBig size={14} style={{ marginRight: 6, verticalAlign: "text-bottom" }} />Goals</p>
          <h3 style={{ marginTop: 0 }}>{mergedProfile?.learningGoals.length || 0}</h3>
        </Card>
        <Card>
          <p className="eyebrow"><BadgeCheck size={14} style={{ marginRight: 6, verticalAlign: "text-bottom" }} />Interests</p>
          <h3 style={{ marginTop: 0 }}>{mergedProfile?.interests.length || 0}</h3>
        </Card>
      </div>

      {isEditing ? (
        <ProfileEditor defaultValues={defaultValues} isSaving={isSaving} onCancel={() => setIsEditing(false)} onSave={saveProfile} />
      ) : null}

      <div className="profile-panel-grid">
        <Card>
          <p className="eyebrow">Learning goals</p>
          <div className="profile-chip-list">
            {(mergedProfile?.learningGoals || []).map((goal) => (
              <span key={goal} className="profile-chip">{goal}</span>
            ))}
          </div>
        </Card>

        <Card>
          <p className="eyebrow">Interests</p>
          <div className="profile-chip-list">
            {(mergedProfile?.interests || []).map((interest) => (
              <span key={interest} className="profile-chip profile-chip--alt">{interest}</span>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <p className="eyebrow">Background context</p>
        <p style={{ marginTop: 0, marginBottom: 0, lineHeight: 1.7 }}>
          {mergedProfile?.background || "No extra context saved yet. Add your story so roadmap generation has better context."}
        </p>
      </Card>
    </div>
  );
}
