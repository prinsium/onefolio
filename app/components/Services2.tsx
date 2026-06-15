"use client";

import React from "react";
import Image from "next/image";

// ==========================================================================
// TYPESCRIPT INTERFACES
// ==========================================================================
interface ServiceCardProps {
  children: React.ReactNode; // ReactNode covers elements, strings, numbers, fragments, etc.
  title: string;
}

// ==========================================================================
// REUSABLE SERVICE CARD COMPONENT
// ==========================================================================
const ServiceCard = ({ children, title }: ServiceCardProps) => {
  return (
    <div className="relative w-full mx-auto max-w-[400px] aspect-[3/4] rounded-[24px] bg-[#303030] flex flex-col items-center justify-between group cursor-pointer border border-[#404040] hover:border-neutral-500 transition-colors duration-300 overflow-hidden px-6 pt-12 pb-10">

      {/* BACKGROUND: DOTTED CIRCLES (ARCS) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-20%] left-[-20%] w-[100%] h-[100%] rounded-full border-2 border-dashed border-[#505050]"></div>
        <div className="absolute bottom-[-20%] right-[-20%] w-[100%] h-[100%] rounded-full border-2 border-dashed border-[#505050]"></div>
      </div>

      {/* CENTRAL ICON CONSTRUCTION */}
      <div className="relative flex-1 w-full flex items-center justify-center">
        {/* The 10-sided gear shape background - Rotates on hover */}
        <div className="relative w-[80%] aspect-square flex items-center justify-center group-hover:rotate-[360deg] transition-transform duration-1000 ease-in-out">
          <Image 
            src="/lottie/bigcircle.svg" 
            alt="Gear background" 
            fill 
            className="object-contain"
          />
        </div>

        {/* The inner circular icon - Scales on hover */}
        <div className="absolute w-[50%] aspect-square flex items-center justify-center group-hover:scale-125 transition-transform duration-300 ease-in-out">
          {children}
        </div>
      </div>

      {/* BOTTOM TEXT */}
      <h4 className="absolute bottom-10 text-3xl font-medium text-white tracking-wide uppercase shrink-0">
        {title}
      </h4>

    </div>
  );
};

// ==========================================================================
// SPECIFIC ICONS
// ==========================================================================

const DesignIcon = () => (
    <div className="w-[85%] aspect-square flex items-center justify-center rounded-full bg-[#303030] border-2 border-dashed border-gray-500">
        <Image src="/lottie/design.svg" alt="Design icon" width={60} height={60} className="object-contain" />
    </div>
);

const BuildIcon = () => (
    <div className="w-[85%] aspect-square flex items-center justify-center rounded-full bg-[#303030] border-2 border-dashed border-gray-500">
        <Image src="/lottie/build.svg" alt="Build code icon" width={60} height={60} className="object-contain" />
    </div>
);

const AutomationIcon = () => (
    <div className="w-[85%] aspect-square flex items-center justify-center rounded-full bg-[#303030] border-2 border-dashed border-gray-500">
        <Image src="/lottie/automate.svg" alt="Automation node icon" width={60} height={60} className="object-contain" />
    </div>
);

// ==========================================================================
// MAIN SERVICES COMPONENT
// ==========================================================================
export default function Services() {
  return (
    <div className="w-full h-full flex flex-col px-6 md:px-12 items-center justify-center gap-6 md:gap-12 lg:gap-16">

      <div className="w-full flex items-center justify-center">
        <h3 className="text-4xl font-bold text-white text-center">Whether you want</h3>
      </div>

      <div className="w-full max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        <ServiceCard title="Design">
          <DesignIcon />
        </ServiceCard>
        
        <ServiceCard title="Build">
          <BuildIcon />
        </ServiceCard>

        <ServiceCard title="Automation">
          <AutomationIcon />
        </ServiceCard>
      </div>
      
    </div>
  );
}