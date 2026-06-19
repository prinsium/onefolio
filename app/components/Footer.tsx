"use client";

import React from "react";
import Link from "next/link";
import { social } from "../data/socialLinks";
import MatrixCanvas from "./MatrixCanvas";
import AnimatedLogo from "./AnimatedLogo";

const navLinks = [
  { title: "About", href: "#about" },
  { title: "Projects", href: "#projects" },
  { title: "Process", href: "#process" },
  { title: "Contact", href: "#contact" },
];

const visibleSocials = ["Youtube", "Instagram", "Twitter", "Dribbble", "GitHub", "Behance", "Framer", "Webflow"];

const Footer = () => {
  const filteredSocials = social.filter((item) => visibleSocials.includes(item.title));

  return (
    <footer className="w-full text-muted pt-2 flex flex-col justify-between relative overflow-hidden h-fit">
      
      {/* TOP ROW LAYOUT CONTAINER */}
      <div className="w-full flex flex-col md:flex-row justify-between items-start gap-8 md:gap-6 mb-12 z-10">
        
        {/* The Isolated GSAP Lottie Component */}
        <div className="w-full md:flex-1 flex items-center justify-center md:justify-start">
          <AnimatedLogo />
        </div>

        {/* Link Matrix Column Groups */}
        <div className="w-full md:w-auto flex gap-0 justify-between md:justify-start md:gap-24 pl-2 md:pl-0 self-start md:self-auto">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link key={link.title} href={link.href} className="text-base font-medium text-muted hover:opacity-80 transition-colors duration-200">
                {link.title}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            {filteredSocials.map((item) => (
              <a key={item.id} href={item.link} target="_blank" rel="noopener noreferrer" className="text-base font-medium text-muted hover:opacity-80 transition-colors duration-200">
                {item.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* MID ROW METADATA LINE CONTAINER */}
      <div className="relative w-full max-w-[1400px] mx-auto border-y border-dashed border-line py-4 text-base text-xs font-medium text-muted tracking-tight flex justify-between items-center">
        <div className="absolute top-0 left-0 w-2 h-2 border border-zinc-200 rotate-45 -translate-x-1/2 -translate-y-1/2 z-20 bg-primary" />
        <div className="absolute top-0 right-0 w-2 h-2 border border-zinc-200 rotate-45 translate-x-1/2 -translate-y-1/2 z-20 bg-primary" />
          <span>Copyrights @ PRINSIUM</span>
        <span className="font-mono">2026</span>
        <div className="absolute bottom-[-6px] left-0 w-2 h-2 border border-zinc-200 rotate-45 -translate-x-1/2 -translate-y-1/3 z-20 bg-primary" />
        <div className="absolute bottom-[-6px] right-0 w-2 h-2 border border-zinc-200 rotate-45 translate-x-1/2 -translate-y-1/2 z-20 bg-primary" />
        </div>

      {/* BOTTOM ROW VISUAL MATRIX GRAPHICS */}
      <div className="w-full h-[360px] relative z-0">
        <MatrixCanvas />
      </div>
      
    </footer>
  );
};

export default Footer;