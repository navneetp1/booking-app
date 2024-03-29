export default function Footer(){
    return (
        <>
        <div className="bg-gradient-to-r from-red-800 to-red-500 py-10">
            <div className="container mx-auto flex justify-between items-center">
                <span className="text-3xl text-white font-bold tracking-tight">
                    HotelHive.com
                </span>
                
                <span className="text-white font-bold tracking-tight flex gap-4">
                    <p className="cursor-pointer">Terms of Service</p>
                    <p className="cursor-pointer">Privacy Policy</p>
                </span>
            </div>
        </div>
        </>
    )
}