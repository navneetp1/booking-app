import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm";
import { MdDelete } from "react-icons/md";

export default function ImagesSection(){
    const { register, 
            formState: { errors }, 
            watch,
            setValue } = useFormContext<HotelFormData>(); 

    const existingImageUrls = watch("imageUrls");

    const handleDelete = async(event:React.MouseEvent<HTMLSpanElement, MouseEvent>, 
                               imageUrl:string) => {
        event.preventDefault();
        setValue("imageUrls", existingImageUrls.filter((url)=> url !== imageUrl))
                                
    };

    return (
        <>
        <div>
            <h2 className="text-2xl font-bold mb-3">Images</h2>
            <div className="border rounded p-4 flex flex-col gap-4">
                {existingImageUrls && (
                    <div className="grid grid-cols-6 gap-4">
                        {existingImageUrls.map((url)=>(
                            <div className="relative group"> 
                                <img src={url} alt="" className="min-h-full object-cover" />
                                <span 
                                    className="absolute inset-0 cursor-pointer flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100"
                                    onClick={(event)=> handleDelete(event, url)}>
                                        <MdDelete className="text-white fill-current"/>
                                </span>
                            </div>
                        ))}
                    </div>
                )}
                <input type="file" 
                       multiple
                       accept="image/*"
                       className="w-full text-gray-700 font-normal"
                {
                    ...register("imageFiles", {
                        validate: (imageFiles)=> {
                            const totalLength = imageFiles.length + (existingImageUrls?.length || 0);

                            if(totalLength == 0){
                                return "Atleast one image should be uploaded";
                            }
                            if(totalLength > 6){
                                return "Total images can't exceed 6";
                            }

                            return true;
                        }
                    })
                } 
                />
            </div>
            {errors.imageFiles && (
                <span className="text-blue-500 text-sm font-bold">{errors.imageFiles.message}</span>
            )}
        </div>
        </>
    )
}