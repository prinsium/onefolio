export default function Services() {
  return (
    <div className="w-full h-full flex flex-col pb-32 px-6 md:px-12 items-center justify-center gap-12 lg:gap-16 ">
        <div className="w-full flex items-center justify-center">
            <h3 className="text-4xl font-bold text-white">Whether you want</h3>
        </div>
        
        <div className="w-full h-fit flex flex-row items-center justify-center gap-12 lg:gap-16 ">
            <div className="w-[200px] h-[200px] bg-[#000000]"></div>
             <div className="w-[200px] h-[200px] bg-[#000000]"></div>
              <div className="w-[200px] h-[200px] bg-[#000000]"></div>
               <div className="w-[200px] h-[200px] bg-[#000000]"></div>
        </div>
    </div>
  )
}