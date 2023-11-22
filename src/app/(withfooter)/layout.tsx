import Footer from "@/components/Footer";

export default function WithFooterLayout({children}: {children: React.ReactNode}) {
    return (
        <div className="w-full h-full">
            {children}
            <Footer />
        </div>
    );
}