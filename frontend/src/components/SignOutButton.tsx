import { useMutation, useQueryClient } from "react-query"
import * as apiClient from "../api-client"
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

export default function SignOutButton(){
    const queryClient = useQueryClient();
    const { showToast } = useAppContext();
    const navigate = useNavigate();
    const mutation = useMutation(apiClient.signOut, {
        onSuccess: async ()=>{
            await queryClient.invalidateQueries("validateToken");
            showToast({ message: "Signed Out!!", type: "SUCCESS"});
            navigate("/");
        },
        onError: (error: Error)=>{
            //showToast
            showToast({ message: error.message, type: "ERROR"});
        },
    })

    function handleClick(){
        mutation.mutate();
    }

    return (
        <>
            <button 
                onClick={handleClick}
                className="flex item-center rounded-xl text-blue-600 px-3 py-1 font-bold bg-white hover:bg-gray-200">
                Sign Out
            </button>
        </>
    )
}