import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

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


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
   return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Jersey+10&family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet"></link>
      </head>
      <body className="min-h-full flex flex-col">
        <div className="fixed top-0 w-full border-y border-dashed border-[#343539] z-10">
                <div className="relative w-auto max-w-[1400px] mx-2 md:mx-2 sm:mx-3 md:mx-4 lg:mx-auto border-x border-dashed border-[#343539]">
                  <GridNode position="top-left" />
                  <GridNode position="top-right" />
                  
                  <Navbar />
                  
                  <GridNode position="bottom-left" />
                  <GridNode position="bottom-right" />
                </div>
              </div>
              {children}</body>
    </html>
  );
}
