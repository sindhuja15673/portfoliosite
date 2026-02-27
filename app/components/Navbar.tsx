
// "use client";
// import { useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { Instagram, Mail, Menu, X } from "lucide-react";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
// // Scroll to contact section
//   const scrollToContact = () => {
//     const contactSection = document.getElementById("contact");
//     if (contactSection) {
//       contactSection.scrollIntoView({ behavior: "smooth" });
//       setIsOpen(false); // close mobile menu if open
//     }
//   };
//   return (
//     <>
//       {/* Top Navbar */}
//       <header className="flex items-center justify-between px-4 md:px-8 py-4 md:py-6 relative z-50">

//         {/* Left - Desktop About */}
//         <Link
//           href="/about"
//           className="hidden md:block text-sm tracking-wide uppercase"
//         >
//           About
//         </Link>


//         {/* Center Logo */}
//         <Link href="/" className="flex justify-center">
//           <Image
//             src="/kam.webp"
//             alt="Kamera Logo"
//             width={120}
//             height={37}
//             className="w-[90px] md:w-[120px] h-auto"
//             priority
//           />
//         </Link>

        

        

//         {/* Right Icons - Desktop Only */}
//         <div className="hidden md:flex gap-4">
//           <a
//             href="https://www.instagram.com/kampackk/"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Instagram size={20} />
//           </a>

//           <a href="mailto:ssindhujak69@gmail.com">
//             <Mail size={20} />
//           </a>
//         </div>
// {/* Mobile Menu Button */}
//         <button
//           className="md:hidden"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           {isOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>
//         {/* Empty div to balance grid on mobile */}
//         {/* <div className="md:hidden w-6"></div> */}
//       </header>

//       {/* Mobile Dropdown Menu */}
//       {isOpen && (
//         <div className="md:hidden bg-white px-6 py-4 shadow-md space-y-4 text-center">
//           <Link href="/about" onClick={() => setIsOpen(false)}>
//             About
//           </Link>

//           <div className="flex justify-center gap-6 pt-2">
//             <a
//               href="https://www.instagram.com/kampackk/"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <Instagram size={22} />
//             </a>

//              <Link href="/about#contact" onClick={() => setIsOpen(false)}>
//               <Mail size={22} />
//             </Link>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Instagram, Mail, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const scrollToContact = () => {
    const navigateAndScroll = () => {
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false); // close mobile menu
    };

    if (window.location.pathname === "/about") {
      // Already on about page, just scroll
      navigateAndScroll();
    } else {
      // Navigate to about page first
      router.push("/about");
      // Wait for page to load before scrolling
      setTimeout(navigateAndScroll, 300); // 300ms delay
    }
  };

  return (
    <>
      <header className="flex items-center justify-between px-4 md:px-8 py-4 md:py-6 relative z-50">
        <Link href="/about" className="hidden md:block text-sm tracking-wide uppercase">
          About
        </Link>

        <Link href="/" className="flex justify-center">
          <Image
            src="/kam.webp"
            alt="Kamera Logo"
            width={120}
            height={37}
            className="w-[90px] md:w-[120px] h-auto"
            priority
          />
        </Link>

        <div className="hidden md:flex gap-4">
          <a
            href="https://www.instagram.com/kampackk/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram size={20} />
          </a>

          <button onClick={scrollToContact}>
            <Mail size={20} />
          </button>
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {isOpen && (
        <div className="md:hidden bg-white px-6 py-4 shadow-md space-y-4 text-center">
          <Link href="/about" onClick={() => setIsOpen(false)}>
            About
          </Link>

          <div className="flex justify-center gap-6 pt-2">
            <a
              href="https://www.instagram.com/kampackk/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram size={22} />
            </a>

            <button onClick={scrollToContact}>
              <Mail size={22} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}