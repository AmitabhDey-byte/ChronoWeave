"use client";
import React from "react";

export default function Sidebar() {
  const menuItems = ["Dashboard", "My Roadmaps", "AI Assistant", "Settings"];

  return (
    <>
      <style>{`
        .sidebar-root {
          width: 260px;
          height: 100vh;
          background: rgba(15, 12, 41, 0.6);
          border-right: 1px solid rgba(255, 255, 255, 0.05);
          padding: 100px 20px 40px;
          display: flex;
          flex-direction: column;
        }
        .sidebar-item {
          padding: 14px 16px;
          border-radius: 12px;
          color: rgba(255, 255, 255, 0.5);
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          margin-bottom: 4px;
        }
        .sidebar-item:hover {
          background: rgba(255, 255, 255, 0.05);
          color: #fff;
        }
        .sidebar-item.active {
          background: rgba(124, 77, 255, 0.1);
          color: #7c4dff;
        }
      `}</style>

      <div className="sidebar-root">
        {menuItems.map((item, i) => (
          <div key={item} className={`sidebar-item ${i === 0 ? 'active' : ''}`}>
            {item}
          </div>
        ))}
      </div>
    </>
  );
}