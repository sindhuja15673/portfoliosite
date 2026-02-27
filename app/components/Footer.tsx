// "use client";
// import { Instagram, Mail } from "lucide-react";
// export default function Footer() {
//   const scrollToContact = () => {
//     const contactSection = document.getElementById("contact");
//     if (contactSection) {
//       contactSection.scrollIntoView({ behavior: "smooth" });
//     }
//   };
//   return (
//     <footer className="flex justify-between px-6 py-14 text-sm">
//       <p style={{
//           color: "#000000",
//           fontSize: "25.366px",
//           fontFamily: '"Helvetica Neue", Arial, sans-serif',
//            letterSpacing: "-0.04em",
          
//         }}>©2026 by Kam Packiaraj</p>

//       {/* <div className="flex gap-4">
//         <Instagram size={20} />
//         <Mail size={20} />
//       </div> */}
//       <div className="flex gap-4">
//         <a
//           href="https://www.instagram.com/kampackk/"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Instagram size={20} />
//         </a>

//         <button onClick={scrollToContact}>
//           <Mail size={20} />
//         </button>
//       </div>
//     </footer>
//   );
// }
"use client";
import { Instagram, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();

  const goToContact = () => {
    // If already on /about, just scroll
    if (window.location.pathname === "/about") {
      const contactSection = document.getElementById("contact");
      if (contactSection) contactSection.scrollIntoView({ behavior: "smooth" });
    } else {
      // Navigate to /about first, then scroll after a small delay
      router.push("/about");
      setTimeout(() => {
        const contactSection = document.getElementById("contact");
        if (contactSection) contactSection.scrollIntoView({ behavior: "smooth" });
      }, 300); // 300ms delay to wait for page to render
    }
  };

  return (
    <footer className="flex justify-between px-6 py-14 text-sm items-center">
      <p
        style={{
          color: "#000000",
          fontSize: "25.366px",
          fontFamily: '"Helvetica Neue", Arial, sans-serif',
          letterSpacing: "-0.04em",
        }}
      >
        ©2026 by Kam Packiaraj
      </p>

      <div className="flex gap-4 items-center">
        <a
          href="https://www.instagram.com/kampackk/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Instagram size={20} />
        </a>

        <button
          onClick={goToContact}
          className="p-0 m-0 bg-transparent border-none cursor-pointer"
        >
          <Mail size={20} />
        </button>
      </div>
    </footer>
  );
}