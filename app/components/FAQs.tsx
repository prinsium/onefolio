"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// Make sure this path exactly matches where you saved your data
import { faqs } from "@/app/data/faq"; 

export default function FAQs() {
  // Track which accordion is open. Set to null so they all start closed, 
  // or set to faqs[0].id to have the first one open by default.
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="relative w-full text-main py-32 px-6 md:px-12 font-space">
      
      {/* CRITICAL: No 'items-start' here! 
        This allows the left column to stretch to the exact height of the right column, 
        creating the perfect elevator track for the sticky card.
      */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-center gap-12 lg:gap-16 relative w-full">
        
        {/* ==========================================
            LEFT COLUMN: Sticky Contact Card
            ========================================== */}
        <div className="w-full lg:w-1/3 relative mb-12 lg:mb-0">
          
          {/* The Sticky Wrapper */}
          <div className="sticky top-[12vh] z-10 w-full">
            
            {/* The Card Body */}
            <div className="bg-surface rounded-tl-[52px] rounded-tr-xl rounded-bl-xl rounded-br-[32px] flex flex-col justify-between overflow-hidden shadow-lg border border-line">
              
              <div className="p-4 pb-20">
                {/* Gray Placeholder Circle */}
                <div className="w-24 h-24 bg-[#d9d9d9] rounded-full mb-16" />
                <h3 className="text-3xl text-white tracking-wide">
                  Just say, hi
                </h3>
              </div>

              {/* Blue Contact Button Block */}
              <div>
        {/* Action Button */}
        <button className="flex items-center bg-brand hover:bg-brand-hover text-white border border-[#1d57f0] text-main p-3 rounded-tl-xl rounded-tr-xl rounded-bl-xl rounded-br-[28px] transition-all duration-300 shadow-lg font-medium tracking-wide w-full group overflow-hidden">
          
          {/* Smooth Left SVG Wrapper */}
          <div className="transition-all duration-300 ease-in-out max-w-[50px] opacity-100 scale-100 mr-4 group-hover:max-w-0 group-hover:opacity-0 group-hover:scale-50 group-hover:mr-0 overflow-hidden">
            <div className="bg-white/10 p-2.5 rounded-lg flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.8"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </div>
          </div>

          {/* Text Container */}
          <span className="text-xl md:text-2xl uppercase font-semibold tracking-wider select-none px-1">
            CONTACT
          </span>

          {/* Smooth Right SVG Wrapper */}
          <div className="transition-all duration-300 ease-in-out max-w-0 opacity-0 scale-50 ml-0 group-hover:max-w-[50px] group-hover:opacity-100 group-hover:scale-100 group-hover:ml-4 overflow-hidden">
            <div className="bg-white/10 p-2.5 rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-2xl flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.8"
                stroke="currentColor"
                className="w-6 h-6 group-hover:translate-x-0.5 transition-transform duration-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </div>
          </div>

        </button>
      </div>
              
            </div>
          </div>
        </div>

        {/* ==========================================
            RIGHT COLUMN: The FAQ Accordions
            ========================================== */}
        <div className="w-full lg:w-2/3 flex flex-col gap-3">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                onClick={() => toggleFaq(faq.id)}
                className="bg-surface border border-line rounded-xl overflow-hidden cursor-pointer transition-colors duration-300"
              >
                {/* Question Header */}
                <div className="p-6 md:p-8 flex justify-between items-center gap-6">
                  <h5 className={`text-lg md:text-xl font-bold tracking-tight transition-colors duration-300 ${isOpen ? "text-main" : "text-muted"}`}>
                    {faq.question}
                  </h5>

                  {/* Plus / Minus Icon */}
                  <div className="shrink-0 relative w-6 h-6 flex items-center justify-center text-muted">
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0, opacity: isOpen ? 0 : 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </motion.div>
                    <motion.div
                      animate={{ rotate: isOpen ? 0 : -180, opacity: isOpen ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                      </svg>
                    </motion.div>
                  </div>
                </div>

                {/* Answer Body (Framer Motion Expand) */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: "spring", duration: 0.5, bounce: 0 }}
                    >
                      <div className="px-6 md:px-8 pb-8 text-muted text-base md:text-lg leading-relaxed">
                        {faq.answer}
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