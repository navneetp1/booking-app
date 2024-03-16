import { useMutation } from 'react-query';
import ManageHotelForm from '../forms/ManageHotelForm/ManageHotelForm';
import { useAppContext } from '../contexts/AppContext';
import * as apiClient from "../api-client";
import { useNavigate } from 'react-router-dom';

export default function AddHotel(){

    const navigate = useNavigate();
    const { showToast } = useAppContext();
    const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
        onSuccess: () => {  
            showToast({ message: "Hotel Saved" , type: "SUCCESS"});
            navigate("/my-hotels");
        },
        onError: () => {
            showToast({ message: "Error saving hotel", type: "ERROR"});
        }
    });

    const handleSave = (hotelFormData: FormData) => {
        mutate(hotelFormData);
    }


    return (
        <>
            <ManageHotelForm onSave={handleSave} isLoading={isLoading} />
        </>
    )
}