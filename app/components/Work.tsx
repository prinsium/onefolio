"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { works } from "@/app/data/work";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export default function Work() {
  const desktopContainerRef = useRef<HTMLDivElement>(null);
  
  // Desktop State
  const [desktopActiveIndex, setDesktopActiveIndex] = useState(0);
  
  // Mobile State
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);
  
  // Refs for mobile cards to calculate their exact physical position
  const mobileCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    /* ==========================================================================
       1. DESKTOP GSAP LOGIC
       ========================================================================== */
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const cards = gsap.utils.toArray(".desktop-work-slide") as HTMLElement[];
      const totalItems = cards.length;

      if (!desktopContainerRef.current) return;

      const pinTl = gsap.timeline({
        scrollTrigger: {
          trigger: desktopContainerRef.current,
          start: "top top",
          end: `+=${totalItems * 100}%`,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progressIndex = Math.min(
              Math.floor(self.progress * totalItems),
              totalItems - 1
            );
            setDesktopActiveIndex(progressIndex);
          },
        },
      });

      cards.forEach((card, idx) => {
        if (idx === 0) return;

        const blueLine = card.querySelector(".shutter-sweep-line") as HTMLElement | null;
        const clippedFrame = card.querySelector(".shutter-clip-frame") as HTMLElement | null;
        const innerImageContainer = card.querySelector(".inner-image-content") as HTMLElement | null;

        if (!blueLine || !clippedFrame || !innerImageContainer) return;

        pinTl.fromTo(
          [blueLine, clippedFrame],
          { left: "100%" },
          { left: "0%", ease: "none", duration: 1 },
          `slide-${idx}`
        )
        .fromTo(
          innerImageContainer,
          { xPercent: -100 },
          { xPercent: 0, ease: "none", duration: 1 },
          `slide-${idx}`
        )
        .to(blueLine, { opacity: 0, duration: 0.01 }, `slide-${idx}+=1`);
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      mm.revert();
    };
  }, []);

  /* ==========================================================================
     2. MOBILE BRUTE-FORCE SCROLL TRACKING
     ========================================================================== */
  useEffect(() => {
    // Only run this mathematical check if we are on a mobile screen
    if (window.innerWidth >= 768) return;

    const handleScroll = () => {
      const viewportCenter = window.innerHeight / 2;
      let closestIndex = 0;
      let minDistance = Infinity;

      mobileCardRefs.current.forEach((card, index) => {
        if (!card) return;
        
        // Get the exact physical pixel box of the card relative to the screen
        const rect = card.getBoundingClientRect();
        
        // Find the center of this specific card
        const cardCenter = rect.top + rect.height / 2;
        
        // Calculate how far the card's center is from the screen's center
        const distanceToCenter = Math.abs(viewportCenter - cardCenter);

        // Update if this card is the closest one we've checked so far
        if (distanceToCenter < minDistance) {
          minDistance = distanceToCenter;
          closestIndex = index;
        }
      });

      setMobileActiveIndex(closestIndex);
    };

    // Listen to scroll and touch movement
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Fire once on load to set the initial active card
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative w-full bg-[#121317] select-none">
      
      {/* ==========================================
         DESKTOP INTERFACE
         ========================================== */}
      <div 
        ref={desktopContainerRef}
        className="hidden md:block w-full h-screen relative p-16 overflow-hidden"
      >
        <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl bg-neutral-900 border border-neutral-800">
          {works.map((work, index) => (
            <div
              key={`desk-${work.id}`}
              className="desktop-work-slide absolute inset-0 w-full h-full"
              style={{ zIndex: index + 1 }}
            >
              {index !== 0 && (
                <div className="shutter-sweep-line absolute top-0 bottom-0 w-[4px] bg-blue-600 z-20 will-change-transform" />
              )}
              <div className="shutter-clip-frame absolute inset-0 w-full h-full overflow-hidden z-10 will-change-transform">
                <div className="inner-image-content absolute inset-0 w-full h-full will-change-transform">
                  <Image src={work.pic} alt={work.title} fill priority={index === 0} className="object-cover object-top" />
                </div>
              </div>
            </div>
          ))}

          <div className="absolute right-8 bottom-8 z-50 bg-black/40 backdrop-blur-md p-3 rounded-xl border border-white/10 flex gap-4 items-center shadow-2xl">
            {works.map((work, index) => {
              const isActive = desktopActiveIndex === index;
              return (
                <div
                  key={`thumb-${work.id}`}
                  className="relative w-24 aspect-[16/10] rounded-md border overflow-hidden transition-all duration-300 ease-out will-change-transform"
                  style={{
                    transform: isActive ? "scale(1.1)" : "scale(1)",
                    borderColor: isActive ? "#2563eb" : "rgba(255,255,255,0.1)",
                    zIndex: isActive ? 10 : 1,
                  }}
                >
                  <Image src={work.pic} alt="preview" fill sizes="96px" className="object-cover object-top" style={{ opacity: isActive ? 1 : 0.4 }} />
                  <div className="absolute bottom-1 left-1.5 bg-black/70 px-1 py-0.5 rounded text-[8px] font-mono text-white tracking-tighter">
                    {work.id}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ==========================================
         MOBILE INTERFACE 
         ========================================== */}
      <div className="block md:hidden w-full px-6 py-20 pb-40">
        <div className="mb-12">
          <span className="text-xs uppercase tracking-widest text-neutral-500 font-mono">
            Selected Creations
          </span>
        </div>

        <div className="w-full border-t border-neutral-800 relative">
          {works.map((work, index) => {
            const isExpanded = mobileActiveIndex === index;

            return (
              <div
                key={`mob-${work.id}`}
                // Attach the ref so our math function can measure it
                ref={(el) => { mobileCardRefs.current[index] = el; }}
                className="w-full border-b border-neutral-800 py-6 flex flex-col justify-start cursor-pointer transition-colors duration-300"
                onClick={() => setMobileActiveIndex(index)}
              >
                <div className="flex items-baseline gap-4 py-2 pointer-events-none">
                  <span className={`font-mono text-xs font-semibold transition-colors duration-300 ${isExpanded ? "text-blue-500" : "text-neutral-600"}`}>
                    {work.id}
                  </span>
                  <h3 className={`text-xl font-bold tracking-tight font-space transition-colors duration-300 ${isExpanded ? "text-white" : "text-neutral-400"}`}>
                    {work.title}
                  </h3>
                </div>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: "spring", duration: 0.4, bounce: 0 }}
                      style={{ overflow: "hidden", willChange: "height, opacity" }}
                    >
                      <div className="pt-4 space-y-4 w-full pb-2">
                        <div className="relative w-full aspect-[4/3] bg-white rounded-lg overflow-hidden shadow-lg border border-neutral-200/10 pointer-events-none">
                          <Image src={work.pic} alt={work.title} fill sizes="(max-width: 768px) 100vw" className="object-cover object-top p-1" />
                        </div>
                        <div className="flex flex-wrap gap-2 pointer-events-none">
                          {work.tags.map((tag, i) => (
                            <span key={i} className="text-[10px] font-medium border border-neutral-800 bg-neutral-900 px-2.5 py-1 rounded-sm text-neutral-400 font-space">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
      
    </section>
  );
}