"use client";

import React from "react";
import Image from "next/image";
// ==========================================================================
// THE DESIGN CARD (Interactive Grid)
// ==========================================================================
const DesignCard = () => {
  return (
    <div className="relative w-[360px] md:w-[400px] h-[450px] md:h-[400px] lg:h-[450px] rounded-[24px] bg-[#303030] p-8 flex flex-col justify-between group cursor-pointer border border-[#404040] hover:border-neutral-500 transition-colors duration-300">

      {/* 
        The Inner Main Block
        Gradient from #363636 to #464646
      */}
      <div className="w-full h-[260px] p-1 md:p-2 lg:p-4 rounded-[18px] bg-gradient-to-b from-[#363636] to-[#464646] flex flex-col gap-2 md:gap-3">

        {/* Top Row: Blocks 1 & 2 */}
        <div className="flex flex-row w-full h-1/2 gap-2 md:gap-3">

          {/* Block 1 (Expands to 60%) */}
          <div className="h-full w-[50%] group-hover:w-[60%] bg-[#3f3f3f] border-2 border-dotted border-[#797878] rounded-xl transition-all duration-500 ease-out" />

          {/* Block 2 (Shrinks to 40%) */}
          <div className="h-full w-[50%] group-hover:w-[40%] bg-[#3f3f3f] border-2 border-dotted border-[#797878] rounded-xl transition-all duration-500 ease-out" />

        </div>

        {/* Bottom Row: Blocks 3 & 4 */}
        <div className="flex flex-row w-full h-1/2 gap-2 md:gap-3">

          {/* Block 3 (Shrinks to 40%) */}
          <div className="h-full w-[50%] group-hover:w-[40%] bg-[#3f3f3f] border-2 border-dotted border-[#797878] rounded-xl transition-all duration-500 ease-out" />

          {/* Block 4 (Expands to 60%) */}
          <div className="h-full w-[50%] group-hover:w-[60%] bg-[#3f3f3f] border-2 border-dotted border-[#797878] rounded-xl transition-all duration-500 ease-out" />

        </div>

      </div>

      {/* Card title */}
      <h4 className="text-3xl font-bold text-white tracking-wide uppercase">
        Design
      </h4>
    </div>
  );
};



// ==========================================================================
// THE BUILD CARD (Opacity & Vertical Lift Overlay)
// ==========================================================================
const BuildCard = () => {
  return (
    <div className="relative w-[360px] md:w-[400px] h-[450px] md:h-[400px] lg:h-[450px] rounded-[24px] bg-[#303030] p-8 flex flex-col justify-between group cursor-pointer border border-[#404040] hover:border-neutral-500 transition-colors duration-300">

      {/* The Inner Main Block */}
      <div className="relative w-full h-[300px] p-4 rounded-[18px] flex items-center justify-center overflow-hidden">

        <div className="absolute inset-0 w-full h-full p-8">
          <Image
            src="/lottie/gh.svg"
            alt="GitHub Base"
            fill
            className="object-contain"
          />
        </div>

        <div className="absolute inset-0 w-full h-full p-8 opacity-0 -translate-y-[20px] group-hover:opacity-100 group-hover:-translate-y-[40px] transition-all duration-500 ease-out">
          <Image
            src="/lottie/top.svg"
            alt="Build Top Overlay"
            fill
            className="object-contain drop-shadow-2xl"
          />
        </div>

        <div className="absolute inset-0 w-full h-full p-8 opacity-0 -translate-y-[60px] group-hover:opacity-75 group-hover:-translate-y-[80px] transition-all duration-1000 ease-out">
          <Image
            src="/lottie/top.svg"
            alt="Build Top Overlay"
            fill
            className="object-contain drop-shadow-2xl"
          />
        </div>

      </div>

      {/* Card title */}
      <h4 className="text-3xl font-bold text-white tracking-wide uppercase">
        Build
      </h4>
    </div>
  );
};



// ==========================================================================
// THE AUTOMATE CARD (Full Bleed Background & Centered Interaction)
// ==========================================================================
const AutomateCard = () => {
  return (
    <div className="relative w-[360px] md:w-[400px] h-[450px] md:h-[400px] lg:h-[450px] rounded-[24px] bg-[#303030] overflow-hidden group cursor-pointer border border-[#404040] hover:border-neutral-500 transition-colors duration-300">

      {/* 
        1. Full Card Background Graphic (auto.svg) 
        Covers the entire 360x450 area.
      */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <Image
          src="/lottie/auto.svg"
          alt="Automate Grid Base"
          fill
          className="object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500"
        />
      </div>

      {/* 
        2. The 5 Overlay SVGs (Centered)
        Absolute inset-0 with flex center puts them dead middle.
        gap-[12px] increases to gap-[16px] on hover.
      */}
      <div className="absolute inset-0 w-full h-full flex flex-row items-center justify-center gap-[12px] group-hover:gap-[16px] transition-all duration-500 ease-out z-10 px-4">

        {/* CRAWL.svg */}
        <div className="relative w-10 h-10 md:w-12 md:h-12 shrink-0 transition-all duration-500">
          <Image src="/lottie/CRAWL.svg" alt="Crawl" fill className="object-contain" />
        </div>

        {/* AI.svg */}
        <div className="relative w-10 h-10 md:w-12 md:h-12 shrink-0 transition-all duration-500">
          <Image src="/lottie/AI.svg" alt="AI" fill className="object-contain" />
        </div>

        {/* mainlogo.svg - Center piece scales to 110% */}
        <div className="relative w-16 h-16 md:w-16 md:h-16 shrink-0 transition-transform duration-500 ease-out group-hover:scale-125 drop-shadow-2xl">
          <Image src="/lottie/mainlogo.svg" alt="Main Logo" fill className="object-contain" />
        </div>

        {/* DATA.svg */}
        <div className="relative w-10 h-10 md:w-12 md:h-12 shrink-0 transition-all duration-500">
          <Image src="/lottie/DATA.svg" alt="Data" fill className="object-contain" />
        </div>

        {/* Email.svg */}
        <div className="relative w-10 h-10 md:w-12 md:h-12 shrink-0 transition-all duration-500">
          <Image src="/lottie/EMAIL.svg" alt="Email" fill className="object-contain" />
        </div>

      </div>

      {/* card title */}
      <div className="absolute bottom-8 left-8 z-20">
        <h4 className="text-3xl font-bold text-white tracking-wide uppercase drop-shadow-lg">
          Automate
        </h4>
      </div>

    </div>
  );
};

// ==========================================================================
// MAIN SERVICES COMPONENT
// ==========================================================================
export default function Services() {
  return (
    <div className="w-full h-full flex flex-col px-6 md:px-12 items-center justify-center gap-6 md:gap-12 lg:gap-16">

      <div className="w-full flex items-center justify-center">
        <h3 className="text-4xl font-bold text-white">Whether you want</h3>
      </div>

      <div className="w-full h-fit flex flex-col md:flex-row items-center justify-center gap-6 lg:gap-8">

        {/* The New Interactive Grid Card */}
        <DesignCard />
        <BuildCard />
        <AutomateCard />

      </div>
    </div>
  );
}