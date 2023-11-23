import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full h-[400px] max-h-[400px] sm:h-[300px] md:h-36 relative bottom-0 left-0 bg-slate-600 flex justify-center items-center text-slate-50 overflow-hidden">
            <div className="flex flex-col w-2/5 md:w-1/5 items-center">
                <Link
                className="text-[12px] md:text-[16px]"
                href="https://github.com/ChanathipK"
                replace={false}
                target="_blank"
                >
                    Visit Me on GitHub
                </Link>
                <Link
                className="text-[12px] md:text-[16px]"
                href="https://www.linkedin.com/in/chanathip-kulsirilak/"
                replace={false}
                target="_blank"
                >
                    LinkedIn
                </Link>
            </div>
            <div className="w-[2px] rounded bg-slate-500 h-[90%]"></div>
            <div className="ms-8 flex flex-col w-1/3">
                <span className="text-[14px] lg:text-[16px] text-justify">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
                <span className="text-[12px] text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus nam inventore quia dignissimos eos possimus officia deleniti quisquam animi doloribus?</span>
            </div>
        </footer>
    );
}