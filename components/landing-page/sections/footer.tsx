import Link from "next/link";
import { SOCIAL_ITEMS } from "../data";

export default function Footer() {
  return (
    <footer className="lg:gap-20 gap-8 py-3 md:py-4 lg:py-5 text-secondary bg-foreground/5 backdrop-blur-xs flex flex-col lg:flex-row-reverse justify-center items-center w-full border-t border-primary/20">
      
      <div className="flex gap-6">
        {SOCIAL_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            className="rounded-full text-secondary hover:text-primary transition-colors duration-200"
          >
            {item.icon}
          </Link>
        ))}
      </div>

      <p className="text-sm text-secondary/70">
        © {new Date().getFullYear()} <span className="font-bold text-primary">Mohamed Ahmed</span>. All rights reserved.
      </p>

    </footer>
  );
}