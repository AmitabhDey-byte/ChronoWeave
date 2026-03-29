"use client";

import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { Bell, Search, Sparkles } from "lucide-react";

import { Input } from "../ui/input";

export const Navbar = () => {
  const { user, isSignedIn } = useUser();
  const firstName = user?.firstName || user?.username || "creator";

  return (
    <nav className="topbar">
      <div>
        <p className="eyebrow">Connected learning workspace</p>
        <h1 className="topbar__title">Build a roadmap that actually fits you</h1>
        <p className="topbar__subtitle">Hey {firstName}, your profile, roadmap context, and AI guidance are all in sync.</p>
      </div>

      <div className="topbar__actions">
        <div className="searchbar">
          <Search size={16} />
          <Input placeholder="Search roadmaps, sources, or goals" />
        </div>
        <button className="icon-chip" type="button" aria-label="Notifications">
          <Bell size={18} />
        </button>
        {isSignedIn ? (
          <div className="user-chip">
            <div className="icon-chip icon-chip--accent">
              <Sparkles size={16} />
              <span>Signed in</span>
            </div>
            <UserButton afterSignOutUrl="/" />
          </div>
        ) : (
          <SignInButton mode="redirect">
            <button className="button button--secondary" type="button">
              Sign in
            </button>
          </SignInButton>
        )}
      </div>
    </nav>
  );
};
