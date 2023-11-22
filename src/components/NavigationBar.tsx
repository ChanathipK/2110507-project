"use client"
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import getUserData from "@/libs/getUserData";

export default function NavigationBar() {

    const {data: userSession, status} = useSession();
    const isAuthenticated = status == "authenticated";

    const [userRole, setUserRole] = useState<string|null>("guest");
    
    useEffect(() => {
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


    // Set Selecting Tab
    const pathname = usePathname();
    const x = (pathname == "/"? 0: (pathname == "/booking"? 1: (pathname == "/about-us"? 2: -1)));
    const [selectingTab, setSelectingTab] = useState<number>(x);
    const selectingClass = " bg-slate-600 text-white hover:bg-slate-100 hover:text-black";

    // Logged In vs Guest
    const guest = (
        <div className="flex flex-row-reverse justify-center items-center h-full sm:me-20">
            <Link
            className="ms-8 flex justify-center items-center"
            href="/api/auth/signin"
            onClick={() => {
                setSelectingTab(-1);
            }}
            >
                <span>Log In</span>
            </Link>
            <Link
            className="text-slate-500 flex justify-center items-center"
            href="/signup"
            onClick={() => {
                setSelectingTab(-1);
            }}
            >
                <span>Sign Up</span>
            </Link>
        </div>
    );

    const loggedIn = (
        <div className="flex flex-row-reverse justify-center items-center h-full sm:me-20">
            <Link
            className="ms-8 flex justify-center items-center"
            href="/api/auth/signout"
            onClick={() => {
                setSelectingTab(-1);
            }}
            >
                Log out
            </Link>
            {
                (userRole == "admin") ?
                <Link
                className="text-slate-800 flex justify-center items-center me-2 sm:me-4"
                href="/create-hotel"
                onClick={() => {
                    setSelectingTab(-1);
                }}
                >
                    <span>Create Hotel</span>
                </Link> :
                <div></div>
            }
        </div>
    );

    // const isLoggedIn = status == 'authenticated';

    return (
        <nav className="w-full h-20 max-h-20 sm:h-10 sm:max-h-10 overflow-hidden bg-slate-300 flex flex-col sm:flex-row sm:justify-between z-30">
            <div className="sm:ms-20 flex justify-center items-center h-full">
                <Link
                className={"h-full flex items-center justify-center duration-150 px-2 me-2" + ((selectingTab == 0) ? selectingClass: "")}
                href="/"
                onClick={() => {
                    setSelectingTab(0);
                }}
                >
                    <span className="">Hotel Booking</span>
                </Link>
                <Link
                className={"h-full flex items-center justify-center duration-150 px-2" + ((selectingTab == 1) ? selectingClass: "")}
                href="/hotel"
                onClick={() => {
                    setSelectingTab(1);
                }}
                >
                    <span className="">Hotels</span>
                </Link>
                <Link
                className={"h-full flex items-center justify-center duration-150 px-2" + ((selectingTab == 2) ? selectingClass: "")}
                href="/about-us"
                onClick={() => {
                    setSelectingTab(2);
                }}
                >
                    <span>About us</span>
                </Link>
            </div>
            {
                isAuthenticated ?
                loggedIn :
                guest
            }
        </nav>
    );
}