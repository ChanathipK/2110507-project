import SignUpPane from "@/components/SignUpPane";
import Image from "next/image";

export default function SignUp() {
    return (
        <div className="h-[calc(100vh-5rem)] sm:h-[calc(100vh-2.5rem)] bg-slate-600 relative">
            <div className="z-20 w-full h-full absolute top-0 left-0">
                <Image 
                className="object-cover blur-[1px]"
                src="/images/travel_view.jpg"
                alt="Travel View (Background Image)"
                fill={true}
                />
            </div>
            <div className="z-30 w-full h-full absolute top-0 left-0 bg-white opacity-40 flex justify-center items-center">
            </div>
            <div className="z-50 w-full h-full flex justify-center items-center overflow-auto">
                <SignUpPane />
            </div>
        </div>
    );
}