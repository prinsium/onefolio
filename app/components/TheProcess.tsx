"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { pdlcHeader, processSteps } from "../data/process";

gsap.registerPlugin(ScrollTrigger);

interface GridCell {
  x: number;
  y: number;
  dist: number;
}

const TheProcess = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  
  const fillPercentRef = useRef({ val: 0 });
  const activeStepIdRef = useRef<string>("01");
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const detailsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const leftCol = leftColRef.current;
    if (!container || !canvas || !leftCol) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const blockSize = 14; 
    const dpr = window.devicePixelRatio || 1;
    let width: number, height: number, cols: number, rows: number;
    let grid: GridCell[] = [];
    let maxPossibleDist: number;

    const state = { isComplete: false };

    // 1. Canvas Procedural Matrix Grid Calculation
    const initGrid = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      ctx.resetTransform();
      ctx.scale(dpr, dpr);

      cols = Math.floor(width / blockSize);
      rows = Math.floor(height / blockSize);
      grid = [];

      const gridCenterX = (cols * blockSize) / 2;
      const gridCenterY = (rows * blockSize) / 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * blockSize;
          const y = r * blockSize;

          const cellCenterX = x + blockSize / 2;
          const cellCenterY = y + blockSize / 2;
          const dx = cellCenterX - gridCenterX;
          const dy = cellCenterY - gridCenterY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          grid.push({ x, y, dist });
        }
      }

      maxPossibleDist = Math.sqrt(Math.pow(gridCenterX, 2) + Math.pow(gridCenterY, 2));
    };

    const drawGrid = () => {
      if (state.isComplete) return;

      ctx.clearRect(0, 0, width, height);

      const fillPercent = fillPercentRef.current.val;
      const total = grid.length;

      for (let i = 0; i < total; i++) {
        const cell = grid[i];
        const normalizedDist = cell.dist / maxPossibleDist;
        const currentFillThreshold = Math.pow(fillPercent / 100, 1.3);

        if (normalizedDist <= currentFillThreshold) {
          let stepIndex = Math.floor(normalizedDist * 4);
          stepIndex = Math.max(0, Math.min(3, stepIndex));
          const stepColor = processSteps[stepIndex].colorRgb;

          ctx.fillStyle = `rgba(${stepColor}, 1)`;
          ctx.fillRect(Math.floor(cell.x) + 1, Math.floor(cell.y) + 1, blockSize - 1, blockSize - 1);
        } else {
          ctx.fillStyle = "#27272a"; // Subtle zinc-700 dots
          ctx.fillRect(Math.floor(cell.x) + blockSize / 2 - 1, Math.floor(cell.y) + blockSize / 2 - 1, 2, 2);
        }
      }

      requestAnimationFrame(drawGrid);
    };

    initGrid();
    drawGrid();

    // 2. Dynamic Card Stack Morphing Engine (Frame 13 Logic)
    const updateActiveStack = (activeId: string) => {
      const activeIndex = processSteps.findIndex((step) => step.id === activeId);

      processSteps.forEach((_, index) => {
        const card = cardsRef.current[index];
        const details = detailsRef.current[index];
        if (!card) return;

        // Calculate absolute sequence distance from current active card
        const distance = Math.abs(index - activeIndex);

        let targetWidth = "100%";
        let targetZIndex = 10;
        let targetHeight = "170px"; // Expanded size
        let targetBg = "#141416";
        let targetBorder = "rgba(255, 255, 255, 0.12)";

        // Mathematical tier matching based on Frame 13 distance vectors
        if (distance === 0) {
          targetWidth = "100%";
          targetZIndex = 12;
          targetHeight = "170px";
          targetBg = "#1c1c1e";
          targetBorder = "rgba(255, 255, 255, 0.15)";
        } else if (distance === 1) {
          targetWidth = "86%";
          targetZIndex = 9;
          targetHeight = "58px"; // Compact stack height
          targetBg = "#121214";
          targetBorder = "rgba(255, 255, 255, 0.06)";
        } else if (distance === 2) {
          targetWidth = "74%";
          targetZIndex = 6;
          targetHeight = "58px";
          targetBg = "#0f0f11";
          targetBorder = "rgba(255, 255, 255, 0.03)";
        } else {
          targetWidth = "62%";
          targetZIndex = 3;
          targetHeight = "58px";
          targetBg = "#0a0a0c";
          targetBorder = "rgba(255, 255, 255, 0.01)";
        }

        // Animate outer layered card structures
        gsap.to(card, {
          width: targetWidth,
          height: targetHeight,
          backgroundColor: targetBg,
          borderColor: targetBorder,
          zIndex: targetZIndex,
          duration: 0.45,
          ease: "power2.out",
        });

        // Toggle visibility of nested inner content elements smoothly
        if (details) {
          gsap.to(details, {
            opacity: distance === 0 ? 1 : 0,
            y: distance === 0 ? 0 : 8,
            height: distance === 0 ? "auto" : 0,
            duration: 0.35,
            ease: "power2.out",
          });
        }
      });
    };

    // 3. Pinned Scroll Timeline Configuration
    const ctx_gsap = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          pin: true,
          start: "top top",
          end: "+=400%",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      processSteps.forEach((_, index) => {
        const stepLabel = `step-${index}`;
        const targetPercent = (index + 1) * 25;

        tl.to({}, { duration: 0.4 });

        tl.to(
          fillPercentRef.current,
          {
            val: targetPercent,
            duration: 1,
            ease: "none",
            onUpdate: () => {
              const rawActiveIndex = Math.floor(fillPercentRef.current.val / 25.1);
              const clampedIndex = Math.max(0, Math.min(3, rawActiveIndex));

              if (processSteps[clampedIndex].id !== activeStepIdRef.current) {
                activeStepIdRef.current = processSteps[clampedIndex].id;
                updateActiveStack(processSteps[clampedIndex].id);
              }
            },
          },
          stepLabel
        );
      });
    }, container);

    // Initial state trigger
    updateActiveStack("01");

    const handleResize = () => {
      initGrid();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      ctx_gsap.revert();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full h-screen bg-transparent flex overflow-hidden select-none relative"
    >
      {/* LEFT SIDE COLUMN: Scaled up to 35% Width */}
      <div ref={leftColRef} className="w-full md:w-[35%] h-full flex flex-col pt-28 pb-16 px-10 z-10 relative">
        <div className="mb-12 space-y-1.5 pl-4">
          <span className="text-sm font-bold text-white tracking-tight uppercase">
            {pdlcHeader.title}
          </span>
          <p className="text-zinc-500 font-mono text-[11px] font-medium tracking-wide">
            {pdlcHeader.fullText}
          </p>
        </div>

        {/* Morphing Card Deck Wrapper Container */}
        <div className="flex flex-col w-full max-w-[500px] mx-auto relative mt-auto pl-2 pr-2">
          {processSteps.map((step, index) => (
            <div
              key={step.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              // -mt-3 applies clean, consistent vertical overlap layers
            //   className={`w-full h-fit rounded-xl p-2 flex flex-col overflow-hidden border mx-auto relative shadow-2xl transition-shadow duration-300 ${
            //     index > 0 ? "-mt-3" : ""
            //   }`}
            className="w-full h-fit rounded-xl p-2 flex flex-col overflow-hidden border mx-auto relative shadow-2xl transition-shadow duration-300"
            >
              {/* Header Info Block */}
              <div className="flex items-center justify-between w-full min-h-[30px] bg-[#000000] p-2 rounded-lg">
                 <h2 className="text-zinc-500">
                  {step.id}
                </h2>
                <h2
                  style={{ color: step.color }}
                  className="text-xl font-bold tracking-tight uppercase"
                >
                  {step.title}
                </h2>
              </div>

              {/* Collapsible Content Details Area */}
              <div
                ref={(el) => { detailsRef.current[index] = el; }}
                className="flex flex-col overflow-hidden pointer-events-none mt-3"
              >
                <p className="text-sm font-normal leading-relaxed text-zinc-400">
                  {step.subtext}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DASHED PANEL DIVIDER: Relocated precisely to 35% Axis */}
      <div className="absolute left-[100%] md:left-[35%] top-0 bottom-0 w-px flex flex-col justify-between items-center z-20 pointer-events-none">
        <span className="text-[14px] text-zinc-600 font-light select-none -translate-y-1/2 bg-[#151517] px-1">+</span>
        <div className="w-full h-full border-l border-dashed border-zinc-800" />
        <span className="text-[14px] text-zinc-600 font-light select-none translate-y-1/2 bg-[#151517] px-1">+</span>
      </div>

      {/* RIGHT SIDE CANVAS: Adjusted down to 65% Width */}
      <div className="hidden md:flex w-[65%] h-full flex items-center justify-center relative overflow-hidden bg-[#121212]">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>
    </section>
  );
};

export default TheProcess;