import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./components/ThemeProvider";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PRINSIUM",
  description: "Design, Build, Automate.",
};

// ==========================================================================
// REUSABLE ARCHITECTURAL NODE (The 45-degree box)
// ==========================================================================
const GridNode = ({ position }: { position: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) => {
  // Using dynamic CSS variables so it flips automatically with the theme
  const baseClass = `absolute w-2 h-2 bg-primary border border-line rotate-45 z-20 transition-colors duration-300`;
  
  const positions = {
    "top-left": "top-0 left-0 -translate-x-1/2 -translate-y-1/2",
    "top-right": "top-0 right-0 translate-x-1/2 -translate-y-1/2",
    "bottom-left": "bottom-0 left-0 -translate-x-1/2 translate-y-1/2",
    "bottom-right": "bottom-0 right-0 translate-x-1/2 translate-y-1/2",
  };

  return <div className={`${baseClass} ${positions[position]}`} />;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
   return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`} suppressHydrationWarning>
       <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&family=Jersey+10&family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet"></link>
     </head>
      <body className="w-full min-h-full flex flex-col text-main transition-colors duration-300">
        
        {/* ADD THE THEME PROVIDER HERE */}
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          
          {/* Your exact existing layout code stays untouched */}
          <div className="fixed top-0 w-full border-y border-dashed border-line z-50 transition-colors duration-300">
             <div className="relative w-auto max-w-[1400px] mx-2 md:mx-2 sm:mx-3 md:mx-4 lg:mx-auto border-x border-line">
                  <GridNode position="top-left" />
                  <GridNode position="top-right" />
                  
                  <Navbar />
                  
                  <GridNode position="bottom-left" />
                  <GridNode position="bottom-right" />
                </div>
          </div>
          {children}


          <div className="outFooter w-full transition-colors duration-300"> 
        <div className="relative w-auto max-w-[1400px] mx-2 sm:mx-3 md:mx-4 lg:mx-auto border-x border-dashed border-[#FBFBFC] transition-colors duration-300">
          
          <div className="absolute top-0 left-0 w-2 h-2 bg-primary border border-line rotate-45 -translate-x-1/2 -translate-y-1/2 z-20 transition-colors duration-300" />
          <div className="absolute top-0 right-0 w-2 h-2 bg-primary border border-line rotate-45 translate-x-1/2 -translate-y-1/2 z-20 transition-colors duration-300" />

          <Footer />
          
        </div>
      </div>

        </ThemeProvider>
        
      </body>
    </html>
  );
}