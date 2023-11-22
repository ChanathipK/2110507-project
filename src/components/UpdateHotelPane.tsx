"use client"

import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";

export default function UpdateHotelPane({hotelId,}: {hotelId: string}) {

    // state
    // normal: 0
    // success: 1
    // failed: 2
    // loading: 3
    // missing input: 4

    const [createState, setCreateState] = useState<number>(0);

    const [hotelName, setHotelName] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [district, setDistrict] = useState<string>("");
    const [province, setProvince] = useState<string>("");
    const [postalCode, setPostalCode] = useState<string>("");
    const [tel, setTel] = useState<string>("");
    const [imageURL, setImageURL] = useState<string>("");

    const {data: userSession, status} = useSession();

    const updateNormal = (
        <div className="mt-10 mb-10 w-96 h-[30rem] bg-slate-300 rounded-xl flex flex-col px-8 py-4">
            <h1 className="text-slate-700 text-2xl text-center mt-2">Update Hotel Data</h1>
            <form className="w-full mt-4">
                <input className="w-full py-1 px-2 rounded-md duration-150 hover:bg-slate-200 focus:outline-none focus:bg-slate-200 my-2" type="text" placeholder="Hotel Name" value={hotelName} onChange={(e)=>{setHotelName(e.currentTarget.value)}} />
                <input className="w-full py-1 px-2 rounded-md duration-150 hover:bg-slate-200 focus:outline-none focus:bg-slate-200 my-2" type="text" placeholder="Address" value={address} onChange={(e)=>{setAddress(e.currentTarget.value)}} />
                <input className="w-full py-1 px-2 rounded-md duration-150 hover:bg-slate-200 focus:outline-none focus:bg-slate-200 my-2" type="text" placeholder="District" value={district} onChange={(e)=>{setDistrict(e.currentTarget.value)}} />
                <input className="w-full py-1 px-2 rounded-md duration-150 hover:bg-slate-200 focus:outline-none focus:bg-slate-200 my-2" type="text" placeholder="Province" value={province} onChange={(e)=>{setProvince(e.currentTarget.value)}} />
                <input className="w-full py-1 px-2 rounded-md duration-150 hover:bg-slate-200 focus:outline-none focus:bg-slate-200 my-2" type="text" placeholder="Postal Code" value={postalCode} onChange={(e)=>{setPostalCode(e.currentTarget.value)}} />
                <input className="w-full py-1 px-2 rounded-md duration-150 hover:bg-slate-200 focus:outline-none focus:bg-slate-200 my-2" type="text" placeholder="Telephone Number" value={tel} onChange={(e)=>{setTel(e.currentTarget.value)}} />
                <input className="w-full py-1 px-2 rounded-md duration-150 hover:bg-slate-200 focus:outline-none focus:bg-slate-200 my-2" type="text" placeholder="Image URL" value={imageURL} onChange={(e)=>{setImageURL(e.currentTarget.value)}} />
                <div className="w-full flex justify-center items-center">
                    <input className="bg-orange-200 px-12 py-1 mt-2 rounded-md hover:cursor-pointer duration-150 hover:text-slate-50 hover:bg-orange-500" type="submit" value="Update" onClick={(e) => {
                            e.preventDefault();
                            updateHotel();
                        }} />
                    </div>
            </form>
        </div>
    );

    const updateSuccess = (
        <div className="mt-10 mb-10 w-96 h-[30rem] bg-slate-300 rounded-xl flex flex-col justify-center items-center px-8 py-4">
            <h1 className="text-xl text-slate-600 text-center">Update Hotel Data <span className="text-green-600">Successfully.</span></h1>
        </div>
    );

    const updateFail = (
        <div className="mt-10 mb-10 w-96 h-[30rem] bg-slate-300 rounded-xl flex flex-col justify-center items-center px-8 py-4">
            <h1 className="text-xl text-center text-slate-600">Update Hotel Information <span className="text-red-600">Failed.</span></h1>
            <h2 className="text-slate-500"><button className="text-blue-600" onClick={(e) => {
                e.preventDefault();
                location.reload();
            }}>Click here</button> to refresh the page.</h2>
        </div>
    );

    const loading = (
        <div className="mt-10 mb-10 w-96 h-[30rem] bg-slate-300 rounded-xl flex flex-col justify-center items-center px-8 py-4">
            <CircularProgress color="warning" />
        </div>
    );

    const missingInfo = (
        <div className="mt-10 mb-10 w-96 h-[30rem] bg-slate-500 rounded-xl flex flex-col justify-center items-center px-8 py-4">
            <h1 className="text-xl text-center text-slate-50">You have to fill in all the needed information.</h1>
            <h2 className="text-center text-slate-50"><button className="text-blue-300" onClick={(e) => {
                e.preventDefault();
                setCreateState(0);
            }}>Click here</button> to go back.</h2>
        </div>
    );

    async function updateHotel() {
        if (
            hotelName == "" ||
            address == "" ||
            district == "" ||
            province == "" || 
            postalCode == "" ||
            tel == "" ||
            imageURL == ""
        ) {
            setCreateState(4);
        } else {
            setCreateState(3);
            await new Promise((resolve) => {
                setTimeout(resolve, 500);
            });

            const authToken = "" + (userSession?.user.token);

            const response = await fetch("http://localhost:5000/api/v1/hotels/" + hotelId, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": "Bearer " + authToken
                },
                body: JSON.stringify({
                    name: hotelName,
                    address: address,
                    district: district,
                    province: province,
                    postalcode: postalCode,
                    tel: tel,
                    picture: imageURL
                }),
            });

            if (!response.ok) {
                setCreateState(2);
            } else {
                setCreateState(1);
                await new Promise((resolve) => {
                    setTimeout(resolve, 2000);
                });
                location.reload();
            }
        }
    }

    return (
        (createState == 0) ?
        updateNormal :
        (createState == 1) ?
        updateSuccess :
        (createState == 2) ?
        updateFail :
        (createState == 3) ?
        loading :
        (createState == 4) ?
        missingInfo :
        <div></div>
    );
}