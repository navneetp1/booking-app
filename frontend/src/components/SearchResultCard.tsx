import { AiFillStar } from "react-icons/ai";
import { HotelType } from "../../../backend/src/shared/types";
import { Link } from "react-router-dom";

type Props = {
    hotel: HotelType;
}

export default function SearchResultCard({ hotel } : Props){
    return (
        <>
        <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-400 rounded-lg p-8 gap-8">
            <div className="w-full h-[300px]">
                <img src={hotel.imageUrls[0]} className="w-full h-full object-cover rounded-md object-center"/>
            </div>

            <div className="grid grid-rows-[1fr_2fr_1fr] ">
                {/* stars , type and heading */}
                <div>
                    <div className="flex items-center">
                        <span className="flex">
                            {Array.from({ length: hotel.starRating }).map(() => (
                                <AiFillStar className="fill-yellow-400"/>
                            ))}
                        </span>
                        <span className="ml-1 text-sm font-semibold">
                            {hotel.type}
                        </span>
                    </div>
                    <Link 
                        to={`/detail/${hotel._id}`} 
                        className="text-2xl font-bold cursor-pointer">
                        {hotel.name}
                    </Link>
                </div>
                
                {/* description. */}
                <div>
                    <div className="line-clamp-4">{hotel.description}</div>
                </div>

                <div className="grid grid-cols-2 items-end whitespace-nowrap">
                    <div className="flex gap-1 items-center">
                        {hotel.facilities.slice(0, 3).map((facility)=> (
                            <span className="bg-slate-300 p-2 rounded-lg font-bold text-xs whitespace-nowrap">
                                {facility}
                            </span>
                        ))}
                        <span className="text-sm font-semibold">{hotel.facilities.length > 3 && `+${hotel.facilities.length - 3} more..`}</span>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                        <span className="font-bold">${hotel.pricePerNight} per Night</span>
                        <Link 
                            to={`/detail/${hotel._id}`}
                            className="bg-blue-600 text-white h-full p-2 font-bold text-xl max-w-fit rounded-md hover:bg-blue-500">
                            View More
                        </Link>
                    </div>
                </div>

            </div>
        </div>
        </>
    )
}