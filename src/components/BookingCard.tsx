"use client"

import { CircularProgress } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

export default function BookingCard({hotelName, hotelAddress, hotelTel, hotelId, bookingDate, checkoutDate, userId, bookingId, sessionId, sessionToken}: {hotelName: string, hotelAddress: string, hotelTel: string, hotelId: string, bookingDate: string, checkoutDate: string, userId: string, bookingId: string, sessionId: string, sessionToken: string}) {

    const displayUserText = (userId == sessionId ? "You": "User");

    const [cardState, setCardState] = useState<number>(0);

    const normalState = (
        <>
            <Link
            className="text-slate-50 text-center text-2xl"
            href={"/hotel/" + hotelId}
            >
                {hotelName}
            </Link>
            <h2 className="text-slate-50 mt-2">{hotelAddress}</h2>
            <p className="text-sm text-slate-50">Tel: {hotelTel}</p>
            <p className="text-xs text-slate-50">Booking Date: {bookingDate}</p>
            <p className="text-xs text-slate-50">Checkout Date: {checkoutDate}</p>
            <p className="text-md text-slate-50 mt-2">From: {displayUserText}</p>
            <Link href={"/booking/" + bookingId} className="w-full text-center mt-6 py-1 bg-slate-200 rounded-md duration-150 hover:bg-slate-700 hover:text-slate-50">Update Booking</Link>
            <button className="w-full text-center mt-2 py-1 bg-red-500 text-slate-50 rounded-md duration-150 hover:bg-red-700" onClick={(e) => {
                e.preventDefault();
                deleteBooking();
            }}>Delete Booking</button>
        </>
    );

    const loading = (
        <div className="w-full h-full flex justify-center items-center">
            <CircularProgress color="warning" />
        </div>
    );

    const deleteFailed = (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <p className="text-slate-50 text-center">Delete booking <span className="text-red-300">failed</span>.</p>
            <p className="text-center text-xs text-slate-50"><button className="text-blue-300" onClick={(e) => {
                e.preventDefault();
                setCardState(0);
            }}>Click here</button> to go back.</p>
        </div>
    );

    async function deleteBooking() {
        if (confirm("Are you really deleting this booking?")) {
            setCardState(1);
            await new Promise((resolve) => {
                setTimeout(resolve, 500);
            });
            const response = await fetch("http://localhost:5000/api/v1/bookings/" + bookingId, {
                method: "DELETE",
                headers: {
                    "authorization": "Bearer " + sessionToken
                }
            });

            if (!response.ok) {
                setCardState(2);
            } else {
                await new Promise((resolve) => {
                    setTimeout(resolve, 2000);
                });
                location.reload();
            }
        }

    }

    return (
        <div className="w-48 min-w-[12rem] mx-4 h-80 bg-slate-500 rounded-lg overflow-hidden my-2 drop-shadow-md duration-150 hover:drop-shadow-lg px-4 py-6 flex flex-col justify-start items-start">
            {
                (cardState == 0) ?
                normalState :
                (cardState == 1) ?
                loading :
                deleteFailed
            }
        </div>
    );
}