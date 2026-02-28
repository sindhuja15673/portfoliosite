
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Masonry from "react-masonry-css";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

export default function Gallery() {
  const [images, setImages] = useState<string[]>([]);

  // Masonry breakpoints
  const breakpointColumnsObj = {
    default: 6,
    1100: 5,
    768: 3,
    500: 2,
  };

  // useEffect(() => {
  //   fetchImages();

  //   // Subscribe to real-time changes in the 'images' table
  //   const channel = supabase
  //     .channel("images")
  //     .on(
  //       "postgres_changes",
  //       { event: "*", schema: "public", table: "images" },
  //       () => fetchImages()
  //     )
  //     .subscribe();

  //   return () => supabase.removeChannel(channel);
  // }, []);
useEffect(() => {
  // Synchronous effect
  function load() {
    fetchImages().catch((err) => console.error(err));
  }
  load();

  const channel = supabase
    .channel("images")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "images" },
      () => {
        fetchImages().catch((err) =>
          console.error("Error fetching images from subscription:", err)
        );
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel); // Cleanup synchronous
  };
}, []);
  const fetchImages = async () => {
    const { data, error } = await supabase
      .from("images")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching images:", error);
      return;
    }

    if (data) {
      setImages(data.map((img: any) => img.url));
    }
  };

  return (
    <section id="gallery" className="px-6 pt-36 pb-6 ">
      {/* <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex gap-1 sm:gap-2 md:gap-3 lg:gap-4"
        columnClassName="space-y-1 sm:space-y-2 md:space-y-3 lg:space-y-4"
      > */}
      <Masonry
  breakpointCols={breakpointColumnsObj}
  className="my-masonry-grid w-full"
  columnClassName="my-masonry-grid_column"
>
        {/* {images.slice(0, 8).map((src, index) => ( */}
        {images.map((src, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: index * 0.05,
              ease: "easeOut",
            }}
            viewport={{ once: true, amount: 0.2 }}
            className="overflow-hidden"
          >
            <Image
              src={src}
              alt="gallery"
              width={600}
              height={800}
              className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
            />
          </motion.div>
        ))}
      </Masonry>
    </section>
  );
}