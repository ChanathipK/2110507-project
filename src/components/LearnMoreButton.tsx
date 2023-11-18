"use client"

export default function LearnMoreButton() {
    return (
        <div className="flex items-center justify-center w-full text-center mb-12 mt-20">
            <div className="px-6 py-2 w-48 rounded-md bg-amber-600 text-xl text-white drop-shadow-md duration-100 hover:dropshadow-lg hover:cursor-pointer" onClick={()=>{
                window.scroll(0, 640);
            }}>Learn More</div>
      </div>
    );
}