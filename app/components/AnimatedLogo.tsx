// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import { DotLottieReact } from "@lottiefiles/dotlottie-react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// export default function AnimatedLogo() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [dotLottie, setDotLottie] = useState<any>(null);

//   useEffect(() => {
//     if (!dotLottie || !containerRef.current) return;

//     gsap.registerPlugin(ScrollTrigger);

//     const ctx = gsap.context(() => {
//       ScrollTrigger.create({
//         trigger: containerRef.current,
//         start: "top bottom", 
//         end: "bottom bottom", 
//         scrub: 4, // 4-second heavy friction delay for a beautiful, slow draw
//         onUpdate: (self) => {
//           if (dotLottie && dotLottie.totalFrames > 0) {
//             const frame = self.progress * dotLottie.totalFrames;
//             dotLottie.setFrame(frame);
//           }
//         },
//       });
//     });

//     return () => ctx.revert();
//   }, [dotLottie]);

//   return (
//     <div ref={containerRef} className="w-full h-fit flex items-center justify-center md:justify-start">
//       <DotLottieReact
//         src="/lottie/f0.lottie"
//         dotLottieRefCallback={setDotLottie}
//         className="w-full h-auto pointer-events-none"
//       />
//     </div>
//   );
// }

"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AnimatedLogo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoText = "PRINSIUM";

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const letters = gsap.utils.toArray(".prinsium-letter", containerRef.current);

      gsap.fromTo(
        letters,
        {
          y: 100,        
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            end: "bottom bottom",
            scrub: 2, 
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef} 
      // 1. [container-type:inline-size] tells the browser to measure THIS div, not the screen
      className="w-full max-w-[1000px] [container-type:inline-size] mx-auto md:mx-0"
    >
      <div 
        // 2. justify-between forces the letters to stretch exactly from edge to edge!
        className="flex justify-between items-center overflow-hidden w-full"
      >
        {logoText.split("").map((char, index) => (
          <span
            key={index}
            // 3. 13cqi means "13% of the container's width". It scales infinitely up and down!
            className="prinsium-letter inline-block text-[33cqi] text-[#1c4ed8] font-black leading-[0.75] tracking-[-0.08em]"
            style={{
              fontFamily: "'Jersey 10', 'Jersey', sans-serif",
              letterSpacing: "0rem",
              lineHeight: "0.55",
            }}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
}