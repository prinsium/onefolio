"use client";

import React from "react";
// Import your new components
import { processStepss } from "@/app/data/processforcircle";
import ProcessVisuals from "./utils/ProcessVisuals";

export default function TheProcess() {
  return (
    <section className="relative w-full text-main py-32 px-6 md:px-12 font-space">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 relative">
        
        {/* LEFT COLUMN: Sticky Title Box */}
        <div className="w-full lg:w-1/3 relative lg:sticky top-[10vh] z-10 h-fit mb-8 lg:mb-0">
          <div className="bg-surface border border-line rounded-xl p-8 md:p-10 shadow-2xl">
            <h2 className="text-3xl md:text-4xl leading-[1.3] text-neutral-300">
              The <span className="font-bold text-main">PDLC</span>
              <br />
              ( <span className="font-bold text-main">P</span>roduct{" "}
              <span className="font-bold text-main">D</span>evelopment
              <br />
              <span className="font-bold text-main">L</span>ife{" "}
              <span className="font-bold text-main">C</span>ycle ) Approach
            </h2>
          </div>
        </div>

        {/* RIGHT COLUMN: The Stacking Cards */}
        <div className="w-full lg:w-2/3 flex flex-col relative gap-2 md:gap-6">
          {processStepss.map((step, index) => (
            <div
              key={step.id}
              className="sticky w-full h-fit bg-primary rounded-[24px]"
              style={{
                top: `calc(10vh + ${index * 96}px)`,
                zIndex: index + 1,
                minHeight: "30vh", 
              }}
            >
              <div className="flex flex-col border border-line shadow-2xl rounded-xl gap-6 md:gap-8">
                
                {/* 1. The Header Box */}
                <div className="bg-surface border border-line rounded-xl p-6 md:p-8 flex items-center gap-6">
                  <h3 className="font-mono text-neutral-400">
                    /{step.id}/
                  </h3>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-main uppercase">
                    {step.title}
                  </h3>
                </div>

                {/* 2. The Content Body */}
                <div className="flex flex-col gap-6 px-2 md:px-4 pb-2 md:pb-4">
                  <p className="text-muted text-lg md:text-xl leading-relaxed max-w-2xl">
                    {step.subtext}
                  </p>
                  
                  {/* REPLACED: Image is gone, ProcessVisuals takes its place */}
                  <div className="relative w-full bg-card-process aspect-square md:aspect-[16/10] rounded-xl overflow-hidden">
                    <ProcessVisuals type={step.gridType} />
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