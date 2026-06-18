"use client";

import React from "react";
import Image from "next/image";

// ==========================================================================
// TYPESCRIPT INTERFACES
// ==========================================================================
interface ServiceCardProps {
  title: string;
  iconPath: string;
  bullets: string[];
}

// ==========================================================================
// REUSABLE SERVICE CARD COMPONENT
// ==========================================================================
const ServiceCard = ({ title, iconPath, bullets }: ServiceCardProps) => {
  return (
    <div className="relative w-full mx-auto max-w-[400px] aspect-[3/4] rounded-[32px] bg-[#2a2a2a] overflow-hidden flex flex-col p-6 md:p-8 group cursor-pointer border border-white/10 hover:border-white/20 transition-all duration-500 shadow-2xl">
      
      {/* 1. NOISE OVERLAY */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-25 mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* 2. CIRCULAR BLUR GLOW (Figma Layer Blur Equivalent) */}
      {/* Anchored bottom-center. Scales slightly and brightens on hover. */}
      <div className="absolute -bottom-[10%] left-[90%] -translate-x-1/2 w-[250px] aspect-square rounded-full bg-[#456dff] z-0 pointer-events-none blur-[120px] opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out"></div>

      {/* =========================================
          TOP SECTION: Icon & Bullets (z-10)
      ========================================= */}
      <div className="relative z-10 flex flex-col flex-1">
        
        {/* Circular Icon Container */}
        <div className="w-[100px] h-[100px] rounded-full bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center mb-8 shadow-[inset_0_2px_10px_rgba(255,255,255,0.1)] backdrop-blur-sm transition-transform duration-500 group-hover:-translate-y-1">
          <div className="relative w-[36px] h-[36px]">
            <Image 
              src={iconPath} 
              alt={`${title} icon`} 
              fill 
              className="object-contain" 
            />
          </div>
        </div>

        {/* Bullet Points */}
        <ul className="flex flex-col gap-3 pl-2">
          {bullets.map((bullet, index) => (
            <li key={index} className="flex items-center gap-4 text-gray-200 text-lg md:text-[19px] tracking-wide font-light">
              <span className="w-1.5 h-1.5 rounded-sm bg-white/80 block shrink-0"></span>
              {bullet}
            </li>
          ))}
        </ul>

      </div>

      {/* =========================================
          BOTTOM SECTION: Title Button (z-10)
      ========================================= */}
      <div className="relative z-10 w-full mt-auto">
        <div className="w-full py-4 md:py-5 rounded-[20px] bg-white/5 border border-white/20 backdrop-blur-md flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.2)] group-hover:bg-white/10 transition-colors duration-300">
          <span className="serviceTitle text-2xl md:text-[28px] tracking-wide">
            {title}
          </span>
        </div>
      </div>

    </div>
  );
};

// ==========================================================================
// MAIN SERVICES COMPONENT
// ==========================================================================
export default function Services3() {
  
  const servicesData = [
    {
      title: "Design",
      iconPath: "/service/design.svg",
      bullets: ["Visual Identity", "Web & Mobile UI", "Product Design"],
    },
    {
      title: "Build",
      iconPath: "/service/build.svg",
      bullets: ["Landing Pages", "Custom Websites", "Web Applications"],
    },
    {
      title: "Automate",
      iconPath: "/service/automate.svg",
      bullets: ["Custom Workflows", "AI Implementation", "Sales Funnels"],
    },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col px-6 md:px-12 py-20 items-center justify-center gap-10 md:gap-16">

      <div className="w-full flex items-center justify-center">
        <h3 className="text-4xl md:text-5xl font-bold text-white text-center tracking-tight">
          What we do
        </h3>
      </div>

      {/* Grid Layout */}
      <div className="w-full max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {servicesData.map((service, index) => (
          <ServiceCard 
            key={index}
            title={service.title}
            iconPath={service.iconPath}
            bullets={service.bullets}
          />
        ))}
      </div>
      
    </div>
  );
}