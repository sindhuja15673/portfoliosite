

"use client";

import { useState } from "react";
import Image from "next/image";
import { Instagram, Mail, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsOpen(false);
  };

  const navItems = [
    { label: "Gallery", id: "gallery" },
    { label: "About", id: "about" },
    { label: "Pricing", id: "pricing" },
    { label: "Reviews", id: "reviews" },
    {label: "Contact", id: "contact"}
  ];

  return (
    <>
      {/* <header className="flex items-center justify-between px-4 md:px-8 py-4 md:py-6 fixed w-full bg-white z-50 shadow-sm"> */}
       <header className="flex items-center justify-between fixed w-full px-4 md:px-8 py-4 md:py-6 bg-white  z-50">
        
        {/* Logo */}
        <button onClick={() => scrollToSection("hero")}>
          <Image
            src="/logo1.webp"
            alt="Kamera Logo"
            width={120}
            height={37}
            className="w-[40px] md:w-[70px] h-auto"
            priority
          />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 text-sm uppercase tracking-wide">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="hover:text-green-600 transition"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Desktop Icons */}
        <div className="hidden md:flex gap-4">
          <a
            href="https://www.instagram.com/kampackk/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram size={20} />
          </a>

          <button onClick={() => scrollToSection("contact")}>
            <Mail size={20} />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden fixed top-[50px] left-0 w-full bg-white shadow-md py-6 space-y-6 text-center z-40">
        {/* // <div className="md:hidden bg-white px-6 py-4 shadow-md space-y-4 text-center"> */}
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="block w-full text-lg"
            >
              {item.label}
            </button>
          ))}

          <div className="flex justify-center gap-6 pt-4">
            <a
              href="https://www.instagram.com/kampackk/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram size={22} />
            </a>

            <button onClick={() => scrollToSection("contact")}>
              <Mail size={22} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
