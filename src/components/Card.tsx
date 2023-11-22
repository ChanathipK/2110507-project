import Link from "next/link";
import Image from "next/image";

export default function Card({name, address, district, province, postalcode, tel, id, imagePath}: {name: string, address: string, district: string, province: string, postalcode: string, tel: string, id: string, imagePath: string}) {
    return (
        <div className="w-48 min-w-[12rem] mx-4 h-80 bg-slate-500 rounded-lg overflow-hidden my-2 drop-shadow-md duration-150 hover:drop-shadow-lg">
            <div className="w-full h-36 bg-white rounded-t-lg relative">
                <Link
                className="w-full h-full relative flex"
                href={"/hotel/" + id}
                >
                    <Image 
                    className="rounded-t-lg"
                    src={imagePath}
                    alt={name + " hotel"}
                    fill={true}
                    sizes="width:100%;height:100%"
                    priority
                    />
                </Link>
            </div>
            <div className="w-full h-44 px-4 pt-2 text-slate-50 overflow-hidden bg-slate-500 duration-150 hover:bg-slate-600">
                <h2 className="text-lg text-justify">{name}</h2>
                <p className="text-xs text-justify mt-1">{address}, {district}, {province}</p>
                <p className="text-xs text-justify mt-1">Tel: {tel}</p>
            </div>
        </div>
    );
}