"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="px-6 sm:px-6 md:px-6 lg:px-6 px-6 py-16 md:py-10.5">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="
          max-w-6xl
          text-black
          font-['Helvetica_Neue',Arial,sans-serif]
          tracking-[-0.04em]
          leading-[1.05]
          text-[clamp(28px,5vw,46px)]
        "
      >
        Frames of pure competition. Shot on iPhone.
      </motion.h1>
    </section>
  );
}