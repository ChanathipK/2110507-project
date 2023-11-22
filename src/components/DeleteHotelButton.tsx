"use client"

import { useRouter } from "next/navigation";

export default function DeleteHotelButton({hotelId, authToken}: {hotelId: string, authToken: string}) {

    const router = useRouter();

    async function deleteHotel() {

        if (confirm("Do you really want to delete this nice hotel?")) {
            const response = await fetch("http://localhost:5000/api/v1/hotels/" + hotelId, {
                method: "DELETE",
                headers: {
                    "authorization": "Bearer " + authToken
                }
            });
    
            if (!response.ok) {
                alert("Delete Hotel Failed");
            } else {
                router.push("/hotel");
                await new Promise((resolve) => {
                    setTimeout(resolve, 100);
                })
                location.reload();
            }
        }
    }

    return (
        <button className="mb-10 bg-red-500 text-slate-50 text-xl px-4 py-2 rounded-md drop-shadow-md duration-150" onClick={(e) => {
            e.preventDefault();
            deleteHotel();
        }}>
            Delete Hotel
        </button>
    );
}