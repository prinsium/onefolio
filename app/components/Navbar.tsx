"use client";

import React, { useState, useEffect } from "react";


import Link from "next/link";
import { social } from "../data/socialLinks";
import { motion } from "framer-motion";
import Image from "next/image";

const visibleSocials = ["Contra"];

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState("");
  const [isDark, setIsDark] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // ==========================================================================
  // 1. LIVE TIMER & HYDRATION FIX
  // ==========================================================================
  useEffect(() => {
    setMounted(true); // Prevents Next.js hydration errors

    const updateClock = () => {
      const now = new Date();
      // Enforcing IST for your exact local time
      const timeString = now.toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setTime(timeString);
    };

    updateClock(); // Set immediately
    const intervalId = setInterval(updateClock, 1000); // Update every second

    return () => clearInterval(intervalId);
  }, []);

  // ==========================================================================
  // 2. FULLSCREEN TOGGLE API
  // ==========================================================================
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  // ==========================================================================
  // 3. THEME TOGGLE (Vanilla Setup)
  // ==========================================================================
  const toggleTheme = () => {
    setIsDark(!isDark);
    // If you are using next-themes, you would call setTheme('light'/'dark') here.
    // For pure Tailwind, we toggle the class on the HTML root:
    if (isDark) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };


    const filteredSocials = social.filter((item) => visibleSocials.includes(item.title));

  return (
    <nav className="w-full max-w-[1400px] h-[60px] bg-[#1a1a1a]/80 backdrop-blur-md border-t border-[#343539] px-4 md:px-8 flex items-center justify-between font-mono select-none">
      
      {/* ==========================================
          LEFT SIDE: Pulsing Block & Timer
          ========================================== */}
      <div className="flex items-center gap-4">
        
        {/* The 1-Second Pulsing Square */}
        <motion.div
          animate={{ backgroundColor: ["#2563eb", "#ffffff", "#2563eb"] }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-3.5 h-3.5 rounded-[2px] shadow-[0_0_8px_rgba(37,99,235,0.5)]"
        />

        {/* The Live Clock */}
        <div className="flex items-baseline gap-2">
          <span className="text-xs md:text-sm font-bold tracking-widest text-neutral-400 uppercase">
            Local Time
          </span>
          {/* We only render the time AFTER mounting to prevent Next.js server errors */}
          <span className="text-sm md:text-base font-medium text-white tracking-tight w-fit">
            {mounted ? time : "--:--:-- --"}
          </span>
        </div>
      </div>

      {/* ==========================================
          RIGHT SIDE: Utility Toggles
          ========================================== */}
      <div className="flex items-center gap-2 md:gap-4">

        {/* Contra */}
        <button
          className="p-2 transition-colors duration-200 rounded-md hover:bg-white/5"
          aria-label="Contra"
        >
          {filteredSocials.map((item) => (
              <a key={item.id} href={item.link} target="_blank" rel="noopener noreferrer" className="mx-[1px] transition-colors duration-200">
                <Image src="/work/contra.svg" alt="Contra" width={18} height={18} className="inline-block" />
              </a>
            ))}
        </button>
        
        {/* Dark/Light Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 text-neutral-400 hover:text-white transition-colors duration-200 rounded-md hover:bg-white/5"
          aria-label="Toggle Theme"
        >
          {isDark ? (
            // Sun Icon (Switch to Light)
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
            </svg>
          ) : (
            // Moon Icon (Switch to Dark)
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
            </svg>
          )}
        </button>

        {/* Fullscreen Toggle */}
        <button
          onClick={toggleFullscreen}
          className="p-2 text-neutral-400 hover:text-white transition-colors duration-200 rounded-md hover:bg-white/5"
          aria-label="Toggle Fullscreen"
        >
          {isFullscreen ? (
            // Minimize Icon
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" />
            </svg>
          ) : (
            // Maximize Icon
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0 5.25 5.25M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0 5.25-5.25M20.25 3.75h-4.5m4.5 0v4.5m0-4.5-5.25 5.25M20.25 20.25h-4.5m4.5 0v-4.5m0 4.5-5.25-5.25" />
            </svg>
          )}
        </button>

      </div>
    </nav>
  );
}