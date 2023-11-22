"use client"

import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import Image from "next/image";
import { BookingList, Hotel } from "../../../../../interfaces";
import { useSession } from "next-auth/react";
import getUserData from "@/libs/getUserData";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { Dayjs } from "dayjs";
import UpdateHotelPane from "@/components/UpdateHotelPane";
import DeleteHotelButton from "@/components/DeleteHotelButton";
import Link from "next/link";

export default function HotelId({ params }: { params: {id: string} }) {

    const {data: userSession, status} = useSession();

    if (status == "unauthenticated") {
        return (
            <div className="min-h-[calc(100vh-2.5rem-9rem)] flex flex-col justify-center items-center">
                <h1 className="text-2xl">You need to login to see hotels information.</h1>
                <h2 className="mt-2"><Link className="text-blue-600" href="/api/auth/signin">Click here</Link> to log in.</h2>
            </div>
        );
    }

    const [userRole, setUserRole] = useState("user");

    // state:
    // loading: 0
    // showing: 1
    // book success: 2
    // book failed: 3
    // hotel not found

    const [infoState, setInfoState] = useState<number>(0);

    // fetching data and set role

    const [hotelName, setHotelName] = useState<string>("Loading");
    const [address, setAddress] = useState<string>("Loading");
    const [district, setDistrict] = useState<string>("Loading");
    const [province, setProvince] = useState<string>("Loading");
    const [postalcode, setPostalcode] = useState<string>("Loading");
    const [tel, setTel] = useState<string>("Loading");
    const [imagePath, setImagePath] = useState<string>("");

    const hotelNotFound = (
        <div className="bg-slate-200 h-[28rem] w-[840px] rounded-lg flex flex-col justify-center items-center">
            <h1 className="text-2xl">Hotel is not found</h1>
            <h2><Link className="text-blue-500" href="/hotel">Click here</Link> to go back to hotel section.</h2>
        </div>
    );

    async function getHotelInfo() {

        await new Promise((resolve) => {
            setTimeout(resolve, 700);
        })

        const response = await fetch("http://localhost:5000/api/v1/hotels/" + params.id);

        if (!response.ok) {
            setInfoState(4);
        } else {
            const hotelInfo: Hotel = (await response.json()).data;
            setHotelName(hotelInfo.name);
            setAddress(hotelInfo.address);
            setDistrict(hotelInfo.district);
            setProvince(hotelInfo.province);
            setPostalcode(hotelInfo.postalcode);
            setTel(hotelInfo.tel);
            setImagePath(hotelInfo.picture);
            setInfoState(1);
        }
    }




    useEffect(() => {
        getHotelInfo();
        async function setRole() {
            if (userSession != null) {
                const userData = await getUserData(userSession.user.token);
                if (userData != null) {
                    setUserRole(userData.data.role);
                }
            }
        }
    
        setRole();
    }, []);

    // form data

    const [startDate, setStartDate] = useState<Dayjs|null>(null);
    const [endDate, setEndDate] = useState<Dayjs|null>(null);

    const loading = (
        <div className="bg-slate-200 h-[28rem] w-[840px] rounded-lg flex justify-center items-center">
            <CircularProgress />
        </div>
    );

    const showing = (
        <div className="bg-slate-200 h-[28rem] w-[840px] rounded-lg flex justify-center items-center">
            <div className="h-full w-1/2 rounded-l-lg bg-blue-200 relative">
                <Image 
                className="object-cover rounded-l-lg"
                src={imagePath}
                alt=""
                fill={true}
                sizes="width:100%;height:100%;"
                priority
                />
            </div>
            <div className="h-full w-1/2 rounded-r-lg bg-slate-600 px-4 py-4 text-slate-50">
                <h1 className="text-2xl text-center my-2">{hotelName}</h1>
                <h2 className="text-justify">{address}, {district}, {province}</h2>
                <p>Postal Code: {postalcode}</p>
                <p>Tel: {tel}</p>
                <hr className="mt-4" />
                <form className="w-full flex flex-col justify-start mt-4 items-center">
                    <label>Start Date</label>
                    <div className="bg-slate-50 px-4 py-2 rounded-md">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker label="Start Date" value={startDate} onChange={(value) => {
                                setStartDate(value);
                            }} />
                        </LocalizationProvider>
                    </div>
                    <label>End Date</label>
                    <div className="bg-slate-50 px-4 py-2 rounded-md">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker label="Checkout Date" value={endDate} onChange={(value) => {
                                setEndDate(value);
                            }} />
                        </LocalizationProvider>
                    </div>
                    <input className="bg-slate-200 text-slate-800 px-2 py-1 mt-2 rounded-md duration-150 hover:bg-slate-300 hover:cursor-pointer" type="submit" value="Book Hotel" onClick={(e) => {
                        e.preventDefault();
                        if (startDate == null || endDate == null) {

                        } else if (Math.abs(endDate.diff(startDate, "day")) > 3) {
                            alert("You can book up to 3 days.")
                        } else {
                            bookHotel();
                        }
                    }} />
                </form>
            </div>
        </div>
    );

    async function bookHotel() {
        setInfoState(0);

        await new Promise((resolve) => {
            setTimeout(resolve, 500);
        })

        let bookingList: BookingList;

        const getBooking = await fetch("http://localhost:5000/api/v1/bookings", {
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + userSession?.user.token
            },
        });

        if (!getBooking.ok) {
            setInfoState(3);
        } else if ((endDate?.format("YYYY-MM-DD")!) > (startDate?.format("YYYY-MM-DD")!)) {

            bookingList = await getBooking.json();

            const bookingListData = bookingList.data;

            let isThisHotelBooked = false;

            for (let i = 0; i < bookingListData.length; i++) {
                if (
                    hotelName == bookingListData[i].hotel.name && 
                    params.id == bookingListData[i].hotel.id &&
                    userSession?.user._id == bookingListData[i].user._id &&
                    (
                        (
                            (startDate?.format("YYYY-MM-DD")!) <= bookingListData[i].bookingDate.slice(0, 10) &&
                            (endDate?.format("YYYY-MM-DD")!) >= bookingListData[i].bookingDate.slice(0, 10)
                        ) ||
                        (
                            (startDate?.format("YYYY-MM-DD")!) <= bookingListData[i].checkoutDate.slice(0, 10) && 
                            (endDate?.format("YYYY-MM-DD")!) >= bookingListData[i].checkoutDate.slice(0, 10)
                        )
                    )
                ) {
                    isThisHotelBooked = true;
                    break;
                }
            }

            if (!isThisHotelBooked) {
                const response = await fetch("http://localhost:5000/api/v1/hotels/" + params.id + "/bookings", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": "Bearer " + userSession?.user.token
                    },
                    body: JSON.stringify({
                        bookingDate: startDate?.format("YYYY-MM-DD"),
                        checkoutDate: endDate?.format("YYYY-MM-DD"),
                    })
                });
        
                if (!response.ok) {
                    setInfoState(3);
                } else {
                    setInfoState(2);
                }
            } else {
                setInfoState(3);
                await new Promise((resolve) => {
                    setTimeout(resolve, 100);
                });
                alert("You already booked this hotel at this time.");
            }

        } else {
            setInfoState(3);
            await new Promise((resolve) => {
                setTimeout(resolve, 100);
            });
            alert("End date must be after start date");
        }

    }

    const bookSuccess = (
        <div className="bg-slate-200 h-[28rem] w-[840px] rounded-lg flex flex-col justify-center items-center">
            <h1 className="text-slate-500 text-center text-2xl">Book The Hotel <span className="text-green-600">successfully.</span></h1>
            <button className="text-slate-500 mt-4" onClick={(e) => {
                e.preventDefault();
                setInfoState(1);
            }}>Back</button>
        </div>
    );
    
    const bookFailed = (
        <div className="bg-slate-200 h-[28rem] w-[840px] rounded-lg flex flex-col justify-center items-center">
            <h1 className="text-slate-500 text-center text-2xl">Book The Hotel <span className="text-red-600">failed.</span></h1>
            <button className="text-slate-500 mt-4" onClick={(e) => {
                e.preventDefault();
                setInfoState(1);
            }}>Back</button>
        </div>
    );

    return (
        <div className={"min-h-[calc(100vh-2.5rem-9rem)] w-full flex flex-col justify-center items-center justify-items-start py-4 overflow-auto" + ((userRole == "admin" && infoState != 4) ? " mt-20": "")}>
            {
                (infoState == 0) ?
                loading :
                (infoState == 1) ?
                showing :
                (infoState == 2) ?
                bookSuccess :
                (infoState == 3) ?
                bookFailed :
                hotelNotFound
            }
            {
                (userRole == "admin" && infoState != 4) ?
                <hr className="w-[95%] mt-10 border-2 rounded-full" /> :
                <></>
            }
            {
                (userRole == "admin" && infoState != 4) ?
                <UpdateHotelPane hotelId={params.id} /> :
                <></>
            }
            {
                (userRole == "admin" && infoState != 4) ?
                <hr className="w-[95%] mb-10 border-2 rounded-full" /> :
                <></>
            }
            {
                (userRole == "admin" && infoState != 4) ?
                <DeleteHotelButton hotelId={params.id} authToken={userSession!.user.token} /> :
                <></>
            }
        </div>
    );
}