'use client';
import { Download } from 'lucide-react';
import { motion } from "framer-motion";


const DownloadCV = () => {
  const handleDownloadBtn = () => {
    const link = document.createElement('a');
    link.href = '/files/Mohamed-Rajab.pdf';
    link.download = 'Mohamed Rajab.pdf';
    link.click();
  };

  return (
    <motion.button
      type="button"
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 10px 30px rgba(18, 247, 214, 0.3)",
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={handleDownloadBtn}
      className="text-accent-cyan inline-flex items-center border border-accent-cyan gap-2 bg-white-bg/50 px-6 py-2 rounded-full cursor-pointer w-fit"
    >
      Download CV
      <span><Download size={18} /></span>
    </motion.button>
  );
};

export default DownloadCV;

