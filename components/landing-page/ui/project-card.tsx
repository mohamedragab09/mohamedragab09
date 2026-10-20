"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Project } from "@/lib/types/projects";


type ProjectProp = {
  project: Project;
}

export default function ProjectCard({ project }: ProjectProp) {
  return (
    <article className="flex w-full min-w-0 flex-col gap-4 overflow-hidden rounded-2xl border border-white/10 bg-dark-surface/60 p-4 backdrop-blur-sm sm:p-5">

      {/* Image */}
      <div className="relative h-44 w-full overflow-hidden rounded-xl bg-dark-surface sm:h-48">
        {project.image_url ? (
          <Image
            src={project.image_url}
            alt={`${project.title} preview`}
            fill
            sizes="(max-width: 639px) 100vw, (max-width: 1279px) 80vw, 560px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-secondary/50">
            No image available
          </div>
        )}
      </div>

      {/* Title */}
      <h2 className="wrap-break-words text-lg font-bold text-primary sm:text-xl">
        {project.title}
      </h2>

      {/* Description */}
      <p className="wrap-break-words text-sm leading-relaxed text-secondary/60">
        {project.description}
      </p>

      {/* Technologies */}
      <div className="flex min-w-0 flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <span 
            key={tech}
            className="bg-primary rounded-full py-0.5 px-2 text-secondary-surface text-sm hover:opacity-80 transition-opacity"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-border/10 pt-3">
        <Link
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-opacity hover:opacity-80"
        >
          <ExternalLink size={14} />
          Live Demo
        </Link>

        {project.github && (
          <Link
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-semibold text-accent transition-opacity hover:opacity-80"
          >
            <FaGithub size={14} />
            GitHub
          </Link>
        )}
      </div>

    </article>
  );
}