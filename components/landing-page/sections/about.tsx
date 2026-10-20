
'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { PageHeader } from "../ui/section-images";

export default function About() {
  return (
    <section
      id="about"
      className="w-full px-4 py-12 text-secondary sm:px-6 md:py-16 lg:px-8"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-8">

        <PageHeader title="About" description="Descovre more about me" />

        {/* Main content */}
        <div className="flex w-full flex-col items-center justify-center gap-8 xl:flex-row xl:items-start xl:gap-12">

          {/* About text */}
          <div className="flex w-full max-w-xl min-w-0 flex-col gap-6">

            <motion.h2
              initial={{ opacity: 0, y: -40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="w-fit rounded-tl-4xl rounded-br-4xl border-4 border-primary bg-foreground/50 px-6 py-2 text-xl sm:text-2xl md:text-3xl"
            >
              About me
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="rounded-3xl bg-foreground/70 p-4 sm:p-6 md:rounded-4xl"
            >
              <span className="text-primary">{`<p>`}</span>

              <p className="pl-2 text-xl font-semibold text-primary sm:text-2xl">
                Hello!
              </p>

              <p className="my-3 pl-2 text-sm leading-7 text-secondary/80 sm:text-base md:text-lg">
                I&#39;m Mohamed, a Full-Stack Web Developer based in Egypt 🇪🇬,
                passionate about building modern, responsive, and
                user-friendly web applications.

                <br />
                <br />

                I use
                <span className="text-primary"> React</span>,
                <span className="text-primary"> Next.js</span>, and
                <span className="text-primary"> TypeScript </span>  
                to build interactive user interfaces, and
                <span className="text-primary"> Node.js </span>and
                <span className="text-primary"> Express.js </span> 
                to develop backend services and APIs, with
                <span className="text-primary"> PostgreSQL </span> 
                for relational data management.

                <br />
                <br />

                I enjoy solving problems, writing clean and maintainable code,
                and turning ideas into complete web applications, from
                intuitive interfaces to reliable backend functionality.
              </p>

              <span className="text-primary">{`</p>`}</span>
            </motion.div>

          </div>

          {/* Profile image */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative w-full max-w-sm shrink-0 overflow-hidden rounded-3xl sm:max-w-md xl:w-95 xl:max-w-none"
          >
            <Image
              src="/images/mohamed.JPG"
              alt="Mohamed Ahmed, Full-Stack Web Developer"
              className="h-auto w-full object-cover"
              width={1000}
              height={1000}
              sizes="(max-width: 639px) 100vw, (max-width: 1279px) 448px, 380px"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
