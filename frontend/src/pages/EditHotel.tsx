import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";

export default function EditHotel(){

    const { hotelId } = useParams(); 
    const navigate = useNavigate();
    const { showToast } = useAppContext();

    const { data: hotel } = useQuery("fetchMyHotelById", () => 
        apiClient.fetchMyHotelById(hotelId || ""), {
            enabled : !!hotelId,  //checks if hotelId has some value or not..
        });

    const { mutate, isLoading } = useMutation(apiClient.updateHotelById, {
        onSuccess: () => {
            showToast({message: "Changes were saved", type: "SUCCESS"});
            navigate("/my-hotels")
        },
        onError: () => {
            showToast({message: "Unable to save changes", type: "ERROR"});

        }
    });

    const handleSave = (hotelFormData : FormData) => {
        mutate(hotelFormData);
    }


    return (
        <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={isLoading} />
    )
}