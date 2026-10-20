"use client";

import { Code, LayoutGrid, Mail, TvMinimal, User } from "lucide-react";
import Link from "next/link";

const pageItems = [
  { label: "Hero", icon: <LayoutGrid size={20} /> },
  { label: "About", icon: <User size={20} /> },
  { label: "Skills", icon: <Code size={20} /> },
  { label: "Works", icon: <TvMinimal size={20} /> },
  { label: "Contact", icon: <Mail size={20} /> },
];

export default function Navbar() {
  return (
    <nav className="fixed left-5 top-1/3 -translate-y-1/2 flex flex-col space-y-3 bg-white/5 backdrop-blur-sm border border-primary/10 p-3 rounded-full shadow-lg z-50">
      {pageItems.map((item) => (
        <div key={item.label} className="relative flex items-center group">
          <Link
            href={`#${item.label.toLowerCase()}`}
            onClick={(e) => {
              e.preventDefault();
              document.querySelector(`#${item.label.toLowerCase()}`)?.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-secondary hover:text-priamry transition-colors duration-200"
          >
            {item.icon}
          </Link>

          {/* Tooltip - CSS only, no state needed */}
          <div className="absolute left-12 bg-secondary text-primary text-sm font-medium px-2 py-1 rounded-md shadow-md pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            {item.label}
          </div>
        </div>
      ))}
    </nav>
  );
}