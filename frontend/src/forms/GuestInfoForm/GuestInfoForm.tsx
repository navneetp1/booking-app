import { useForm } from "react-hook-form";
import DatePicker from 'react-datepicker';
import { useSearchContext } from "../../contexts/SearchContext";
import { useAppContext } from "../../contexts/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
    hotelId: string;
    pricePerNight: number;

}

type GuestInfoFormData = {
    checkIn: Date;
    checkOut: Date;
    adultCount: number;
    childCount: number;
}

export default function GuestInfoForm({ hotelId, pricePerNight } : Props){

    const navigate = useNavigate();
    const location = useLocation();
    const search = useSearchContext();
    const { isLoggedIn } = useAppContext();
    
    const { 
            watch, 
            register, 
            handleSubmit, 
            setValue, 
            formState: {errors}
        } = useForm<GuestInfoFormData>({
            defaultValues: {
                checkIn: search.checkIn,
                checkOut: search.checkOut,
                adultCount: search.adultCount,
                childCount: search.childCount,
            }
        });

        const checkIn = watch("checkIn");
        const checkOut = watch("checkOut");

        const minDate = new Date();
        const maxDate = new Date();
        maxDate.setFullYear(maxDate.getFullYear() + 1);
        
        function onSignInClick(data: GuestInfoFormData){
            search.saveSearchValues(
                "", 
                data.checkIn, 
                data.checkOut, 
                data.childCount, 
                data.adultCount
            );
            navigate("/sign-in", { state: { from: location }}) //saves the url data into the state
        }


        function onSubmit(data: GuestInfoFormData){
            search.saveSearchValues(
                "", 
                data.checkIn, 
                data.checkOut, 
                data.childCount, 
                data.adultCount
            );
            navigate(`/hotel/${hotelId}/booking`); //saves the url data into the state
        }


    return (
        <div className="flex rounded-lg flex-col p-4 gap-4 bg-gradient-to-r from-blue-300 to-blue-200">
            <h3 className="text-lg font-bold">${pricePerNight} per Night</h3>
            <form onSubmit={
                isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)
                }>
                <div className="grid grid-cols-1 gap-4 items-center">
                    <div>
                    <DatePicker 
                        required
                        selected={checkIn} 
                        onChange={(date) => setValue("checkIn", date as Date)}
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

                    <div>
                    <DatePicker 
                        required
                        selected={checkOut} 
                        onChange={(date) => setValue("checkOut", date as Date)}
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

            <div className="flex rounded-md bg-orange-100 px-2 py-1 gap-2">
                <label className="flex items-center">
                    Adults:
                    <input className="bg-orange-100 w-full p-1 focus:outline-none font-bold"  
                           type="number" 
                           min={1} 
                           max={20}
                           {...register("adultCount", {
                            required: "This field is required",
                            min:{
                                value: 1,
                                message: "There must be atleast 1 adult."
                            },
                            valueAsNumber: true,
                           })}
                    />
                </label>

                <label className="items-center flex">
                    Children:
                    <input className="bg-orange-100 w-full p-1 focus:outline-none font-bold text-black"
                           type="number" 
                           min={0} 
                           max={20}
                           {...register("childCount", {
                            valueAsNumber: true,
                           })}
                    />
                </label>

                {errors.adultCount && (
                    <span className="text-blue-500 font-semibold text-sm">
                        {errors.adultCount.message}
                    </span>
                )}
            </div>
            {isLoggedIn ? (<button
                                className="bg-green-400 rounded-lg text-white font-bold h-full p-2 hover:bg-green-500 hover:text-black text-xl">
                            Book Now
                            </button> ) : 
                          (<button className="bg-red-500 text-white h-full p-2 font-bold hover:bg-red-400 text-xl">
                            Sign In to Book</button>)}
                </div>
            </form>
        </div>
    )
}