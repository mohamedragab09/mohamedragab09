"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';

export const ScrollImage = () => {
  return (
    <Image 
      src="/images/Scroll.png" 
      alt="scroll icon"
      className="w-auto h-auto"
      width={10}
      height={10}
      sizes='20' 
    />
  )
};

export const LineImage = () => {
  return (
    <Image 
      src="/images/line.png"
      alt="line" 
      className="text-Aqua-Neon w-auto h-auto"
      width={100}
      height={20} 
    />
  )
};


export const PageHeader = ({ title, description }: {
  title: string;
  description: string;
}) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="hidden md:flex"
      >
        <ScrollImage />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="items-center gap-4 text-center flex flex-col justify-center"
      >
        <p className="text-primary text-3xl md:text-4xl uppercase">{ title }</p>
        <LineImage />
        <p className="text-secondary/70 text-sm">{ description }</p>
      </motion.div>
    </>
  )
}