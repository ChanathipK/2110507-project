"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react";
import Link from "next/link";
import getUserData from "@/libs/getUserData";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Booking, BookingList } from "../../../../../../interfaces";

export default function BookingId({params,}: {params: {bookingid: string, hotelid: string}}) {

    const {data: userSession, status} = useSession();

    const [updatePaneState, setUpdatePaneState] = useState<number>(0);

    const [startDate, setStartDate] = useState<Dayjs|null>(null);
    const [endDate, setEndDate] = useState<Dayjs|null>(null);

    const router = useRouter();

    // 0 = normal
    // 1 = loading
    // 2 = success
    // 3 = fail

    async function updateBooking() {

        setUpdatePaneState(1);
        const listResponse = await fetch("http://localhost:5000/api/v1/bookings", {
            headers: {
                "authorization": "Bearer " + userSession!.user.token,
            }
        });


        if (!listResponse.ok) {
            setUpdatePaneState(3);
        } else {

            const bookingList: BookingList = await listResponse.json();

            let isUpdatable = true;

            for (let i = 0; i < bookingList.count; i++) {
                if (
                    params.hotelid == bookingList.data[i].hotel.id &&
                    userSession?.user._id == bookingList.data[i].user._id &&
                    (
                        (
                            (startDate?.format("YYYY-MM-DD")!) <= bookingList.data[i].bookingDate.slice(0, 10) &&
                            (endDate?.format("YYYY-MM-DD")!) >= bookingList.data[i].bookingDate.slice(0, 10)
                        ) ||
                        (
                            (startDate?.format("YYYY-MM-DD")!) <= bookingList.data[i].checkoutDate.slice(0, 10) && 
                            (endDate?.format("YYYY-MM-DD")!) >= bookingList.data[i].checkoutDate.slice(0, 10)
                        )
                    )
                ) {
                    isUpdatable = false;
                    break;
                }
            }

            if (isUpdatable) {

                const updateResponse = await fetch("http://localhost:5000/api/v1/bookings/" + params.bookingid, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": "Bearer " + userSession!.user.token,
                    },
                    body: JSON.stringify({
                        bookingDate: startDate!.format("YYYY-MM-DD"),
                        checkoutDate: endDate!.format("YYYY-MM-DD"),
                        // createdAt: dayjs().format("YYYY-MM-DD")
                    })
                });

                if (!updateResponse.ok) {
                    setUpdatePaneState(3);
                    await new Promise((resolve) => {
                        setTimeout(resolve, 1000);
                    });
                    location.reload();
                } else {
                    console.log(await updateResponse.json());
                    setUpdatePaneState(2);
                    await new Promise((resolve) => {
                        setTimeout(resolve, 1000);
                    });
                    // router.push("/booking");
                }

            } else {
                setUpdatePaneState(3);
                await new Promise((resolve) => {
                    setTimeout(resolve, 100);
                });
            }
        }
        
    }

    if (status == "unauthenticated" || status == "loading") {
        return (
            <div className="min-h-[calc(100vh-2.5rem-9rem)] flex flex-col justify-center items-center">
                <h1 className="text-2xl">You need to login to see hotels information.</h1>
                <h2 className="mt-2"><Link className="text-blue-600" href="/api/auth/signin">Click here</Link> to log in.</h2>
            </div>
        );
    } else {



        const loading = (
            <div className="bg-slate-500 w-96 h-[400px] flex justify-center items-center rounded-lg">
                <CircularProgress color="warning" />
            </div>
        );

        const updateSuccess = (
            <div className="bg-slate-500 w-96 h-[400px] flex flex-col justify-center items-center rounded-lg">
                <h1 className="text-xl text-slate-50 text-center">Update booking <span className="text-green-200">successfully.</span></h1>
            </div>
        );

        const updateFail = (
            <div className="bg-slate-500 w-96 h-[400px] flex flex-col justify-center items-center rounded-lg">
                <h1 className="text-xl text-slate-50 text-center">Update booking <span className="text-red-300">failed.</span></h1>
            </div>
        );



        const updateNormal = (
            <div className="w-96 h-[400px] px-4 py-6 bg-slate-500 rounded-lg">
                <h1 className="text-slate-50 text-2xl text-center">Update Booking</h1>
                <h2 className="text-slate-50 text-lg mt-2 text-center">Booking ID: {params.bookingid}</h2>
                <form className="flex flex-col justify-center items-center">
                    <label className="text-slate-50 mt-2">Booking Date</label>
                    <div className="bg-slate-50 px-4 py-2 rounded-md">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker label="Start Date" value={startDate} onChange={(value) => {
                                setStartDate(value);
                            }} />
                        </LocalizationProvider>
                    </div>
                    <label className="text-slate-50 mt-2">Checkout Date</label>
                    <div className="bg-slate-50 px-4 py-2 rounded-md">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker label="Checkout Date" value={endDate} onChange={(value) => {
                                setEndDate(value);
                            }} />
                        </LocalizationProvider>
                    </div>
                    <input className="px-4 py-1 mt-4 bg-orange-200 rounded duration-150 hover:bg-orange-300 hover:cursor-pointer" type="submit" value="Update" onClick={(e) => {
                        e.preventDefault();
                        if (startDate != null && endDate != null &&
                            Math.abs(startDate.diff(endDate, "day")) <= 3 &&
                            endDate.diff(startDate, "day") > 0
                        ) {
                            updateBooking();
                        }
                    }} />
                </form>
            </div>
        );

        // 0 = normal
        // 1 = loading
        // 2 = success
        // 3 = fail

        return (
            <div className="min-h-[calc(100vh-2.5rem-9rem)] h-[calc(100vh-2.5rem-9rem)] flex flex-col justify-center items-center">
                {
                    (updatePaneState == 0) ?
                    updateNormal :
                    (updatePaneState == 1) ?
                    loading :
                    (updatePaneState == 2) ?
                    updateSuccess :
                    updateFail
                }
            </div>
        );
    }
}