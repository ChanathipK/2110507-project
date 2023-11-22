import Card from "@/components/Card";
import getHotels from "@/libs/getHotels";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { HotelList } from "../../../../interfaces";

export default async function Booking() {

    const session = await getServerSession();


    const isLoggedIn = (session != null);

    const hotels: HotelList = await getHotels();
    let hotelList: React.ReactNode[];
    if (hotels != null) {
        hotelList = hotels.data.map((hotel) => {
            return (
                <Card key={hotel.name} name={hotel.name} address={hotel.address} district={hotel.district} province={hotel.province} postalcode={hotel.postalcode} tel={hotel.tel} id={hotel.id} imagePath={hotel.picture} />
            );
        })
    } else {
        hotelList = [<div></div>]
    }


    const notLoggedIn = (
        <div className="w-full h-[calc(100vh-2.5rem-9rem)] flex flex-col justify-center items-center">
            <h1 className="text-3xl text-center">You have to log in to see all hotels.</h1>
            <div className="flex text-xl mt-4">
                <Link className="text-blue-500 me-2" href="/">
                    Click Here
                </Link>
                <h2>to log in</h2>
            </div>
            <div className="text-sm mb-4">Or simply <Link className="text-blue-500" href="/signup">Sign up</Link></div>
        </div>
    );

    const loggedIn = (
        <div className="min-h-[calc(100vh-2.5rem-9rem)] w-full bg-slate-50 flex flex-wrap justify-center items-center justify-items-start py-4">
            {
                (hotels != null) ?
                hotelList :
                <div></div>
            }
        </div>
    );

    return (
        <div className="min-h-[calc(100vh-2.5rem-9rem)]">
            {
                isLoggedIn?
                loggedIn
                :
                notLoggedIn
            }
        </div>
    );
}

// h-[calc(100vh-5rem-400px)] sm:h-[calc(100vh-2.5rem-300px)] md:h-[calc(100vh-2.5rem-9rem)]