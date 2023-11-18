import Image from "next/image";

export default function HomeBanner() {
    return (
        <div className="flex flex-col mt-12 w-full px-2 items-center sm:px-4 md:px-8 md:flex-row">
            <h1 className="text-3xl text-center w-full mb-8 md:w-1/3 md:text-[2rem] lg:text-5xl lg:w-1/3">Hotel Booking Website</h1>
            <div className="w-full relative h-[300px] sm:h-[400px] md:w-2/3 lg:w-2/3 lg:h-[500px]">
                <Image 
                src="/images/hotel_image_1.jpg"
                alt="Hotel"
                className="object-cover w-full md:rounded-lg"
                fill={true}
                />
            </div>
        </div>
    );
}