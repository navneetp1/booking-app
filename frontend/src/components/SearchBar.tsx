import { FormEvent, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext"
import { MdTravelExplore } from "react-icons/md";
import  DatePicker  from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function SearchBar(){
    const search = useSearchContext();
    const navigate = useNavigate()

    const [destination, setDestination] = useState<string>(search.destination);
    const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
    const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
    const [childCount, setChildCount] = useState<number>(search.childCount);
    const [adultCount, setAdultCount] = useState<number>(search.adultCount);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        search.saveSearchValues(
                destination, 
                checkIn, 
                checkOut, 
                childCount, 
                adultCount
                );
                navigate("/search");
        };

    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);  //1 year from now

    return (
        <form onSubmit={handleSubmit} 
              className="-mt-8 p-2 bg-gradient-to-br from-purple-900 to-purple-500 rounded-md shadow-lg grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-4">
            <div className="flex flex-row items-center flex-1 rounded bg-orange-100 p-2">
                <MdTravelExplore size={25} className="mr-2"/>
                <input placeholder="Where you going?" 
                       className="text-md text-black w-full bg-orange-100 focus:outline-none"
                       value={destination}
                       onChange={(event)=> setDestination(event.target.value)}
                />
            </div>

            <div className="flex rounded-md bg-orange-100 px-2 py-1 gap-2" style={{width: "250px"}}>
                <label className="flex items-center">
                    Adults:
                    <input className="bg-orange-100 w-full p-1 focus:outline-none font-bold"  
                           type="number" 
                           min={1} 
                           max={20}
                           value={adultCount}
                           onChange={(event)=> setAdultCount(parseInt(event.target.value))}
                    />
                </label>

                <label className="items-center flex">
                    Children:
                    <input className="bg-orange-100 w-full p-1 focus:outline-none font-bold text-black"
                           type="number" 
                           min={0} 
                           max={20}
                           value={childCount}
                           onChange={(event)=> setChildCount(parseInt(event.target.value))}
                    />
                </label>
            </div>

            <div className="ml-8">
                <DatePicker 
                    selected={checkIn} 
                    onChange={(date) => setCheckIn(date as Date)}
                    selectsStart
                    startDate={checkIn}
                    endDate={checkOut}
                    minDate={minDate}
                    maxDate={maxDate}
                    placeholderText="Check-in Date"
                    className="min-w-full rounded-md bg-orange-100 p-2 focus:outline-none"
                    dateFormat="dd/MM/yyyy"
                    wrapperClassName="min-w-full"
                />
            </div>

            <div className="ml-8">
                <DatePicker 
                    selected={checkOut} 
                    onChange={(date) => setCheckOut(date as Date)}
                    selectsStart
                    startDate={checkIn}
                    endDate={checkOut}
                    minDate={minDate}
                    maxDate={maxDate}
                    placeholderText="Check-in Date"
                    className="min-w-full rounded-md bg-orange-100 p-2 focus:outline-none"
                    dateFormat="dd/MM/yyyy"
                    wrapperClassName="min-w-full"
                />
            </div>

            <div className="flex gap-1">
                <button className="search-icon ml-6 w-full max-w-min rounded-full bg-green-400 hover:bg-green-600 hover:text-white h-full p-2 font-bold">
                    <IoSearch size={40}/>
                </button>
                <button className="ml-2 w-full text-white text-xl rounded-xl bg-red-600 hover:bg-red-400 hover:text-black h-full p-3 font-bold">
                    Clear
                </button>
            </div>
        </form>
    )
}