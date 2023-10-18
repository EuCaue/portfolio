"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import TypeWriterIntro from "./TypeWriterIntro";

export default function Intro() {
  const words = ["User", "World", "Person"];
  return (
    <motion.div
      className="max-w-md flex items-center justify-center flex-col"
      initial={{ opacity: 0, y: -80, x: -40 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 1 }}
    >
      <TypeWriterIntro words={words} />
      <p className="text-2xl py-6 leading-tight">
        I&apos;m a{" "}
        <span className="underline capitalize">full stack developer </span>
        with a passion for creating engaging and user-friendly websites and
        applications.
      </p>
      <motion.a
        initial={{ y: 5 }}
        animate={{ y: 40 }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "loop",
          delay: 0.8,
        }}
        href="#about"
        title="Go to about"
        aria-label="Go to about section"
        className="btn btn-primary hover:scale-110 transition-all duration-200"
      >
        Get Started
      </motion.a>
    </motion.div>
  );
}
