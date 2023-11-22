import CreateHotelPane from "@/components/CreateHotelPane";
import Link from "next/link";

export default function CreateHotel() {
    return (
        <div className="h-[calc(100vh-5rem)] sm:h-[calc(100vh-2.5rem)] w-full bg-white">
            <div className="w-full h-full overflow-auto flex justify-center items-center">
                    <CreateHotelPane />
            </div>
        </div>
    );
}