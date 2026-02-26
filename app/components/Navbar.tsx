// "use client";
// import Link from "next/link";
// import { Instagram, Mail } from "lucide-react";
// import Image from "next/image";
// export default function Navbar() {
//   return (
//     <header className="flex items-center justify-between px-5.5 py-7">
      
//       {/* Left */}
//       <Link href="/about" className="text-sm tracking-wide uppercase" style={{
//           color: "#000000",
//           fontSize: "17.338px",
//           fontFamily: '"Helvetica Neue", Arial, sans-serif',
          
//         }}>
//         About
//       </Link>

//       {/* Center Logo */}
//       <Link href="/about" className="flex items-center gap-2" 
//         >        <Image
//           src="/kam.webp"   // put your logo inside public folder
//           alt="Kamera Logo"
//           width={120}
//           height={37}
//         />

//       </Link>
//       {/* <h1 className="text-2xl font-semibold tracking-wide">
//         Kamera
//       </h1> */}

//       {/* Right Icons */}
//       {/* <div className="flex gap-4">
//         <Instagram size={20} />
//         <Mail size={20} />
//       </div> */}
//       <div className="flex gap-4">
        
//         {/* Instagram Link */}
//         <a
//           href="https://www.instagram.com/kampackk/"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="cursor-pointer hover:opacity-70 transition"
//         >
//           <Instagram size={20} />
//         </a>

//         {/* Mail Link */}
//         <a
//           href="mailto:yourmail@gmail.com"
//           className="cursor-pointer hover:opacity-70 transition"
//         >
//           <Mail size={20} />
//         </a>

//       </div>
//     </header>
//   );
// }
"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Instagram, Mail, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Top Navbar */}
      <header className="flex items-center justify-between px-4 md:px-8 py-4 md:py-6 relative z-50">

        {/* Left - Desktop About */}
        <Link
          href="/about"
          className="hidden md:block text-sm tracking-wide uppercase"
        >
          About
        </Link>


        {/* Center Logo */}
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

        

        

        {/* Right Icons - Desktop Only */}
        <div className="hidden md:flex gap-4">
          <a
            href="https://www.instagram.com/kampackk/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram size={20} />
          </a>

          <a href="mailto:ssindhujak69@gmail.com">
            <Mail size={20} />
          </a>
        </div>
{/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        {/* Empty div to balance grid on mobile */}
        {/* <div className="md:hidden w-6"></div> */}
      </header>

      {/* Mobile Dropdown Menu */}
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

            <a href="mailto:ssindhujak69@gmail.com">
              <Mail size={22} />
            </a>
          </div>
        </div>
      )}
    </>
  );
}