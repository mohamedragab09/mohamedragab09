"use client";

import { Send } from 'lucide-react';
import { ChangeEvent, FormEvent, useState } from 'react';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { FloatingInput, FloatingTextarea } from './floatingarea';
import { contactSchema } from '../data';
import { submitForm } from '@/lib/services/contact';

const initialForm = { name: '', email: '', message: '' } ;

const SubmitForm = () => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = contactSchema.safeParse(form);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => issue.message);

      await Swal.fire({
        title: 'Invalid Form',
        text: errors.join('\n'),
        icon: 'warning',
        confirmButtonText: 'Ok',
      });

      return;
    }

    setLoading(true);

    try {
      await submitForm(result.data);

      await Swal.fire({
        title: 'Sent!',
        text: 'Message sent successfully!',
        icon: 'success',
        confirmButtonText: 'Ok',
      });

      setForm(initialForm);
    } catch (error) {
      console.error('Contact form submission failed:', error);

      await Swal.fire({
        title: 'Error',
        text: 'Something went wrong. Please try again.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    } finally {
      setLoading(false);
    }
  };


  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5 w-full max-w-lg mx-auto">
      <div className="flex flex-col md:flex-row gap-5">
        <FloatingInput
          name="name"
          value={form.name}
          onChange={handleChange}
          type='text'
          label="Your name"
          required
          delay={0}
        />
        <FloatingInput
          name="email"
          value={form.email}
          onChange={handleChange}
          type="email"
          label="Your email"
          required
          delay={0.1}
        />
      </div>

      <FloatingTextarea
        name="message"
        value={form.message}
        onChange={handleChange}
        label="Your message"
        required
        rows={5}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="flex justify-center pt-2"
      >
        <button
          type="submit"
          disabled={loading}
          className="
            w-full justify-center
            group relative overflow-hidden
            rounded-xl bg-primary/50 text-background
            py-3 px-8 flex items-center gap-2
            border border-border/10
            font-semibold text-sm cursor-pointer
            transition-all duration-300
            hover:shadow-[0_0_24px_rgba(0,255,255,0.3)] hover:scale-105
            disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-none
          "
        >
          <span>{loading ? 'Sending...' : 'Send Message'}</span>
          
          <Send
            size={15}
            className={`transition-transform duration-300 ${loading ? 'opacity-0' : 'group-hover:translate-x-1'}`}
          />
        </button>
      </motion.div>
    </form>
  );
};

export default SubmitForm;