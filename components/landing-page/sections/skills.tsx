'use client';

import { Monitor } from "lucide-react";
import Image from "next/image";
import { motion } from 'framer-motion';
import { PageHeader } from "../ui/section-images";
import { LANGUAGE_ITEMS, SKILL_GROUPS } from "../data";

export default function Skills() {
  return (
    <section id="skills" className="flex w-full justify-center px-4 py-12 text-secondary sm:px-6 md:py-16 lg:px-8">
      <div className="relative z-10 flex w-full max-w-7xl flex-col items-center justify-center gap-8">
        <PageHeader title="Skills" description="Always learning, always building" />

        {/* Category badge */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col gap-2 items-center justify-center
          bg-chart-1/80 text-foreground border-l-4 border-primary
          rounded-lg py-3 px-5 text-center"
        >
          <Monitor size={24} />

          <p className="font-semibold text-lg">
            Full-Stack Web Development
          </p>

          <p className="text-xs sm:text-sm">
            React · Next.js · TypeScript · Node.js · Express.js · PostgreSQL
          </p>
        </motion.div>

        {/* Language icons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-row items-center text-center justify-center flex-wrap gap-8"
        >
          {LANGUAGE_ITEMS.map((item) => (
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              key={item.id}
              className="flex flex-col items-center gap-2 hover:scale-110 transition-transform duration-200"
            >
              <Image
                src={item.icon}
                alt={item.label}
                width={64}
                height={64}
                className="h-16 w-16 object-contain"
              />
              <h3 className={`text-xl font-semibold`}>{item.label}</h3>
            </a>
          ))}
        </motion.div>

        {/* Grouped skills */}
        <div className="flex flex-col gap-6 w-full max-w-2xl">
          {SKILL_GROUPS.map((group, i) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col gap-2"
            >
              <p className="text-primary text-sm font-semibold uppercase tracking-wider">
                {group.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 bg-background/10 rounded-full text-sm text-background/80 hover:bg-primary/20 hover:text-primary transition-colors duration-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}