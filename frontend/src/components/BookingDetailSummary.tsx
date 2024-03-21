import { HotelType } from "../../../backend/src/shared/types";

type Props = {
    checkIn: Date;
    checkOut: Date;
    adultCount: number;
    childCount: number;
    numberOfNights: number;
    hotel: HotelType
}

export default function BookingDetailSummary({ 
        checkIn, 
        checkOut,
        adultCount, 
        childCount, 
        numberOfNights,
        hotel}: Props
        ){
    return (

        <>
        <div className="grid gap-4 rounded-lg border border-slate-400 p-5 h-fit">
            <h2 className="text-xl font-bold">Your Booking details</h2>
            <div className="border-b py-2">
                Location:
                <div className="font-bold">{`${hotel.name}, ${hotel.city}, ${hotel.country}`}</div>
            </div>
            
            <div className="flex justify-between">
                <div>
                    Check-In
                    <div className="font-bold">{checkIn.toDateString()}</div>
                </div>
                <div>
                    Check-Out
                    <div className="font-bold">{checkOut.toDateString()}</div>
                </div>
            </div>

            <div className="border-t border-b py-2">
                Total length of stay: 
                <div className="font-bold">
                    {numberOfNights} Nights
                </div>
            </div>

            <div>
                Guests <div className="font-bold">{adultCount > 1 ? `${adultCount} Adults`: `${adultCount} Adult`} & {childCount} Children</div>
            </div>
        </div>
        </>
    )
}