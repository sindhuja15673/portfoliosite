// "use client";
// import Masonry from "react-masonry-css";
// import Image from "next/image";
// import { motion } from "framer-motion";

// const images = [
//   "/img1.webp",
//   "/img2.webp",
//   "/img1.webp",
//   "/img2.webp",
//   "/img1.webp",
//    "/img1.webp",
//   "/img2.webp",
//   "/img1.webp",
//   "/img2.webp",
//   "/img1.webp",
//    "/img1.webp",
//   "/img2.webp",
//   "/img1.webp",
//   "/img2.webp",
//   "/img1.webp",
//    "/img1.webp",
//   "/img2.webp",
//   "/img1.webp",
//   "/img2.webp",
//   "/img1.webp",
//    "/img1.webp",
//   "/img2.webp",
//   "/img1.webp",
//   "/img2.webp",
//   "/img1.webp",
//    "/img1.webp",
//   "/img2.webp",
//   "/img1.webp",
//   "/img2.webp",
//   "/img1.webp",
//    "/img1.webp",
//   "/img2.webp",
//   "/img1.webp",
//   "/img2.webp",
//   "/img1.webp",
//    "/img1.webp",
//   "/img2.webp",
//   "/img1.webp",
//   "/img2.webp",
//   "/img1.webp",
//   // add 20
// ];

// const breakpointColumnsObj = {
//   default: 5,
//   1100: 4,
//   768: 2,
//   500: 1,
// };

// export default function Gallery() {
//   return (
//     <section className="px-10 pb-20">
//       <Masonry
//         breakpointCols={breakpointColumnsObj}
//         className="flex gap-6"
//         columnClassName="space-y-6"
//       >
//         {images.map((src, index) => (
//   <motion.div
//     key={index}
//     // initial={{ opacity: 0 }}
//     // whileInView={{ opacity: 1 }}
//     // transition={{ duration: 0.5, delay: index * 0.03 }}
//     // viewport={{ once: true }}
//     initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="text-5xl md:text-7xl font-semibold leading-tight max-w-4xl"
//   >
//     <Image
//       src={src}
//       alt="gallery"
//       width={600}
//       height={800}
//       className="w-full h-auto object-cover"
//     />
//   </motion.div>
// ))}
//         {/* {images.map((src, index) => (
//           <Image
//             key={index}
//             src={src}
//             alt="gallery"
//             width={600}
//             height={800}
//             className="w-full h-auto object-cover"
//           />
//         ))} */}
//       </Masonry>
//     </section>
//   );
// }
"use client";
import Masonry from "react-masonry-css";
import Image from "next/image";
import { motion } from "framer-motion";


const images = [
  "/img1.webp",
  "/img2.webp",
  "/img1.webp",
  "/img2.webp",
  "/img1.webp",
  "/img1.webp",
  "/img2.webp",
  "/img1.webp",
  "/img2.webp",
  "/img1.webp",
];

const breakpointColumnsObj = {
  default: 6,
  1100: 5,
  768: 3,
  500: 2,
};

export default function Gallery() {
  return (
    <section className="px-6 pt-6 pb-6">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        // className="flex gap-4" 
        // columnClassName="space-y-4"
        className="
      flex
      gap-1       /* mobile */
      sm:gap-2     /* small screens */
      md:gap-3     /* tablets */
      lg:gap-4     /* desktop */
    "
    columnClassName="
      space-y-1
      sm:space-y-2
      md:space-y-3
      lg:space-y-4
    "
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