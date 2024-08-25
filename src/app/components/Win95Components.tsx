import React from "react";

export const Win95Window: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="win95-window">
    <div className="win95-title-bar">
      <span>{title}</span>
      <button className="win95-btn px-2 py-0 text-black">×</button>
    </div>
    <div className="p-4">{children}</div>
  </div>
);

export const Win95Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => (
  <button className="win95-btn" {...props}>
    {children}
  </button>
);

export const Win95Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input className="win95-inset bg-white px-2 py-1 w-full" {...props} />
);

export const Win95List: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="win95-inset bg-white p-1 overflow-auto">{children}</div>
);

export const Win95ListItem: React.FC<{ children: React.ReactNode; active?: boolean }> = ({ children, active }) => (
  <div
    className={`px-1 py-0.5 ${
      active ? "bg-[var(--win95-blue)] text-white" : "hover:bg-[var(--win95-blue)] hover:text-white"
    }`}
  >
    {children}
  </div>
);
