"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { processStepss } from "../data/processforcircle";


gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const total = processStepss.length;
  const radius = 260;

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,

        start: "top top",

        end: `+=${total * 800}`,

        scrub: true,

        pin: true,

        onUpdate: (self) => {
          const progress = self.progress;

          const step = Math.min(
            total - 1,
            Math.floor(progress * total)
          );

          setActiveIndex(step);

          const rotation = -(360 / total) * step;

          gsap.to(orbitRef.current, {
            rotate: rotation,
            duration: 0.8,
            ease: "power3.out",
          });
        },
      });
    });

    return () => ctx.revert();
  }, [total]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#111111]"
    >
      <div className="flex h-screen items-center justify-between overflow-hidden px-24">
        {/* LEFT CONTENT */}
        <div className="max-w-xl">
          <div className="mb-6 text-[120px] font-bold leading-none text-[#ff0077]">
            //
          </div>

          <h2 className="mb-8 text-7xl font-semibold tracking-tight text-[#ff0077]">
            {processStepss[activeIndex].title}
          </h2>

          <p className="max-w-lg text-3xl leading-relaxed text-neutral-300">
            // {processStepss[activeIndex].subtext} //
          </p>
        </div>

        {/* RIGHT ORBIT */}
        <div className="relative flex items-center justify-center">
          {/* OUTER CIRCLE */}
          <div className="absolute h-[620px] w-[620px] rounded-full border border-dashed border-white/30" />

          {/* INNER CIRCLE */}
          <div className="absolute h-[320px] w-[320px] rounded-full border border-dashed border-white/30" />

          {/* ACTIVE CAPSULE */}
          <div className="absolute right-[-40px] z-20 flex h-32 w-72 items-center justify-between rounded-full border border-[#ff0077] bg-white/5 px-8 backdrop-blur-xl">
            <span className="text-6xl font-semibold text-white">
              {processStepss[activeIndex].id}
            </span>

            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-black/60">
              <Image
                src={processStepss[activeIndex].logo}
                alt="active-logo"
                width={42}
                height={42}
              />
            </div>
          </div>

          {/* ORBIT CONTAINER */}
          <div className="relative flex h-[620px] w-[620px] items-center justify-center">
  {/* OUTER CIRCLE */}
  <div className="absolute inset-0 rounded-full border border-dashed border-white/30" />

  {/* INNER CIRCLE */}
  <div className="absolute h-[320px] w-[320px] rounded-full border border-dashed border-white/30" />

  {/* ROTATING ORBIT */}
  <div
    ref={orbitRef}
    className="absolute h-full w-full"
  >
    {processStepss.map((item, index) => {
      const angle = (360 / total) * index;

      return (
        <div
          key={item.id}
          className="absolute left-1/2 top-1/2"
          style={{
            transform: `
              rotate(${angle}deg)
              translateY(-310px)
            `,
            transformOrigin: "center center",
          }}
        >
          {/* COUNTER ROTATION */}
          <div
            style={{
              transform: `rotate(${
                -angle + (360 / total) * activeIndex
              }deg)`,
            }}
          >
            <div
              className={`flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-all duration-500 ${
                activeIndex === index
                  ? "bg-black shadow-[0_0_40px_rgba(255,0,119,0.3)]"
                  : "bg-black/80"
              }`}
            >
              <Image
                src={item.logo}
                alt={item.title}
                width={42}
                height={42}
              />
            </div>
          </div>
        </div>
      );
    })}
  </div>
</div>
        </div>
      </div>
    </section>
  );
}