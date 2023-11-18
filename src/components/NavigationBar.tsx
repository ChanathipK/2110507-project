import Link from "next/link";

export default function NavigationBar() {
    return (
        <nav className="w-full h-20 sm:h-10 bg-slate-300 flex flex-col sm:flex-row sm:justify-between">
            <div className="sm:ms-20 flex justify-center items-center h-full">
                <Link
                className="h-full flex items-center justify-center duration-150 bg-slate-600 text-white hover:bg-slate-100 hover:text-black px-2 me-8"
                href="/"
                >
                    <span className="">Hotel Booking</span>
                </Link>
                <Link
                className="me-4"
                href="/"
                >
                    Booking
                </Link>
                <Link
                className=""
                href="/about-us"
                >
                    <span>About us</span>
                </Link>
            </div>
            <div className="flex flex-row-reverse justify-center items-center h-full sm:me-20">
                <Link
                className="ms-8"
                href="/"
                >
                    <span>Log In</span>
                </Link>
                <Link
                className="text-slate-500"
                href="/"
                >
                    Sign Up
                </Link>
            </div>
        </nav>
    );
}