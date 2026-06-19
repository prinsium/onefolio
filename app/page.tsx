import Hero from "./components/Hero";
import Work from "./components/Work";
import TheProcess from "./components/TheProcess";
import FAQs from "./components/FAQs";
import Services3 from "./components/Services3";

// ==========================================================================
// REUSABLE ARCHITECTURAL NODE (The 45-degree box)
// ==========================================================================
const GridNode = ({ position }: { position: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) => {
  // Using dynamic CSS variables to respect light/dark mode naturally
  const baseClass = `absolute w-2 h-2 bg-primary border border-line rotate-45 z-20 transition-colors duration-300`;
  
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
    // Changed bg-[#121317] to bg-primary
    <main>
    
      <div className="landingPage w-full bg-primary min-h-screen flex flex-col transition-colors duration-300">

        {/* ==========================================
          1. HERO SECTION
          ========================================== */}
      <div className="w-full border-b border-dashed border-line transition-colors duration-300">
        <div className="relative w-auto max-w-[1400px] mx-2 md:mx-2 sm:mx-3 md:mx-4 lg:mx-auto border-x border-dashed border-line transition-colors duration-300">
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
      <div className="w-full border-b border-dashed border-line transition-colors duration-300">
        <div className="relative w-auto max-w-[1400px] mx-2 sm:mx-3 md:mx-4 lg:mx-auto border-x border-dashed border-line transition-colors duration-300">
      
          <div className="w-full h-24 md:h-32 lg:h-[12vh] min-h-[100px]" />
          
          <GridNode position="bottom-left" />
          <GridNode position="bottom-right" />
        </div>
      </div>

      {/* ==========================================
          2. WORK SECTION
          ========================================== */}
      <div className="w-full border-b border-dashed border-line transition-colors duration-300">
        <div className="relative w-auto max-w-[1400px] mx-2 sm:mx-3 md:mx-4 lg:mx-auto border-x border-dashed border-line transition-colors duration-300">
          <Work />
          
          <GridNode position="bottom-left" />
          <GridNode position="bottom-right" />
        </div>
      </div>

      {/* ==========================================
          ARCHITECTURAL SPACER BLOCK
          ========================================== */}
      <div className="w-full border-b border-dashed border-line transition-colors duration-300">
        <div className="relative w-auto max-w-[1400px] mx-2 sm:mx-3 md:mx-4 lg:mx-auto border-x border-dashed border-line transition-colors duration-300">
      
          <div className="w-full h-24 md:h-32 lg:h-[12vh] min-h-[100px]" />
          
          <GridNode position="bottom-left" />
          <GridNode position="bottom-right" />
        </div>
      </div>

      {/* ==========================================
          3. PROCESS SECTION
          ========================================== */}
      <div className="w-full border-b border-dashed border-line transition-colors duration-300">
        <div className="relative w-auto max-w-[1400px] mx-2 sm:mx-3 md:mx-4 lg:mx-auto border-x border-dashed border-line transition-colors duration-300">
          <TheProcess />
          
          <div>
            <Services3 />
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
      <div className="w-full border-b border-dashed border-line transition-colors duration-300">
        <div className="relative w-auto max-w-[1400px] mx-2 sm:mx-3 md:mx-4 lg:mx-auto border-x border-dashed border-line transition-colors duration-300">
      
          <div className="w-full h-24 md:h-32 lg:h-[12vh] min-h-[100px]" />
          
          <GridNode position="bottom-left" />
          <GridNode position="bottom-right" />
        </div>
      </div>

      </div>

    </main>
  );
}