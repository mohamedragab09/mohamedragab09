"use client";

import { useState } from "react";
import { motion } from 'framer-motion';

import type {
  ChangeEventHandler,
} from "react";

type FloatingInputProps = {
  name: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  type?: string;
  label: string;
  required?: boolean;
  delay?: number;
};

type FloatingTextareaProps = {
  name: string;
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  label: string;
  required?: boolean;
  rows?: number;
};
export const FloatingInput = ({ name, value, onChange, type, label, required, delay = 0 }: FloatingInputProps) => {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="relative flex-1"
    >
      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`
          peer w-full bg-white/5 border rounded-xl px-4 pt-6 pb-2
          text-white text-sm font-medium outline-none
          transition-all duration-300
          ${focused
            ? 'border-accent-cyan shadow-[0_0_0_3px_rgba(0,255,255,0.08)]'
            : 'border-white/10 hover:border-white/25'
          }
        `}
      />
      <label
        className={`
          absolute left-4 pointer-events-none font-medium
          transition-all duration-200
          ${isActive
            ? 'top-2 text-[11px] text-accent-cyan'
            : 'top-1/2 -translate-y-1/2 text-sm text-white/40'
          }
        `}
      >
        {label}
      </label>
    </motion.div>
  );
};

export const FloatingTextarea = ({ name, value, onChange, label, required, rows = 5 }: FloatingTextareaProps) => {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      viewport={{ once: true }}
      className="relative"
    >
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        rows={rows}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`
          w-full bg-white/5 border rounded-xl px-4 pt-6 pb-3
          text-white text-sm font-medium outline-none resize-none
          transition-all duration-300
          ${focused
            ? 'border-accent-cyan shadow-[0_0_0_3px_rgba(0,255,255,0.08)]'
            : 'border-white/10 hover:border-white/25'
          }
        `}
      />
      <label
        className={`
          absolute left-4 pointer-events-none font-medium
          transition-all duration-200
          ${isActive
            ? 'top-2 text-[11px] text-accent-cyan'
            : 'top-4 text-sm text-white/40'
          }
        `}
      >
        {label}
      </label>
    </motion.div>
  );
};