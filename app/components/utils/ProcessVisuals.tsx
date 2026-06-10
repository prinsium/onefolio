"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

interface ProcessVisualsProps {
  type: string;
}

// -------------------------------------------
// 1. DECODE VISUAL (SVG & Center Blip)
// -------------------------------------------
const DecodeVisual = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const decodeSvgPath = "/process/decode.svg";

  useEffect(() => {
    let ctx = gsap.context(() => {
      const blipSquare = gsap.utils.toArray(".decode-blip-square");
      gsap.set(blipSquare, { opacity: 0, scale: 0.5 });

      const blipTimeline = gsap.timeline({ repeat: -1 });
      blipTimeline
        .to(blipSquare, {
          opacity: 1,
          scale: 1,
          duration: 0.2,
          ease: "back.out(1.5)",
        })
        .to(blipSquare, {
          opacity: 0,
          scale: 0.5,
          duration: 0.5,
          ease: "power2.in",
          delay: 1.3,
        });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full aspect-auto bg-[#1a1a1a] rounded-xl overflow-hidden flex items-center justify-center"
    >
      <div className="relative w-3/5 aspect-square max-w-[200px]">
        <div
          className="decode-blip-square absolute w-12 h-12 bg-blue-600 z-10"
          style={{ top: "50%", left: "50%", margin: "-24px 0 0 -24px" }} 
        />
        <div className="absolute inset-0 z-20 pointer-events-none">
          <Image
            src={decodeSvgPath}
            alt="Decode Phase"
            fill
            className="object-contain"
            priority 
          />
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------
// 2. ARCHITECT VISUAL (Hammer & Tracking Blip)
// -------------------------------------------
const ArchitectVisual = () => {
  const hammerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const blipSquareRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const hammerSvgPath = "/process/hammer.svg";

  useEffect(() => {
    let ctx = gsap.context(() => {
      const blipTimeline = gsap.timeline({ repeat: -1 });
      blipTimeline
        .to(blipSquareRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.1,
          ease: "power2.in",
        })
        .to(blipSquareRef.current, {
          opacity: 0,
          scale: 0.5,
          duration: 0.5,
          ease: "power2.out",
          delay: 1.4,
        });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHovering || !hammerRef.current || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const hammerRect = hammerRef.current.getBoundingClientRect();

    const mouseX = e.clientX - containerRect.left;
    const mouseY = e.clientY - containerRect.top;

    const hammerCenterX = hammerRect.left - containerRect.left + hammerRect.width / 2;
    const hammerCenterY = hammerRect.top - containerRect.top + hammerRect.height / 2;
    
    const moveX = mouseX - hammerCenterX;
    const moveY = mouseY - hammerCenterY;

    const scaledMoveX = moveX * 0.15;
    const scaledMoveY = moveY * 0.15;

    gsap.to(hammerRef.current, {
      x: scaledMoveX,
      y: scaledMoveY,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => {
    setIsHovering(false);
    gsap.to(hammerRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full aspect-auto bg-[#1a1a1a] rounded-xl overflow-hidden flex items-center justify-center"
      onMouseMove={handleMouseMove}
    >
      <div className="relative z-0 flex items-center justify-center p-8 bg-transparent">
        <div className="w-24 h-24 bg-transparent rounded" />
        <div
          ref={blipSquareRef}
          className="absolute w-10 h-10 bg-blue-500 opacity-0 scale-50 will-change-transform will-change-opacity z-10"
        />
      </div>

      <div
        ref={hammerRef}
        className="absolute z-30 w-3/5 aspect-square max-w-[200px]"
      >
        <Image
          src={hammerSvgPath}
          alt="Architect Hammer"
          fill
          className="object-contain scale-150"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </div>
    </div>
  );
};

// -------------------------------------------
// 3. OPTIMIZE VISUAL (Concentric Rotating SVGs)
// -------------------------------------------
const OptimizeVisual = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const blipSquareRef = useRef<HTMLDivElement>(null);

  const innerSvgPath = "/process/inner.svg";
  const outerSvgPath = "/process/outer.svg";

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Clockwise Inner Rotation (Faster)
      gsap.to(innerRef.current, {
        rotation: 360,
        duration: 12,
        repeat: -1,
        ease: "none", // Linear, constant speed
      });

      // 2. Anti-Clockwise Outer Rotation (Slightly Slower)
      gsap.to(outerRef.current, {
        rotation: -360,
        duration: 20,
        repeat: -1,
        ease: "none",
      });

      // 3. Center Pixel Blip
      gsap.set(blipSquareRef.current, { opacity: 0, scale: 0.5 });
      const blipTimeline = gsap.timeline({ repeat: -1 });
      blipTimeline
        .to(blipSquareRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.2,
          ease: "back.out(1.5)",
        })
        .to(blipSquareRef.current, {
          opacity: 0,
          scale: 0.5,
          duration: 0.5,
          ease: "power2.in",
          delay: 1.3,
        });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full aspect-auto bg-[#1a1a1a] flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="relative w-3/5 aspect-square max-w-[200px] flex items-center justify-center">
        
        {/* Outer SVG (z-0, anticlockwise) */}
        <div ref={outerRef} className="absolute inset-0 z-0 pointer-events-none">
          <Image src={outerSvgPath} alt="Outer Gear" fill className="object-contain scale-150" />
        </div>

        {/* Inner SVG (z-10, clockwise) */}
        <div ref={innerRef} className="absolute inset-0 z-10 pointer-events-none">
          <Image src={innerSvgPath} alt="Inner Gear" fill className="object-contain" />
        </div>

        {/* Center Blip Square (z-20 so it sits on top of everything) */}
        <div
          ref={blipSquareRef}
          className="absolute w-10 h-10 bg-blue-600 z-20"
          style={{ top: "50%", left: "50%", margin: "-20px 0 0 -20px" }} // Perfectly centered
        />

      </div>
    </div>
  );
};

// -------------------------------------------
// 4. EVOLVE VISUAL (Tree & Blips)
// -------------------------------------------
const EvolveVisual = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const treeSvgPath = "/process/tree.svg";

  useEffect(() => {
    let ctx = gsap.context(() => {
      const squares = gsap.utils.toArray(".evolve-blip-square");
      gsap.set(squares, { opacity: 0, scale: 0.5 });

      const blipTimeline = gsap.timeline({ repeat: -1 });
      blipTimeline
        .to(squares, {
          opacity: 1,
          scale: 1,
          duration: 0.2,
          ease: "back.out(1.5)",
          stagger: 0.1, 
        })
        .to(squares, {
          opacity: 0,
          scale: 0.5,
          duration: 0.5,
          ease: "power2.in",
          delay: 1.3, 
        });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full aspect-auto bg-[#1a1a1a] rounded-xl overflow-hidden flex items-center justify-center"
    >
      <div className="relative w-3/5 aspect-square max-w-[200px]">
        <div className="evolve-blip-square absolute w-10 h-10 bg-blue-600 z-10" style={{ top: "10%", left: "42%" }} />
        <div className="evolve-blip-square absolute w-10 h-10 bg-blue-600 z-10" style={{ top: "75%", left: "5%" }} />
        <div className="evolve-blip-square absolute w-10 h-10 bg-blue-600 z-10" style={{ top: "20%", left: "105%" }} />

        <div className="absolute inset-0 z-20 pointer-events-none">
          <Image
            src={treeSvgPath}
            alt="Evolve Tree"
            fill
            className="object-contain scale-150"
          />
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------
// MASTER SWITCHBOARD
// -------------------------------------------
export default function ProcessVisuals({ type }: ProcessVisualsProps) {
  switch (type) {
    case "decode":
      return <DecodeVisual />;
    case "architect":
      return <ArchitectVisual />;
    case "optimize":
      return <OptimizeVisual />;
    case "evolve":
      return <EvolveVisual />;
    default:
      return <div className="bg-neutral-900 w-full h-full flex items-center justify-center text-xs text-white opacity-50 aspect-[16/10]">Visualizing...</div>;
  }
}