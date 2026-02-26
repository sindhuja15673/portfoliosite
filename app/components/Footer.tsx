import { Instagram, Mail } from "lucide-react";
export default function Footer() {
  return (
    <footer className="flex justify-between px-6 py-14 text-sm">
      <p style={{
          color: "#000000",
          fontSize: "25.366px",
          fontFamily: '"Helvetica Neue", Arial, sans-serif',
           letterSpacing: "-0.04em",
          
        }}>©2026 by Kam Packiaraj</p>

      <div className="flex gap-4">
        <Instagram size={20} />
        <Mail size={20} />
      </div>
    </footer>
  );
}