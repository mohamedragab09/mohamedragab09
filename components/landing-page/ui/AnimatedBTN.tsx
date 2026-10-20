"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function AnimatedBtn({ href, lable, icon }: {
    href: string, 
    lable: string,
    icon: ReactNode
}) {
    return (
        <motion.a
            href={href}
            onClick={(e) => {
                if (href?.startsWith("#")) {
                    e.preventDefault();

                    document
                        .querySelector(href)
                        ?.scrollIntoView({ behavior: "smooth" });
                }
            }}
            whileHover={{
                scale: 1.05,
                boxShadow: "0px 10px 30px rgba(18, 247, 214, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="text-2xl md:text-3xl text-secondary inline-flex ml-5 items-center gap-4 bg-primary/50 px-6 py-2 rounded-full cursor-pointer w-fit"
        >
            <span>{lable}</span>

            <span className="bg-primary/40 rounded-full p-2">
                {icon}
            </span>
        </motion.a>
    );
}
