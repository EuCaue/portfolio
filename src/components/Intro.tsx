"use client"
import { motion } from 'framer-motion';
import TypeWriterIntro from './TypeWriterIntro';

export default function Intro() {
  return (
    <motion.div
      className="max-w-md flex items-center justify-center flex-col"
      initial={{ opacity: 0, y: -80, x: -40 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 1 }}
    >
      <TypeWriterIntro />
      <p className="text-2xl py-6 leading-tight">
        I&apos;m a{' '}
        <span className="underline capitalize">full stack developer </span>
        with a passion for creating engaging and user-friendly websites and
        applications.
      </p>
      <a
        href="#about"
        title="Go to about"
        aria-label="Go to about section"
        className="btn btn-primary hover:scale-110 transition-all duration-200"
      >
        Get Started
      </a>
    </motion.div>
  );
}
