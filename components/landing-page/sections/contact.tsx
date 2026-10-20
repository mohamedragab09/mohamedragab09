'use client';

import { motion } from 'framer-motion';
import { PageHeader } from '../ui/section-images';
import SubmitForm from '../ui/contact-form';

export default function Contact() {
  return (
    <section
      id="contact"
      className="w-full overflow-x-clip px-4 py-12 text-background sm:px-6 md:py-16 lg:px-8"
    >
      <div className="relative z-10 mx-auto flex w-full max-w-7xl min-w-0 flex-col items-center justify-center gap-8">
        <PageHeader title="Contact" description="I&#39;m currently available for freelance work" />

        {/* Contact Heading */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-full"
        >
          <h3 className="rounded-tl-4xl rounded-br-4xl border-4 border-primary px-4 py-2 text-center text-lg text-accent-cyan sm:px-6 sm:text-xl md:text-2xl">
            Send Me A Message
          </h3>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-full min-w-0 max-w-2xl"
        >
          <SubmitForm />
        </motion.div>
      </div>
    </section>
  );
}