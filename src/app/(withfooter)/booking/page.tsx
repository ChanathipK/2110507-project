import { getServerSession } from "next-auth";
import Link from "next/link";
import { BookingList } from "../../../../interfaces";
import BookingCard from "@/components/BookingCard";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Booking() {

    const session = await getServerSession(authOptions);
    const isLoggedIn = (session != null);


    if (isLoggedIn) {
        const response = await fetch("http://localhost:5000/api/v1/bookings", {
            headers: {
                "authorization": "Bearer " + session.user.token,
            }
        });

        if (!response.ok) {
            return (
                <div className="min-h-[calc(100vh-2.5rem-9rem)] flex justify-center items-center">
                    <h1>Failed to fetch bookings.</h1>
                    <h2><button>Click here</button> to try again.</h2>
                </div>
            );
        } else {
            const bookingList: BookingList = await response.json();
            let bookingNodes: React.ReactNode[];
            if (bookingList.count != 0) {
                bookingNodes = bookingList.data.map((booking) => {
                    return (
                        <BookingCard key={booking._id} hotelName={booking.hotel.name} hotelAddress={booking.hotel.address} hotelTel={booking.hotel.tel} hotelId={booking.hotel._id} bookingDate={booking.bookingDate.slice(0,10)} checkoutDate={booking.checkoutDate.slice(0,10)} userId={booking.user._id} bookingId={booking._id} sessionId={session.user._id} sessionToken={session.user.token} />
                    );
                });
            } else {
                bookingNodes = [
                    <></>
                ]
            }

            const forUser = (
                <div className="min-h-[calc(100vh-2.5rem-9rem)] w-full bg-slate-50 flex flex-wrap justify-center items-center justify-items-start py-4">
                    {bookingNodes}
                </div>
            );
            return (
                <div className="min-h-[calc(100vh-2.5rem-9rem)]">
                    {forUser}
                </div>
            );
        }
    } else {
        const forGuest = (
            <div className="w-full h-full min-h-[calc(100vh-2.5rem-9rem)] flex justify-center items-center">
                <h1 className="text-2xl">You need to <Link className="text-blue-500" href="/api/auth/signin">log in</Link> to see the bookings.</h1>
            </div>
        );

        return (
            <div className="min-h-[calc(100vh-2.5rem-9rem)]">
                {forGuest}
            </div>
        );
    }
}