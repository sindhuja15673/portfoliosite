"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Pricing() {
    const router = useRouter();

    const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  return (
    <section id="pricing" className="py-20 px-6 pt-30 bg-white text-center">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Match Day Coverage Package
        </h2>

        <p className="text-xl text-gray-600 mb-10">
          $20 – 25 High-Resolution Digital Images
        </p>

        <div className="bg-gray-50 rounded-2xl shadow-lg p-10 text-left space-y-4">
          <p>✔ Professional action shots</p>
          <p>✔ Edited & color-corrected</p>
          <p>✔ Delivered within 48 hours</p>
          <p>✔ Private download link</p>
          <p>✔ No watermark after purchase</p>
        </div>
        <motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ delay: 0.3 }}
  viewport={{ once: true }}
  className="mt-12 bg-green-50 border border-green-200 rounded-xl p-6"
>
  <p className="text-lg font-semibold text-green-700">
    Photos delivered within 48 hours.
  </p>
  <p className="text-sm text-green-600 mt-2">
    Fast turnaround so families can share game-day moments immediately.
  </p>
</motion.div>

<button
  // onClick={() => router.push("/about#contact")}
  onClick={scrollToContact}
  className="mt-10 bg-green-600 hover:bg-green-700 text-white font-semibold px-10 py-4 rounded-lg text-lg transition"
>
  Book Now
</button>
        {/* <button
          onClick={() => {
            document
              .getElementById("contact")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="mt-10 bg-green-600 hover:bg-green-700 text-white font-semibold px-10 py-4 rounded-lg text-lg transition"
        >
          Book Now
        </button> */}
      </motion.div>
    </section>
  );
}
