"use client";

import { useEffect, useState } from "react";
import { Compass, Mail, MapPin, Save, Sparkles, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export type EditableProfile = {
  displayName: string;
  email: string;
  location: string;
  bio: string;
  vibe: string;
  experienceLevel: string;
  preferredPace: string;
  timeCommitment: string;
  learningGoals: string;
  interests: string;
  background: string;
};

type ProfileEditorProps = {
  defaultValues: EditableProfile;
  isSaving?: boolean;
  onCancel: () => void;
  onSave: (data: EditableProfile) => void | Promise<void>;
};

export default function ProfileEditor({ defaultValues, isSaving = false, onCancel, onSave }: ProfileEditorProps) {
  const [form, setForm] = useState<EditableProfile>(defaultValues);

  useEffect(() => {
    setForm(defaultValues);
  }, [defaultValues]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSave(form);
  };

  return (
    <form className="profile-editor" onSubmit={handleSubmit}>
      <div className="profile-editor__header">
        <div>
          <p className="eyebrow">Profile editor</p>
          <h2>Shape your public vibe and learning setup</h2>
          <p className="muted">
            Save your identity, learner preferences, and roadmap context to your signed-in ChronoWeave account.
          </p>
        </div>
      </div>

      <div className="profile-editor__grid">
        <label className="profile-field">
          <span><User size={14} /> Display name</span>
          <Input name="displayName" value={form.displayName} onChange={handleChange} placeholder="How should we address you?" />
        </label>

        <label className="profile-field">
          <span><Mail size={14} /> Email</span>
          <Input name="email" value={form.email} disabled readOnly />
        </label>

        <label className="profile-field">
          <span><MapPin size={14} /> Location</span>
          <Input name="location" value={form.location} onChange={handleChange} placeholder="City, country, or remote planet" />
        </label>

        <label className="profile-field">
          <span><Sparkles size={14} /> Current vibe</span>
          <Input name="vibe" value={form.vibe} onChange={handleChange} placeholder="Locked in, exploring, career switch, shipping mode" />
        </label>

        <label className="profile-field">
          <span><Compass size={14} /> Experience level</span>
          <select className="select-field" name="experienceLevel" value={form.experienceLevel} onChange={handleChange}>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </label>

        <label className="profile-field">
          <span>Preferred pace</span>
          <Input name="preferredPace" value={form.preferredPace} onChange={handleChange} placeholder="Supportive mentor, sprint mode, steady climb" />
        </label>

        <label className="profile-field">
          <span>Time commitment</span>
          <Input name="timeCommitment" value={form.timeCommitment} onChange={handleChange} placeholder="e.g. 6 hours a week" />
        </label>

        <label className="profile-field">
          <span>Learning goals</span>
          <Input name="learningGoals" value={form.learningGoals} onChange={handleChange} placeholder="frontend, ML, product design" />
        </label>

        <label className="profile-field">
          <span>Interests</span>
          <Input name="interests" value={form.interests} onChange={handleChange} placeholder="motion, AI tools, building startups" />
        </label>
      </div>

      <label className="profile-field">
        <span>Bio</span>
        <Textarea name="bio" value={form.bio} onChange={handleChange} placeholder="Tell people what you are building toward." />
      </label>

      <label className="profile-field">
        <span>Background context</span>
        <Textarea
          name="background"
          value={form.background}
          onChange={handleChange}
          placeholder="Add context about your studies, current role, or the kind of work you want next."
        />
      </label>

      <div className="profile-editor__actions">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSaving}>
          <Save size={16} />
          {isSaving ? "Saving..." : "Save changes"}
        </Button>
      </div>
    </form>
  );
}
