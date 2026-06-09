// "use client";

// import React, { useEffect, useRef } from "react";
// import Link from "next/link";
// import { social } from "../data/socialLinks"; // Adjust your path
// import Image from "next/image";

// const navLinks = [
//   { title: "About", href: "#about" },
//   { title: "Projects", href: "#projects" },
//   { title: "Process", href: "#process" },
//   { title: "Contact", href: "#contact" },
// ];

// // List of visible socials from your design mockup
// const visibleSocials = ["Youtube", "Instagram", "Twitter", "Dribbble", "GitHub", "Behance", "Framer", "Webflow"];

// const Footer = () => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const mouseRef = useRef({ x: -1000, y: -1000 });

//   // Map your imported social array data to match the layout mockup order
//   const filteredSocials = social.filter((item) => visibleSocials.includes(item.title));

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     let animationFrameId: number;
//     const dpr = window.devicePixelRatio || 1;

//     // Grid Setup Parameters
//     const dotRadius = 11; // Size of the circles matching your mockup
//     const gap = 34;       // Spacing between circles

//     let cols = 0;
//     let rows = 0;

//     const resizeCanvas = () => {
//       const rect = canvas.getBoundingClientRect();
//       canvas.width = rect.width * dpr;
//       canvas.height = rect.height * dpr;
//       ctx.resetTransform();
//       ctx.scale(dpr, dpr);

//       cols = Math.floor(rect.width / gap);
//       rows = Math.floor(rect.height / gap);
//     };

//     resizeCanvas();

//     const drawMatrix = () => {
//       const rect = canvas.getBoundingClientRect();
//       ctx.clearRect(0, 0, rect.width, rect.height);

//       // Center the grid system slightly within the canvas space
//       const offsetX = (rect.width - (cols - 1) * gap) / 2;
//       const offsetY = (rect.height - (rows - 1) * gap) / 2;

//       for (let r = 0; r < rows; r++) {
//         for (let c = 0; c < cols; c++) {
//           const x = offsetX + c * gap;
//           const y = offsetY + r * gap;

//           // Calculate distance between this specific circle and user mouse position
//           const dx = mouseRef.current.x - x;
//           const dy = mouseRef.current.y - y;
//           const distance = Math.sqrt(dx * dx + dy * dy);

//           // Proximity interaction curve logic
//           const maxInfluence = 160;
//           let scaleFactor = 1;

//           if (distance < maxInfluence) {
//             // Circles gently shrink or change visual weight when cursor approaches
//             const progress = (maxInfluence - distance) / maxInfluence;
//             scaleFactor = 1 - progress * 0.4;
//           }

//           ctx.beginPath();
//           ctx.arc(x, y, dotRadius * scaleFactor, 0, Math.PI * 2);
//           // Light gray shade directly corresponding to your footer mockup
//           ctx.fillStyle = distance < maxInfluence ? "#cccccc" : "#e5e5e5";
//           ctx.fill();
//         }
//       }

//       animationFrameId = requestAnimationFrame(drawMatrix);
//     };

//     drawMatrix();

//     // Track local mouse coordinates inside container space
//     const handleMouseMove = (e: MouseEvent) => {
//       const rect = canvas.getBoundingClientRect();
//       mouseRef.current.x = e.clientX - rect.left;
//       mouseRef.current.y = e.clientY - rect.top;
//     };

//     const handleMouseLeave = () => {
//       mouseRef.current.x = -1000;
//       mouseRef.current.y = -1000;
//     };

//     const container = containerRef.current;
//     if (container) {
//       container.addEventListener("mousemove", handleMouseMove);
//       container.addEventListener("mouseleave", handleMouseLeave);
//     }
//     window.addEventListener("resize", resizeCanvas);

//     return () => {
//       cancelAnimationFrame(animationFrameId);
//       if (container) {
//         container.removeEventListener("mousemove", handleMouseMove);
//         container.removeEventListener("mouseleave", handleMouseLeave);
//       }
//       window.removeEventListener("resize", resizeCanvas);
//     };
//   }, []);

//   return (
//     <footer
//       ref={containerRef}
//       className="w-full bg-white text-black py-2 flex flex-col justify-between selection:bg-black selection:text-white select-none relative overflow-hidden"
//     >
//       {/* TOP ROW LAYOUT CONTAINER */}
//       <div className="w-full flex flex-col md:flex-row justify-between items-start gap-12 md:gap-6 mb-12 z-10">

//         {/* Massive Dynamic Identity Text Logo */}
//         {/* <div className="footerTitle w-full md:w-auto text-[28vw] md:text-[11vw] font-black tracking-tighter leading-[0.8] uppercase text-center md:text-left block">
//     PRINSIUM
//   </div> */}

