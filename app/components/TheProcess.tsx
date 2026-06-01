"use client";

import React from "react";
import Image from "next/image";
// Assuming your data file is at this exact path based on your prompt
import { processStepss } from "@/app/data/processforcircle";

export default function TheProcess() {
  return (
    <section className="relative w-full text-white py-32 px-6 md:px-12 font-space">
     <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 relative">
        
        {/* ==========================================
            LEFT COLUMN: Sticky Title Box
            ========================================== */}
        <div className="w-full lg:w-1/3 relative lg:sticky top-[10vh] z-10 h-fit mb-8 lg:mb-0">
          <div className="bg-black border border-neutral-800 rounded-xl p-8 md:p-10 shadow-2xl">
            <h2 className="text-3xl md:text-4xl leading-[1.3] text-neutral-300">
              The <span className="font-bold text-white">PDLC</span>
              <br />
              ( <span className="font-bold text-white">P</span>roduct{" "}
              <span className="font-bold text-white">D</span>evelopment
              <br />
              <span className="font-bold text-white">L</span>ife{" "}
              <span className="font-bold text-white">C</span>ycle ) Approach
            </h2>
          </div>
        </div>

        {/* ==========================================
            RIGHT COLUMN: The Stacking Cards
            ========================================== */}
        <div className="w-full lg:w-2/3 flex flex-col relative gap-3 p-1">
          {processStepss.map((step, index) => (
            <div
              key={step.id}
              className="sticky w-full bg-[#121317]"
              style={{
                // 1. Start sticking at 10vh down the screen
                // 2. Add 96px of space for every previous card so their headers stack beautifully
                top: `calc(10vh + ${index * 96}px)`,
                // 3. Increment Z-Index so the new card completely covers the body of the old card
                zIndex: index + 1,
                // 4. Force a tall height so the user actually has to scroll to pull the next card up
                minHeight: "70vh", 
              }}
            >
              <div className="flex flex-col rounded-xl gap-6 md:gap-8">
                
                {/* 1. The Header Box (This is the part that remains visible when stacked) */}
                <div className="bg-black border border-neutral-800 rounded-xl p-6 md:p-8 flex items-center gap-6">
                  <span className="text-3xl md:text-4xl font-mono text-neutral-500 font-light">
                    {step.id}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white uppercase">
                    {step.title}
                  </h3>
                </div>

                {/* 2. The Content Body (This naturally gets covered by the next card's background) */}
                <div className="flex flex-col gap-6 px-2 md:px-4">
                  <p className="text-neutral-300 text-lg md:text-xl leading-relaxed max-w-2xl">
                    {step.subtext}
                  </p>
                  
                  {/* Image Frame Placeholder */}
                  <div className="relative w-full aspect-[16/10] bg-neutral-800 rounded-xl overflow-hidden shadow-2xl border border-neutral-800/50">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 66vw"
                      className="object-cover object-center opacity-90"
                    />
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}