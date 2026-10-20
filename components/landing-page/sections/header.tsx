'use client'
import Link from "next/link";
import { SOCIAL_ITEMS } from "../data";

export default function Header() {
  return (
    <header className="flex w-full z-20 text-background items-center bg-foreground/5 backdrop-blur-xs justify-between px-[4%] md:px-[8%] border-b border-primary/20">
      <Link href="/admin" className="font-bold py-3 md:py-4 lg:py-5 flex gap-2">
        <span className="text-primary font-bold">{`<`}</span>
        <span>mohamedAhmed</span>
        <span className="text-primary font-bold">{`/>`}</span>
      </Link>

      <div className="flex items-center gap-3 md:gap-5">
        {SOCIAL_ITEMS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            className="flex items-center gap-1 text-secondary hover:text-primary transition-colors duration-200"
          >
            <span>{item.icon}</span>
            <span className="hidden lg:block text-sm">{item.label}</span>
          </a>
        ))}
      </div>
    </header>
  );
}