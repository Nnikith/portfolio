// src/components/Motion.tsx
"use client";

import { motion } from "framer-motion";

export const MotionDiv = motion.div;
export const MotionSection = motion.section;

export const fadeUp = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: "easeOut" },
};

export const stagger = {
  initial: {},
  animate: { transition: { staggerChildren: 0.08 } },
};

export const item = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
};
