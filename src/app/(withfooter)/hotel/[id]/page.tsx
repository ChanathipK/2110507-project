"use client"

import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Hotel } from "../../../../../interfaces";

export default function HotelId({ params }: { params: {id: string} }) {

    // state:
    // loading: 0
    // showing: 1

    const [infoState, setInfoState] = useState<number>(0);

    // fetching data

    const [hotelName, setHotelName] = useState<string>("Loading");
    const [address, setAddress] = useState<string>("Loading");
    const [district, setDistrict] = useState<string>("Loading");
    const [province, setProvince] = useState<string>("Loading");
    const [postalcode, setPostalcode] = useState<string>("Loading");
    const [tel, setTel] = useState<string>("Loading");
    const [imagePath, setImagePath] = useState<string>("");

    async function getHotelInfo() {

        await new Promise((resolve) => {
            setTimeout(resolve, 700);
        })

        const response = await fetch("http://localhost:5000/api/v1/hotels/" + params.id);

        if (!response.ok) {
            throw new Error("Failed to fetch hotel info.");
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
    }, []);

    const loading = (
        <div className="bg-slate-200 h-96 w-[720px] rounded-lg flex justify-center items-center">
            <CircularProgress />
        </div>
    );

    const showing = (
        <div className="bg-slate-200 h-96 w-[720px] rounded-lg flex justify-center items-center">
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
            </div>
        </div>
    );

    return (
        <div className="min-h-[calc(100vh-2.5rem-9rem)] w-full bg-slate-50 flex flex-wrap justify-center items-center justify-items-start py-4 overflow-auto">
            {
                (infoState == 0) ?
                loading :
                showing
            }
        </div>
    );
}