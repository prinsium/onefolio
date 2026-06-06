"use client";

import React, { useEffect, useRef } from "react";

export default function MatrixCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const dpr = window.devicePixelRatio || 1;
    const dotRadius = 11;
    const gap = 34;

    let cols = 0;
    let rows = 0;

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.resetTransform();
      ctx.scale(dpr, dpr);
      cols = Math.floor(rect.width / gap);
      rows = Math.floor(rect.height / gap);
    };

    resizeCanvas();

    const drawMatrix = () => {
      const rect = container.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const offsetX = (rect.width - (cols - 1) * gap) / 2;
      const offsetY = (rect.height - (rows - 1) * gap) / 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = offsetX + c * gap;
          const y = offsetY + r * gap;

          const dx = mouseRef.current.x - x;
          const dy = mouseRef.current.y - y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          const maxInfluence = 160;
          let scaleFactor = 1;

          if (distance < maxInfluence) {
            const progress = (maxInfluence - distance) / maxInfluence;
            scaleFactor = 1 - progress * 0.4;
          }

          ctx.beginPath();
          ctx.arc(x, y, dotRadius * scaleFactor, 0, Math.PI * 2);
          ctx.fillStyle = distance < maxInfluence ? "#cccccc" : "#e5e5e5";
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(drawMatrix);
    };

    drawMatrix();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", resizeCanvas);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <canvas ref={canvasRef} className="w-full h-full block pointer-events-none" />
    </div>
  );
}