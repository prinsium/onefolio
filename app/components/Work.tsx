"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { works } from "@/app/data/work";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence, useInView } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

// ==========================================================================
// 1. MOBILE CARD SUB-COMPONENT (Bulletproof Phone Tracking)
// ==========================================================================
// We isolate the mobile card so each one can run its own hardware-accelerated
// viewport observer. This bypasses Safari/Chrome scroll bugs entirely.
const MobileCard = ({
  work,
  index,
  activeIndex,
  setActiveIndex,
}: {
  work: typeof works[0];
  index: number;
  activeIndex: number;
  setActiveIndex: (val: number) => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // This hook physically watches the DOM element on the phone screen.
  // The margin creates a "focus zone" in the vertical center of the screen.
  const isInView = useInView(cardRef, {
    margin: "-40% 0px -40% 0px",
    amount: "some",
  });

  // Whenever this specific card enters the center of the phone screen, tell the parent.
  useEffect(() => {
    if (isInView) {
      setActiveIndex(index);
    }
  }, [isInView, index, setActiveIndex]);

  const isExpanded = activeIndex === index;

  return (
    <div
      ref={cardRef}
      className="w-full border-b border-neutral-800 py-6 flex flex-col justify-start cursor-pointer"
      onClick={() => setActiveIndex(index)} // Fallback tap interaction
    >
      {/* Header (Always Visible) */}
      <div className="flex items-baseline gap-4 py-2">
        <span
          className={`font-mono text-xs font-semibold transition-colors duration-300 ${
            isExpanded ? "text-blue-500" : "text-neutral-600"
          }`}
        >
          {work.id}
        </span>
        <h3
          className={`text-xl font-bold tracking-tight font-space transition-colors duration-300 ${
            isExpanded ? "text-white" : "text-neutral-400"
          }`}
        >
          {work.title}
        </h3>
      </div>

      {/* Accordion Body (Framer Motion) */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0 }}
            style={{ overflow: "hidden", willChange: "height, opacity" }}
          >
            <div className="pt-4 space-y-4 w-full pb-2">
              <div className="relative w-full aspect-[4/3] bg-white rounded-lg overflow-hidden shadow-lg border border-neutral-200/10">
                <Image
                  src={work.pic}
                  alt={work.title}
                  fill
                  sizes="(max-width: 768px) 100vw"
                  className="object-cover object-top p-1"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {work.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-medium border border-neutral-800 bg-neutral-900 px-2.5 py-1 rounded-sm text-neutral-400 font-space"
                  >
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
};

// ==========================================================================
// 2. MAIN COMPONENT EXPORT
// ==========================================================================
export default function Work() {
  const desktopContainerRef = useRef<HTMLDivElement>(null);
  
  // Independent state for Desktop (GSAP scroll scrub)
  const [desktopActiveIndex, setDesktopActiveIndex] = useState(0);
  
  // Independent state for Mobile (Framer view tracking)
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);

  useEffect(() => {
    // We strictly scope GSAP to desktop viewports to prevent mobile interference
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

        // 1. Sweep masking frame right-to-left
        pinTl.fromTo(
          [blueLine, clippedFrame],
          { left: "100%" },
          { left: "0%", ease: "none", duration: 1 },
          `slide-${idx}`
        )
        // 2. Counter-translate image to keep it visually locked
        .fromTo(
          innerImageContainer,
          { xPercent: -100 },
          { xPercent: 0, ease: "none", duration: 1 },
          `slide-${idx}`
        )
        // 3. Hide blue lead line
        .to(blueLine, { opacity: 0, duration: 0.01 }, `slide-${idx}+=1`);
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      mm.revert();
    };
  }, []);

  return (
    <section className="relative w-full bg-[#121317] select-none">
      
      {/* ==========================================
         DESKTOP INTERFACE (GSAP PINNED - >= md)
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
                  <Image
                    src={work.pic}
                    alt={work.title}
                    fill
                    priority={index === 0}
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Floating Thumbnail Carousel Deck */}
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
                  <Image
                    src={work.pic}
                    alt="miniature layout anchor"
                    fill
                    sizes="96px"
                    className="object-cover object-top"
                    style={{ opacity: isActive ? 1 : 0.4 }}
                  />
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
         MOBILE INTERFACE (FRAMER MOTION - < md)
         ========================================== */}
      <div className="block md:hidden w-full px-6 py-20">
        <div className="mb-12">
          <span className="text-xs uppercase tracking-widest text-neutral-500 font-mono">
            Selected Creations
          </span>
        </div>

        <div className="w-full border-t border-neutral-800">
          {works.map((work, index) => (
            <MobileCard
              key={`mob-${work.id}`}
              work={work}
              index={index}
              activeIndex={mobileActiveIndex}
              setActiveIndex={setMobileActiveIndex}
            />
          ))}
        </div>
      </div>
      
    </section>
  );
}