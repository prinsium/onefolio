"use client";

import React, { useEffect, useRef } from "react";

interface GridFirefly {
  x: number;
  y: number;
  phase: number;
  pulseSpeed: number;
  maxOpacity: number;
}

const PixelCascade = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const firefliesRef = useRef<GridFirefly[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const blockSize = 8; // Base size of the square block

    const initGrid = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      // Set internal drawing resolution scaled by display density
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      ctx.resetTransform();
      ctx.scale(dpr, dpr);

      const width = rect.width;
      const height = rect.height;

      const cols = Math.floor(width / blockSize);
      const rows = Math.floor(height / blockSize);
      const list: GridFirefly[] = [];

      for (let r = 0; r < rows; r++) {
        const rowRatio = r / rows;
        // Dither probability curve matching your design template
        const threshold = Math.pow(rowRatio, 1.8);

        for (let c = 0; c < cols; c++) {
          if (Math.random() > threshold) {
            list.push({
              x: c * blockSize,
              y: r * blockSize,
              phase: Math.random() * Math.PI * 2,
              pulseSpeed: Math.random() * 0.02 + 0.01, // Relaxed breathing tempo
              maxOpacity: Math.max(0, 1 - Math.pow(rowRatio, 1.4)),
            });
          }
        }
      }
      firefliesRef.current = list;
    };

    initGrid();

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      
      // 1. Clear the canvas perfectly to maintain transparency instead of filling color
      ctx.clearRect(0, 0, rect.width, rect.height);

      const total = firefliesRef.current.length;
      for (let i = 0; i < total; i++) {
        const f = firefliesRef.current[i];

        f.phase += f.pulseSpeed;

        const rawPulse = Math.sin(f.phase) * 1.6 - 0.4;
        const normalizedPulse = Math.max(0, Math.min(1, rawPulse));
        const dynamicOpacity = normalizedPulse * f.maxOpacity;

        if (dynamicOpacity > 0.01) {
          // 2. Modified color format to match the exact RGB of button color #124be3
          ctx.fillStyle = `rgba(18, 75, 227, ${dynamicOpacity})`;
          
          // Draw with absolute matching dimensions to protect the square aspect ratio
          ctx.fillRect(Math.floor(f.x), Math.floor(f.y), blockSize, blockSize);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      initGrid();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    // Clean, transparent wrapper layout blocks
    <div className="w-full h-[70vh] relative bg-transparent overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block bg-transparent" />
    </div>
  );
};

export default PixelCascade;