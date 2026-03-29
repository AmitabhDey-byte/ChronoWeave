'use client';

import { useUser } from "@clerk/nextjs";
import { Home, Map, PenTool, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Sidebar = () => {
  const pathname = usePathname();
  const { user } = useUser();
  const menuItems = [
    { icon: <Home size={18} />, label: "Dashboard", href: "/Dashboard" },
    { icon: <PenTool size={18} />, label: "Onboarding", href: "/onboarding" },
    { icon: <Map size={18} />, label: "Roadmap", href: "/roadmap" },
    { icon: <User size={18} />, label: "Profile", href: "/profile" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar__menu">
        {menuItems.map((item) => (
          <Link key={item.href} href={item.href} className={`nav-pill${pathname === item.href ? " nav-pill--active" : ""}`}>
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </div>

      <div className="sidebar__card">
        <p className="eyebrow">Studio notes</p>
        <h3>{user?.firstName ? `${user.firstName}'s studio` : "Keep your RAG context warm"}</h3>
        <p>
          Finish onboarding, then generate from the roadmap page to blend your profile with the document store.
          Your signed-in account keeps that setup attached to you.
        </p>
      </div>
    </aside>
  );
};
