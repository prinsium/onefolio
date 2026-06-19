"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { works } from "@/app/data/work";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence, useInView } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

// ==========================================================================
// 1. MOBILE CARD SUB-COMPONENT (Framers Motion)
// ==========================================================================
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
  
  const isInView = useInView(cardRef, {
    margin: "-20% 0px -20% 0px",
    amount: "some",
  });

  useEffect(() => {
    if (isInView) {
      setActiveIndex(index);
    }
  }, [isInView, index, setActiveIndex]);

  const isExpanded = activeIndex === index;

  return (
    <div
      ref={cardRef}
      className="w-full border border-line p-2 mb-4 rounded-md flex flex-col justify-start cursor-pointer"
      onClick={() => setActiveIndex(index)} 
    >
      <div className="flex items-baseline gap-4 py-2">
        <span
          className={`font-mono text-xs font-semibold transition-colors duration-300 ${
            isExpanded ? "text-blue-500" : "text-neutral-600"
          }`}
        >
          {work.id}
        </span>
        <h3
          className="text-main text-xl font-bold tracking-tight font-space transition-colors duration-300">
          {work.title}
        </h3>
      </div>

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
              <div className="relative w-full aspect-[14/10] bg-surface rounded-lg overflow-hidden shadow-lg">
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
                    className="text-[10px] font-medium border border-line bg-surface px-2.5 py-1 rounded-sm text-muted font-space"
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
  // 1. The outer wrapper that GSAP watches (Stays in the document flow)
  const triggerRef = useRef<HTMLDivElement>(null);
  
  // 2. The inner container that actually gets pinned to the screen
  const pinRef = useRef<HTMLDivElement>(null);
  
  const [desktopActiveIndex, setDesktopActiveIndex] = useState(0);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const cards = gsap.utils.toArray(".desktop-work-slide") as HTMLElement[];
      const totalItems = cards.length;

      if (!triggerRef.current || !pinRef.current) return;

      const pinTl = gsap.timeline({
        scrollTrigger: {
          // Tell GSAP to calculate positions based on the outer box
          trigger: triggerRef.current, 
          
          // Physically lock the inner box to the screen
          pin: pinRef.current,         
          
          // Start exactly 64px down to clear the 44px Navbar + 20px gap
          start: "top 64px",
          
          end: `+=${totalItems * 100}%`,
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

  return (
   <section className="relative w-full select-none block">
      
      {/* ==========================================
         DESKTOP INTERFACE (GSAP PINNED - >= md)
         ========================================== */}
         
      {/* OUTER WRAPPER: GSAP measures this to know when to start and stop */}
      <div ref={triggerRef} className="hidden md:block w-full relative">
        
        {/* INNER WRAPPER: GSAP pins this, but because it is inside the trigger, 
            it won't jump out of its column! h-[95vh] prevents bottom overflow. */}
        <div 
          ref={pinRef}
          className="w-full h-[95vh] relative overflow-hidden rounded-md"
        >
          {/* Main Pinned Container: removed padding, kept general styling */}
          <div className="relative w-full h-full rounded-sm overflow-hidden bg-primary border-line">
            
            {works.map((work, index) => (
              <div
                key={`desk-${work.id}`}
                className="desktop-work-slide absolute inset-0 w-full h-full"
                style={{ zIndex: index + 1 }}
              >
                {/* Maintain GSAP structure and selector names */}
                {index !== 0 && (
                  <div className="shutter-sweep-line absolute top-0 bottom-0 w-[4px] bg-blue-600 z-20 will-change-transform" />
                )}

                <div className="shutter-clip-frame absolute inset-0 w-full h-full overflow-hidden z-10 will-change-transform">
                  {/*
                    Modified .inner-image-content to be a flex container.
                    This will center its child (the new image container).
                  */}
                  <div className="inner-image-content absolute inset-0 w-full h-full will-change-transform flex items-center justify-center">
                    
                    {/*
                      New Image Container: fulfills "inside a container with noise background".
                      Replicates the container details from image_0.png, but is centered on the whole screen.
                    */}
                    <div className="relative aspect-[14/10] w-[80%] max-w-[1100px] overflow-hidden bg-gray-800 rounded-xl shadow-md [background-image:url('https://res.cloudinary.com/dzf8e4e7p/image/upload/v1721183389/f6-pantry/pattern_vshvxz.png')] bg-blend-multiply transition-all duration-300 ease-out hover:scale-[1.005]">
                      <Image
                        src={work.pic}
                        alt={work.title}
                        fill
                        priority={index === 0}
                        className="object-cover object-top rounded-xl aspect-[14/10]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Floating Thumbnail Carousel Deck - NOT TOUCHED */}
            <div className="absolute right-8 bottom-8 z-50 bg-black/40 backdrop-blur-md p-2 rounded-md border border-white/10 flex gap-2 items-center shadow-2xl">
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
      </div>

      {/* ==========================================
         MOBILE INTERFACE (FRAMER MOTION - < md)
         ========================================== */}
      <div className="block md:hidden w-full px-2 py-1">
        <div className="mb-6 w-full border-b border-neutral-800">
          <h6 className="mb-6">
             Selected Creations
          </h6>
        </div>

        <div className="w-full">
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
