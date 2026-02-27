// "use client";

// import { motion, AnimatePresence } from "framer-motion";
// import { useState, useEffect } from "react";

// const reviews = [
//   {
//     quote:
//       "Captured my son’s best serve of the season. Amazing quality.",
//     author: "Local Parent",
//   },
//   {
//     quote:
//       "Professional, fast delivery, and incredible action shots.",
//     author: "Varsity Tennis Parent",
//   },
//   {
//     quote:
//       "The photos looked like something from a sports magazine.",
//     author: "High School Athlete",
//   },
// ];

// export default function TrustSignals() {
//   const [index, setIndex] = useState(0);

//   // Auto-rotate reviews every 4 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex((prev) => (prev + 1) % reviews.length);
//     }, 4000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section className="py-24 px-6 bg-gray-50">
//       <div className="max-w-5xl mx-auto text-center">

//         <motion.h2
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="text-3xl md:text-4xl font-bold mb-16"
//         >
//           Professional Game-Day Coverage You Can Trust
//         </motion.h2>

//         {/* Trust Points */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ delay: 0.2 }}
//           viewport={{ once: true }}
//           className="grid md:grid-cols-4 gap-8 text-left mb-20"
//         >
//           <div>✔ Shot on professional mirrorless equipment</div>
//           <div>✔ Fast shutter sports capture</div>
//           <div>✔ Secure private digital delivery</div>
//           <div>✔ Serving Forsyth County High School Tennis</div>
//         </motion.div>

//         {/* Review Carousel */}
//         <div className="relative h-32 flex items-center justify-center">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, x: 40 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -40 }}
//               transition={{ duration: 0.5 }}
//               className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto"
//             >
//               <p className="italic text-gray-700 mb-4">
//                 “{reviews[index].quote}”
//               </p>
//               <p className="text-sm font-semibold text-gray-500">
//                 — {reviews[index].author}
//               </p>
//             </motion.div>
//           </AnimatePresence>
//         </div>

//       </div>
//     </section>
//   );
// }

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import ReviewForm from "./ReviewForm";
import { MessageCircle } from "lucide-react";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function TrustSignals() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [index, setIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("approved", true)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setReviews(data);
    }
  };

  useEffect(() => {
    if (reviews.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [reviews]);

  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto text-center">

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-16"
        >
          Professional Game-Day Coverage You Can Trust
        </motion.h2>

        {/* Trust Points */}
        <div className="grid md:grid-cols-4 gap-8 text-left mb-20">
          <div>✔ Shot on professional mirrorless equipment</div>
          <div>✔ Fast shutter sports capture</div>
          <div>✔ Secure private digital delivery</div>
          <div>✔ Serving Forsyth County High School Tennis</div>
        </div>

        {/* Review Carousel */}
        {reviews.length > 0 && (
          <div className="relative h-32 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={reviews[index].id}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto"
              >
                <p className="italic text-gray-700 mb-4">
                  “{reviews[index].quote}”
                </p>
                <p className="text-sm font-semibold text-gray-500">
                  — {reviews[index].author}
                </p>
              </motion.div>
            </AnimatePresence>
          

          </div>
        )}
  <div className="mt-10 text-center">
  <button
    onClick={() => setShowForm(!showForm)}
    className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black transition"
  >
    <MessageCircle size={16} />
    Leave a Review
  </button>
</div>
<AnimatePresence>
  {showForm && (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.4 }}
      className="overflow-hidden"
    >
      <ReviewForm />
    </motion.div>
  )}
</AnimatePresence>
      </div>
    </section>
  );
}