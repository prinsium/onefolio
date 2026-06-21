import PixelCascade from "./PixelCascade";

export default function Hero() {
  return (
    <>
    <PixelCascade />
    <div className="w-full h-full px-2 md:px-4 lg:px-8 py-2 pb-2 md:pb-4 lg:pb-18 flex flex-col md:flex-row gap-4 md:gap-0 md:justify-between items-end">
      <div className="w-full h-full flex flex-col items-center md:items-start justify-center text-white">
        <h1 className="text-4xl font-bold mb-3 text-center md:text-start">Clarity first. Built to perform.</h1>
        <h3 className="hidden md:block text-muted">
          PRINSIUM — independent developer delivering fast, reliable websites with clarity and precision.
        </h3>

        <h3 className="md:hidden text-muted flex text-center">
          PRINSIUM — independent developer delivering fast, reliable websites with clarity and precision.
        </h3>
      </div>

      <div className="w-full md:w-auto flex items-center justify-center md:justify-end">
        {/* Action Button */}
        <button className="flex items-center bg-brand hover:bg-brand-hover text-white border border-[#1d57f0] p-1 md:p-2 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-2xl md:rounded-tl-xl md:rounded-tr-xl md:rounded-bl-xl md:rounded-br-[24px] transition-all duration-300 shadow-lg font-medium tracking-wide w-fit group overflow-hidden">
          
          {/* Smooth Left SVG Wrapper */}
          <div className="transition-all duration-300 ease-in-out max-w-[50px] opacity-100 scale-100 mr-1 md:mr-3 group-hover:max-w-0 group-hover:opacity-0 group-hover:scale-50 group-hover:mr-0 overflow-hidden">
            <div className="bg-white/10 p-2.5 rounded-xl md:rounded-lg flex items-center justify-center">
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
          <span className="text-lg md:text-xl uppercase font-semibold tracking-wider select-none px-1">
            CONTACT
          </span>

          {/* Smooth Right SVG Wrapper */}
          <div className="transition-all duration-300 ease-in-out max-w-0 opacity-0 scale-50 ml-0 group-hover:max-w-[50px] group-hover:opacity-100 group-hover:scale-100 group-hover:ml-1 group-hover:md:ml-3 overflow-hidden">
            <div className="bg-white/10 p-2.5 rounded-tl-xl rounded-tr-xl rounded-bl-xl rounded-br-xl md:rounded-br-2xl flex items-center justify-center">
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
    </>
  );
}