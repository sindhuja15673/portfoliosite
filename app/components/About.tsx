




"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AboutPage() {
  
  return (
    <>


      {/* About Section */}
      <section id="about" 
      className="px-6  pt-30 py-[6.6vmax]">
         <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
          About Us
        </h2>
        <div className="">
          <p
            className="
              font-['Helvetica_Neue',Arial,sans-serif]
              font-normal
              tracking-[-0.04em]
              leading-[1.2]
              text-[clamp(30px,4.5vw,56px)]
              mb-10 
              text-center
            "
          >
            I'm a 16 year old sports photographer capturing emotional game
            moments. I make athletes and teams look their best. Available for
            games and tournaments.
          </p>

          <p
            className="
            
              font-['Helvetica_Neue',Arial,sans-serif]
              leading-[1.3]
              text-[clamp(16px,1.1vw,18px)]
              text-center
            "
          >
            I'm also a designer, artist, and fashion designer. I started my own
            sportswear brand, Vaulted.
          </p>
        </div>
      </section>

      
    </>
  );
}