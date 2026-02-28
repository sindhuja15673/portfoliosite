
"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
// import { useRouter } from "next/navigation";

export default function Hero() {
  const [images, setImages] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);
const currentSlide = images[current];
// const router = useRouter();
const [banner, setBanner] = useState("");

const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

const fetchBanner = async () => {
  const { data, error } = await supabase
    .from("banners")
    .select("text")
    .order("created_at", { ascending: false })
    .limit(1); // get latest banner
  if (error) console.error(error);
  else if (data && data.length) setBanner(data[0].text);
};

useEffect(() => {
  fetchBanner();
}, []);
  /** -------------------
   * FETCH HERO IMAGES
   * ------------------- */
  const fetchImages = async () => {
    const { data, error } = await supabase
      .from("hero_images")
      .select("*")
      .order("position", { ascending: true });
    if (error) console.error(error);
    else setImages(data || []);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  /** -------------------
   * AUTO ROTATE HERO IMAGES
   * ------------------- */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (images.length ? (prev + 1) % images.length : 0));
    }, 5000); // rotate every 5s
    return () => clearInterval(interval);
  }, [images.length]);

  if (images.length === 0)
    return (
      <section className="h-screen flex items-center justify-center">
        No hero images yet.
      </section>
    );

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden top-30">
      {/* ------------------- HERO IMAGES ------------------- */}
      <AnimatePresence initial={false}>
        {images.map((img, idx) =>
          idx === current ? (
            <motion.img
              key={img.id}
              src={img.url}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          ) : null
        )}
      </AnimatePresence>

      {/* ------------------- CURRENT COVERAGE BANNER ------------------- */}
    

      <div className="absolute top-0 w-full bg-yellow-400 overflow-hidden z-10">
  <div className="flex animate-marquee text-black font-bold py-2">
    <span className="mx-8">🎾 {banner || "No banner set"}</span>
    {/* <span className="mx-8">🎾 {banner}</span> */}
  </div>
</div>

      {/* ------------------- HERO TEXT & CTA ------------------- */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-white text-[clamp(28px,6vw,64px)] font-bold drop-shadow-xl max-w-4xl"
        >
          {/* Frames of pure competition. Shot on iPhone. */}
          {currentSlide.headline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-white text-lg md:text-2xl drop-shadow-md mt-4 max-w-2xl"
        >
          {/* High School Tennis Photography – Professional Game-Day Coverage */}
          {currentSlide.subtext}
        </motion.p>

        <motion.button
        // onClick={() => router.push("/about#contact")}
        onClick={() => scrollToSection("contact")}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded shadow-lg"
        >
          {/* {currentSlide.cta_text} */}
          Reserve Coverage
        </motion.button>
        
      </div>

      {/* ------------------- NAVIGATION DOTS ------------------- */}
      <div className="absolute bottom-8 w-full flex justify-center gap-3 z-10">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              idx === current ? "bg-white w-6" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
