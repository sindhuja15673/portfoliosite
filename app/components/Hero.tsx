// "use client";
// import { motion } from "framer-motion";

// export default function Hero() {
//   return (
//     <section className="px-6 sm:px-6 md:px-6 lg:px-6 px-6 py-16 md:py-10.5">
//       <motion.h1
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="
//           max-w-6xl
//           text-black
//           font-['Helvetica_Neue',Arial,sans-serif]
//           tracking-[-0.04em]
//           leading-[1.05]
//           text-[clamp(28px,5vw,46px)]
//         "
//       >
//         Frames of pure competition. Shot on iPhone.
//       </motion.h1>
//     </section>
//   );
// }


// Hero.tsx
"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";

export default function Hero() {
  const [images, setImages] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);

  const fetchImages = async () => {
    const { data, error } = await supabase
      .from("hero_images")
      .select("url")
      .order("position", { ascending: true });
    if (error) console.error(error);
    else setImages(data || []);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  if (images.length === 0)
    return <section className="h-screen flex items-center justify-center">No hero images yet.</section>;

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <AnimatePresence initial={false}>
        {images.map((img, idx) =>
          idx === current ? (
            <motion.img
              key={img.url}
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

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-white text-center text-[clamp(28px,6vw,64px)] font-bold drop-shadow-xl max-w-4xl px-4"
        >
          Frames of pure competition. Shot on iPhone.
        </motion.h1>
      </div>

      <div className="absolute bottom-8 w-full flex justify-center gap-3">
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