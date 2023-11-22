"use client"
import getHotels from "@/libs/getHotels";
import { CircularProgress } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

export default function SignUpPane() {

    // Sign Up Pane: 0
    // Sign Up Successful: 1
    // Sign Up Failed: 2
    // loading: 3
    // Form Validation Alert: 4

    const [signUpState, setSignUpState] = useState<number>(0);

    // Sign Up Information
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [tel, setTel] = useState<string>("");

    const signUpNormal = (
        <div className="z-50 w-96 min-h-[400px] h-2/5">
            <form className="w-full h-full rounded-xl drop-shadow-md bg-slate-700 px-8 py-4 flex flex-col justify-center items-center">
                <h1 className="text-slate-50 text-center text-3xl mb-4">Sign Up</h1>
                <div className="w-full">
                    <div className="flex justify-between my-4">
                        <input className="py-1 px-2 w-[47%] rounded-md duration-150 hover:bg-slate-200 focus:outline-none focus:bg-slate-200" type="text" placeholder="First Name" value={firstName} onChange={(e)=>{setFirstName(e.currentTarget.value)}} />
                        <input className="py-1 px-2 w-[47%] rounded-md duration-150 hover:bg-slate-200 focus:outline-none focus:bg-slate-200" type="text" placeholder="First Name" value={lastName} onChange={(e)=>{setLastName(e.currentTarget.value)}} />
                    </div>
                    <input className="w-full py-1 px-2 rounded-md duration-150 hover:bg-slate-200 focus:outline-none focus:bg-slate-200 mb-4" type="text" placeholder="Email" value={email} onChange={(e)=>{setEmail(e.currentTarget.value)}} />
                    <input className="w-full py-1 px-2 rounded-md duration-150 hover:bg-slate-200 focus:outline-none focus:bg-slate-200 mb-4" type="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.currentTarget.value)}} />
                    <input className="w-full py-1 px-2 rounded-md duration-150 hover:bg-slate-200 focus:outline-none focus:bg-slate-200 mb-4" type="tel" placeholder="Tel" value={tel} onChange={(e)=>{setTel(e.currentTarget.value)}} />
                    <div className="w-full flex justify-center items-center">
                        <input className="bg-orange-200 px-12 py-1 rounded-md hover:cursor-pointer duration-150 hover:text-slate-50 hover:bg-orange-500" type="submit" value="Sign Up" onClick={(e) => {
                            e.preventDefault();
                            signUp();
                        }} />
                    </div>
                </div>
            </form>
        </div>
    );
    
    const signUpSuccessful = (
        <div className="z-50 w-96 min-h-[400px] h-2/5 rounded-xl drop-shadow-md bg-slate-700 px-8 py-4 flex flex-col justify-center items-center">
            <h2 className="text-slate-50 text-2xl">Signed Up <span className="text-green-300">Successfully.</span></h2>
            <h3 className="text-slate-50">to return to home page, <Link className="text-blue-300 duration-150 hover:text-blue-200" href="/">click</Link></h3>
        </div>
    )

    const signUpFailed = (
        <div className="z-50 w-96 min-h-[400px] h-2/5 rounded-xl drop-shadow-md bg-slate-700 px-8 py-4 flex flex-col justify-center items-center">
            <h2 className="text-slate-50 text-2xl text-center">Sign Up <span className="text-red-500">Failed</span></h2>
            <h3 className="text-slate-50 text-lg text-center mt-2">Something weird happened. Please refresh and sign up again.</h3>
            <button onClick={() => {
                location.reload();
            }} className="bg-slate-50 px-2 py-1 rounded-md drop-shadow-md duration-150 hover:drop-shadow-lg mt-4">refresh</button>
        </div>
    );

    const loading = (
        <div className="z-50 w-96 min-h-[400px] h-2/5 rounded-xl drop-shadow-md bg-slate-700 px-8 py-4 flex flex-col justify-center items-center">
            <CircularProgress />
        </div>
    );

    const missingInfo = (
        <div className="z-50 w-96 min-h-[400px] h-2/5 rounded-xl drop-shadow-md bg-slate-700 px-8 py-4 flex flex-col justify-center items-center">
            <h2 className="text-2xl text-slate-50 text-center mb-2">You must fill in every input</h2>
            <button className="bg-slate-50 px-2 py-1 rounded-md duration-150 hover:bg-slate-200" onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setSignUpState(0);
            }}>
                back to sign up
            </button>
        </div>
    );

    async function signUp() {
        if (
            firstName == "" ||
            email == "" ||
            password == "" ||
            tel == ""
        ) {
            setSignUpState(4);
        } else {
            setSignUpState(3);
            await new Promise((resolve) => {
                setTimeout(resolve, 1000);
            })
            const response = await fetch("http://localhost:5000/api/v1/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: (lastName == "" ? firstName: firstName + " " + lastName),
                    email: email,
                    tel: tel,
                    role: "user",
                    password: password
                }),
            });
            if (!response.ok) {
                setSignUpState(2);
            } else {
                setSignUpState(1);
            }
        }
    }
    
    async function testAsyncy() {
        await new Promise((resolve) => {
            setTimeout(resolve, 3000)
        });
        setSignUpState(1);
    }

    return (
        signUpState == 0 ?
        signUpNormal : 
        signUpState == 1 ?
        signUpSuccessful :
        signUpState == 2 ?
        signUpFailed :
        signUpState == 3 ?
        loading :
        missingInfo
    );
}