//         <div className="w-full md:w-auto flex items-center justify-center md:justify-start">
//           <Image
//             src="/PRINSIUM.svg"
//             alt="PRINSIUM Logo"
//             width={1000}
//             height={1000}
//           />
//         </div>

//         {/* Link Matrix Column Groups */}
//         <div className="w-full md:w-auto flex gap-0 justify-between md:justify-start md:gap-24 MD pl-2 md:pl-0 self-start md:self-auto">
//           {/* Column 1: Core Content Navigation */}
//           <div className="flex flex-col gap-2">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.title}
//                 href={link.href}
//                 className="text-base font-medium text-zinc-900 hover:text-zinc-500 transition-colors duration-200"
//               >
//                 {link.title}
//               </Link>
//             ))}
//           </div>

//           {/* Column 2: Extracted Social Networks */}
//           <div className="flex flex-col gap-2">
//             {filteredSocials.map((item) => (
//               <a
//                 key={item.id}
//                 href={item.link}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-base font-medium text-zinc-900 hover:text-zinc-500 transition-colors duration-200"
//               >
//                 {item.title}
//               </a>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* MID ROW METADATA LINE CONTAINER */}
//       {/* <div className="w-full flex justify-between items-center border-y border-x-0 border-dashed border-zinc-200 py-4 z-10 text-xs font-medium text-zinc-900 tracking-tight">
//         <span>Copyrights @ PRINSIUM</span>
//         <span className="font-mono">2026</span>
//       </div> */}

//       <div className="relative w-full max-w-[1400px] mx-auto border-x border-dashed border-zinc-200 py-4 z-10 text-xs font-medium text-zinc-900 tracking-tight flex justify-between items-center">

//         {/* Optional: If you want the nodes to continue into the footer using the footer's theme,
//             you can add them here manually with updated border colors!
//           */}
//         <div className="absolute top-0 left-0 w-2 h-2 border border-zinc-200 rotate-45 -translate-x-1/2 -translate-y-1/2 z-20" />
//         <div className="absolute top-0 right-0 w-2 h-2 border border-zinc-200 rotate-45 translate-x-1/2 -translate-y-1/2 z-20" />

//         <span>Copyrights @ PRINSIUM</span>
//         <span className="font-mono">2026</span>

//         <div className="absolute bottom-0 left-0 w-2 h-2 border border-zinc-200 rotate-45 -translate-x-1/2 -translate-y-1/2 z-20" />
//         <div className="absolute bottom-0 right-0 w-2 h-2 border border-zinc-200 rotate-45 translate-x-1/2 -translate-y-1/2 z-20" />
//       </div>

//       {/* BOTTOM ROW VISUAL MATRIX GRAPHICS */}
//       <div className="w-full h-[320px] mt-4 relative">
//         <canvas
//           ref={canvasRef}
//           className="w-full h-full block pointer-events-none"
//         />
//       </div>
//     </footer>
//   );
// };

// export default Footer;


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
    <footer className="w-full bg-white text-black py-2 flex flex-col justify-between selection:bg-black selection:text-white select-none relative overflow-hidden h-fit">
      
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
              <Link key={link.title} href={link.href} className="text-base font-medium text-zinc-900 hover:text-zinc-500 transition-colors duration-200">
                {link.title}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            {filteredSocials.map((item) => (
              <a key={item.id} href={item.link} target="_blank" rel="noopener noreferrer" className="text-base font-medium text-zinc-900 hover:text-zinc-500 transition-colors duration-200">
                {item.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* MID ROW METADATA LINE CONTAINER */}
      <div className="relative w-full max-w-[1400px] mx-auto border-y border-dashed border-zinc-200 py-4 text-xs font-medium text-zinc-900 tracking-tight flex justify-between items-center bg-white">
        <div className="absolute top-0 left-0 w-2 h-2 border border-zinc-200 rotate-45 -translate-x-1/2 -translate-y-1/2 z-20 bg-white" />
        <div className="absolute top-0 right-0 w-2 h-2 border border-zinc-200 rotate-45 translate-x-1/2 -translate-y-1/2 z-20 bg-white" />
          <span>Copyrights @ PRINSIUM</span>
        <span className="font-mono">2026</span>
        <div className="absolute bottom-[-6px] left-0 w-2 h-2 border border-zinc-200 rotate-45 -translate-x-1/2 -translate-y-1/3 z-20 bg-white" />
        <div className="absolute bottom-[-6px] right-0 w-2 h-2 border border-zinc-200 rotate-45 translate-x-1/2 -translate-y-1/2 z-20 bg-white" />
        </div>

      {/* BOTTOM ROW VISUAL MATRIX GRAPHICS */}
      <div className="w-full h-[320px] mt-4 relative z-0">
        <MatrixCanvas />
      </div>
      
    </footer>
  );
};

export default Footer;