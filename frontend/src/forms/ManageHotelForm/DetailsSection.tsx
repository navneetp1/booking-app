import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm"

export default function DetailsSection(){
    //wrapping the parent component in formProvider now allows us to use form methods here..
    const { register,
            formState: {errors} 
        } = useFormContext<HotelFormData>()
    return (
        <>
        <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>

            <label className="text-gray-700 text-sm font-bold flex-1">
                    Name
                    <input 
                    className="border rounded w-full py-2 px-2 font-normal bg-orange-100" 
                    {...register("name", {required: "This field is required!"})}
                    type="text" 
                    placeholder='Enter the name..' />
                    {errors.name && (
                        <span className="text-blue-500">{errors.name.message}</span>
                    )}
            </label>

            <div className="flex gap-4 ">
            <label className="text-gray-700 text-sm font-bold flex-1">
                    City
                    <input 
                    className="border rounded w-full py-2 px-2 font-normal bg-orange-100" 
                    {...register("city", {required: "This field is required!"})}
                    type="text" 
                    placeholder='Enter the city..' />
                    {errors.city && (
                        <span className="text-blue-500">{errors.city.message}</span>
                    )}
            </label>

            <label className="text-gray-700 text-sm font-bold flex-1">
                    Country
                    <input 
                    className="border rounded w-full py-2 px-2 font-normal bg-orange-100" 
                    {...register("country", {required: "This field is required!"})}
                    type="text" 
                    placeholder='Enter country name..' />
                    {errors.country && (
                        <span className="text-blue-500">{errors.country.message}</span>
                    )}
            </label>

            </div>

            <label className="text-gray-700 text-sm font-bold flex-1">
                    Description
                    <textarea 
                    rows={7}
                    className="border rounded w-full py-2 px-2 font-normal bg-orange-100" 
                    {...register("description", {required: "This field is required!"})}
                    placeholder='Enter Description of the hotel..' />
                    {errors.description && (
                        <span className="text-blue-500">{errors.description.message}</span>
                    )}
            </label>

            <label className="text-gray-700 text-sm font-bold max-w-[40%]">
                    Price per Night
                    <input 
                    min={1}
                    className="border rounded w-full py-2 px-2 font-normal bg-orange-100" 
                    {...register("pricePerNight", {required: "This field is required!"})}
                    type="number" 
                    placeholder='Enter price per night..' />
                    {errors.pricePerNight && (
                        <span className="text-blue-500">{errors.pricePerNight.message}</span>
                    )}
            </label>

            <label className="text-gray-700 text-sm font-bold max-w-[40%]">
                    Star Rating  
                    <br/>
                    <select {...register("starRating", {required: "This field is required!"})}
                            className="border rounded w-full p-2 text-gray-700 font-normal bg-orange-100">
                        <option value="" className="text-sm font-bold">
                            Select a rating
                        </option>

                        {[1,2,3,4,5].map((num) =>(
                            <option key={num} value={num}>
                                {num}
                            </option>
                        ))}

                    </select>
                    {errors.starRating && (
                        <span className="text-blue-500">{errors.starRating.message}</span>
                    )}
            </label>
            
        </div>
        </>
    )
}