import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm";

export default function GuestSection(){
    const { register, formState: { errors} } = useFormContext<HotelFormData>();
    return (
        <>
        <div className="">

        <h2 className="text-2xl font-bold mb-3">Guests</h2>
        
            <div className="grid grid-cols-2 p-6 gap-5 bg-blue-300">
            
                    <label className="text-gray-700 text-sm font-bold">
                            Adults
                            <input 
                            min={1}
                            className="border rounded-xl w-full py-2 px-2 font-normal bg-orange-100" 
                            {...register("adultCount", {required: "This field is required!"})}
                            type="number" 
                            placeholder='Enter adult count' />
                            {errors.adultCount && (
                                <span className="text-blue-500">{errors.adultCount?.message}</span>
                            )}
                    </label>

                    <label className="text-gray-700 text-sm font-bold">
                            Children
                            <input 
                            min={0}
                            className="border rounded-xl w-full py-2 px-2 font-normal bg-orange-100" 
                            {...register("childCount", {required: "This field is required!"})}
                            type="number" 
                            placeholder='Enter children count' />
                            {errors.childCount && (
                                <span className="text-blue-500">{errors.childCount?.message}</span>
                            )}
                    </label>

                </div>
        </div>
        </>
    )
}