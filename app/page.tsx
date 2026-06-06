import Hero from "./components/Hero";
import Work from "./components/Work";
import TheProcess from "./components/TheProcess";
import Footer from "./components/Footer";
import Services from "./components/Services";
import FAQs from "./components/FAQs";

// ==========================================================================
// REUSABLE ARCHITECTURAL NODE (The 45-degree box)
// ==========================================================================
const GridNode = ({ position, theme = "dark" }: { position: "top-left" | "top-right" | "bottom-left" | "bottom-right", theme?: "dark" | "light" }) => {
  // If we are in the dark section, use dark colors. If in the footer (white bg), use light colors.
  const bg = theme === "dark" ? "bg-[#121317]" : "bg-white";
  const border = theme === "dark" ? "border-[#343539]" : "border-zinc-200";
  
  const baseClass = `absolute w-2 h-2 ${bg} border ${border} rotate-45 z-20`;
  
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
    // CRITICAL FIX: Removed overflow-x-hidden from main to allow sticky and scrolltrigger to work perfectly
    <main className="w-full bg-[#121317] min-h-screen flex flex-col">
      
      {/* ==========================================
          1. HERO SECTION
          ========================================== */}
      <div className="w-full border-y border-dashed border-[#343539]">
        <div className="relative w-full max-w-[1400px] mx-2 md:mx-2 sm:mx-3 md:mx-4 lg:mx-auto border-x border-dashed border-[#343539]">
          <GridNode position="top-left" />
          <GridNode position="top-right" />
          
          <Hero />
          
          <GridNode position="bottom-left" />
          <GridNode position="bottom-right" />
        </div>
      </div>

      {/* ==========================================
          ARCHITECTURAL SPACER BLOCK
          ========================================== */}
      <div className="w-full border-b border-dashed border-[#343539]">
        <div className="relative w-full max-w-[1400px] mx-2 sm:mx-3 md:mx-4 lg:mx-auto border-x border-dashed border-[#343539]">
      
          <div className="w-full h-24 md:h-32 lg:h-[15vh] min-h-[144px]" />
          
          <GridNode position="bottom-left" />
          <GridNode position="bottom-right" />
        </div>
      </div>

      {/* ==========================================
          2. WORK SECTION
          ========================================== */}
      <div className="w-full border-b border-dashed border-[#343539]">
        <div className="relative w-full max-w-[1400px] mx-2 sm:mx-3 md:mx-4 lg:mx-auto border-x border-dashed border-[#343539]">
          <Work />
          
          <GridNode position="bottom-left" />
          <GridNode position="bottom-right" />
        </div>
      </div>

      {/* ==========================================
          ARCHITECTURAL SPACER BLOCK
          ========================================== */}
      <div className="w-full border-b border-dashed border-[#343539]">
        <div className="relative w-full max-w-[1400px] mx-2 sm:mx-3 md:mx-4 lg:mx-auto border-x border-dashed border-[#343539]">
      
          <div className="w-full h-24 md:h-32 lg:h-[12vh] min-h-[100px]" />
          
          <GridNode position="bottom-left" />
          <GridNode position="bottom-right" />
        </div>
      </div>

      {/* ==========================================
          3. PROCESS SECTION
          ========================================== */}
      <div className="w-full border-b border-dashed border-[#343539]">
        <div className="relative w-full max-w-[1400px] mx-2 sm:mx-3 md:mx-4 lg:mx-auto border-x border-dashed border-[#343539]">
          <TheProcess />
          
          <div>
          <Services />
        </div>

        <div>
          <FAQs />
        </div>

          <GridNode position="bottom-left" />
          <GridNode position="bottom-right" />
        </div>
      </div>

      {/* ==========================================
          ARCHITECTURAL SPACER BLOCK
          ========================================== */}
      <div className="w-full border-b border-dashed border-[#343539]">
        <div className="relative w-full max-w-[1400px] mx-2 sm:mx-3 md:mx-4 lg:mx-auto border-x border-dashed border-[#343539]">
      
          <div className="w-full h-24 md:h-32 lg:h-[12vh] min-h-[100px]" />
          
          <GridNode position="bottom-left" />
          <GridNode position="bottom-right" />
        </div>
      </div>

      {/* ==========================================
          4. FOOTER SECTION
          ========================================== */}
      <div className="w-full bg-white"> 
        <div className="relative w-auto max-w-[1400px] mx-2 sm:mx-3 md:mx-4 lg:mx-auto border-x border-dashed border-zinc-200">
          
           <div className="absolute top-0 left-0 w-2 h-2 bg-[#121426] rotate-45 -translate-x-1/2 -translate-y-1/2 z-20" />
          <div className="absolute top-0 right-0 w-2 h-2 bg-[#121426] rotate-45 translate-x-1/2 -translate-y-1/2 z-20" />
          

          <Footer />
          
        </div>
      </div>

    </main>
  );
}