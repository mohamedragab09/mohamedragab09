"use client";

import { motion } from "framer-motion";
import FloatingWrapper from "./floating-wrapper";
import ProjectCard from "./project-card";
import { Project } from "@/lib/types/projects";

type ProjectsProps = {
  projects: Project[];
};

export default function Projects({ projects }: ProjectsProps) {

  if (!Array.isArray(projects) || projects.length === 0) {
    return (
      <div className="w-full p-6 text-center text-red-500">
        No projects available.
      </div>
    );
  }

  return (
    <motion.div
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className="w-full min-w-0"
    >
      <div
        className="
          mx-auto grid w-full max-w-6xl min-w-0
          grid-cols-1 justify-items-center
          gap-6 sm:gap-8
          xl:grid-cols-2
        "
      >
        {projects.map((project) => (
          <div key={project.id} className="w-full min-w-0 max-w-xl">
            <FloatingWrapper>
              <ProjectCard project={project} />
            </FloatingWrapper>
          </div>
        ))}
      </div>
    </motion.div>
  );
}