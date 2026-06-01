import Hero from "./components/Hero";
import Work from "./components/Work";
import TheProcess from "./components/TheProcess";
import Footer from "./components/Footer";

// ==========================================================================
// REUSABLE ARCHITECTURAL NODE (The 45-degree box)
// ==========================================================================
const GridNode = ({ position }: { position: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) => {
  // bg-[#121317] makes the inside match the background. 
  // Change to bg-white or bg-[#343539] if you want them to be solid filled blocks.
  const baseClass = "absolute w-2 h-2 bg-[#121317] border border-[#343539] rotate-45 z-20";
  
  // These translates ensure the exact absolute center of the diamond sits on the 1px line intersection
  const positions = {
    "top-left": "top-0 left-0 -translate-x-1/2 -translate-y-1/2",
    "top-right": "top-0 right-0 translate-x-1/2 -translate-y-1/2",
    "bottom-left": "bottom-0 left-0 -translate-x-1/2 translate-y-1/2",
    "bottom-right": "bottom-0 right-0 translate-x-1/2 translate-y-1/2",
  };

  return <div className={`${baseClass} ${positions[position]}`} />;
};

export default function Home() {
  return (
    <main className="w-full bg-[#121317] min-h-screen flex flex-col overflow-x-hidden">
      
      {/* ==========================================
          1. HERO SECTION (Includes top & bottom border)
          ========================================== */}
      <div className="w-full border-y border-dashed border-[#343539]">
        <div className="relative w-full max-w-[1400px] mx-auto border-x border-dashed border-[#343539]">
          
          {/* Top Nodes */}
          <GridNode position="top-left" />
          <GridNode position="top-right" />
          
          <Hero />
          
          {/* Bottom Nodes */}
          <GridNode position="bottom-left" />
          <GridNode position="bottom-right" />
          
        </div>
      </div>

      {/* ==========================================
          2. WORK SECTION
          ========================================== */}
      {/* Removed border-t here since Hero already provides the line above it */}
      <div className="w-full border-b border-dashed border-[#343539]">
        <div className="relative w-full max-w-[1400px] mx-auto border-x border-dashed border-[#343539]">
          
          <Work />
          
          {/* Bottom Nodes */}
          <GridNode position="bottom-left" />
          <GridNode position="bottom-right" />

        </div>
      </div>

      {/* ==========================================
          3. PROCESS SECTION
          ========================================== */}
      <div className="w-full border-b border-dashed border-[#343539]">
        <div className="relative w-full max-w-[1400px] mx-auto border-x border-dashed border-[#343539]">
          
          <TheProcess />
          
          {/* Bottom Nodes */}
          <GridNode position="bottom-left" />
          <GridNode position="bottom-right" />

        </div>
      </div>

      {/* ==========================================
          4. FOOTER SECTION (Full Bleed Background)
          ========================================== */}
      <div className="w-full bg-white"> 
        <div className="relative w-full max-w-[1400px] mx-auto border-x border-dashed border-zinc-200">
          
          {/* Optional: If you want the nodes to continue into the footer using the footer's theme,
            you can add them here manually with updated border colors!
          */}
          <div className="absolute top-0 left-0 w-2 h-2 bg-[#1e3a8a] border border-white/20 rotate-45 -translate-x-1/2 -translate-y-1/2 z-20" />
          <div className="absolute top-0 right-0 w-2 h-2 bg-[#1e3a8a] border border-white/20 rotate-45 translate-x-1/2 -translate-y-1/2 z-20" />

          <Footer />
          
        </div>
      </div>

    </main>
  );
}