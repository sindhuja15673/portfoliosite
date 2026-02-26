
// "use client";
// import Masonry from "react-masonry-css";
// import Image from "next/image";
// import { motion } from "framer-motion";


// const images = [
//   "/img1.webp",
//   "/img2.webp",
//   "/img3.webp",
//   "/img4.webp",
//   "/img5.webp",
//   "/img6.webp",
//   "/img7.webp",
//   "/img1.webp",
//   "/img2.webp",
//   "/img1.webp",
//   "/img1.webp",
//   "/img2.webp",
//   "/img3.webp",
//   "/img4.webp",
//   "/img5.webp",
//   "/img6.webp",
//   "/img7.webp",
//   "/img1.webp",
//   "/img2.webp",
//   "/img1.webp",
//   "/img5.webp",
//   "/img6.webp",
//   "/img7.webp",
//   "/img1.webp",
// ];

// const breakpointColumnsObj = {
//   default: 6,
//   1100: 5,
//   768: 3,
//   500: 2,
// };

// export default function Gallery() {
//   return (
//     <section className="px-6 pt-6 pb-6">
//       <Masonry
//         breakpointCols={breakpointColumnsObj}
//         // className="flex gap-4" 
//         // columnClassName="space-y-4"
//         className="
//       flex
//       gap-1       /* mobile */
//       sm:gap-2     /* small screens */
//       md:gap-3     /* tablets */
//       lg:gap-4     /* desktop */
//     "
//     columnClassName="
//       space-y-1
//       sm:space-y-2
//       md:space-y-3
//       lg:space-y-4
//     "
//       >
//         {images.map((src, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, y: 60 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{
//               duration: 0.8,
//               delay: index * 0.05,
//               ease: "easeOut",
//             }}
//             viewport={{ once: true, amount: 0.2 }}
//             className="overflow-hidden"
//           >
//             <Image
//               src={src}
//               alt="gallery"
//               width={600}
//               height={800}
//               className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
//             />
//           </motion.div>
//         ))}
//       </Masonry>
//     </section>
//   );
// }

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
  // Immediately invoked async function
  (async () => {
    try {
      await fetchImages();
    } catch (err) {
      console.error("Error fetching images:", err);
    }
  })();

  const channel = supabase
    .channel("images")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "images" },
      async () => {
        try {
          await fetchImages();
        } catch (err) {
          console.error("Error fetching images from subscription:", err);
        }
      }
    )
    .subscribe();

  return () => supabase.removeChannel(channel);
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
    <section className="px-6 pt-6 pb-6">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex gap-1 sm:gap-2 md:gap-3 lg:gap-4"
        columnClassName="space-y-1 sm:space-y-2 md:space-y-3 lg:space-y-4"
      >
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