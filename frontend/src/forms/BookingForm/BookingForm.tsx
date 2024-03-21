import { useForm } from "react-hook-form";
import { PaymentIntentResponse, UserType } from "../../../../backend/src/shared/types"
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { useSearchContext } from "../../contexts/SearchContext";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "react-query";
import * as apiClient from "../../api-client"
import { useAppContext } from "../../contexts/AppContext";

type Props = {
    currentUser: UserType;
    paymentIntent: PaymentIntentResponse;
};

export type BookingFormData = {
    firstName: string;
    lastName: string;
    email: string;
    adultCount: number;
    childCount: number;
    checkIn: string;
    checkOut: string;
    hotelId: string;
    paymentIntentId: string;
    totalCost: number;

};

export default function BookingForm( { currentUser, paymentIntent }: Props){
    const stripe = useStripe();
    const elements = useElements();

    const search = useSearchContext();
    const navigate = useNavigate()
    const { hotelId } = useParams();
    const { showToast } = useAppContext()

    const { mutate , isLoading }= useMutation(apiClient.createRoomBooking, {
        onSuccess: () => {
            showToast({ message: "Booking saved", type: "SUCCESS"})
            navigate("/my-bookings")
        },  
        onError: () => {
            showToast({ message: "Error saving booking", type: "ERROR"})
        },
    });

    const { handleSubmit, register } = useForm<BookingFormData>({
        defaultValues: {
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            email: currentUser.email,
            adultCount: search.adultCount,
            childCount: search.childCount,
            checkIn: search.checkIn.toISOString(),
            checkOut: search.checkOut.toISOString(),
            hotelId: hotelId,
            totalCost: paymentIntent.totalCost,
            paymentIntentId: paymentIntent.paymentIntentId,
        }
    });

    const onSubmit = async(formData: BookingFormData) => {
        //this "stripe" comes from useStripe hook - access to all features of stripe
        if(!stripe || !elements){
            return;
        }

        try{
            
            const result = await stripe.confirmCardPayment(
                paymentIntent.clientSecret,{
                    payment_method: {
                        card: elements.getElement(CardElement) as StripeCardElement,
                    },
                });

                if(result.error){
                    console.log(result.error.message);
                    return;
                }

                if(result.paymentIntent?.status === "succeeded"){
                    mutate({...formData, paymentIntentId: result.paymentIntent.id });
                }


        }catch(error){
            console.log("payment was not successful ", error)
        }
            // console.log(result.paymentIntent?.status)

       
    }

    return (
        <>
        <form 
            onSubmit={handleSubmit(onSubmit)} 
            className="grid grid-cols-1 gap-5 rounded-lg border border-slate-400 p-5"
        >
            <span className="text-3xl font-bold">Confirm your details</span>
            <div className="grid grid-cols-2 gap-6">
                <label className="text-grap-700 text-sm font-bold flex-1">
                    First Name
                    <input 
                           type="text" 
                           className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal" 
                           readOnly
                           disabled
                           {...register("firstName")}
                           />
                </label>
                <label className="text-grap-700 text-sm font-bold flex-1">
                    Last Name
                    <input 
                           type="text" 
                           className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal" 
                           readOnly
                           disabled
                           {...register("lastName")}
                           />
                </label>
                <label className="text-grap-700 text-sm font-bold flex-1">
                    Email
                    <input 
                           type="text" 
                           className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal" 
                           readOnly
                           disabled
                           {...register("email")}
                           />
                </label>
            </div>

            <div className="space-y-2">
                <h2 className="text-xl font-semibold">Your Price Summary</h2>
                <div className="bg-blue-200 p-4 rounded-md">
                    <div className="font-semibold text-lg">
                        Total Cost: ${paymentIntent.totalCost.toFixed(2)}
                    </div>
                    <div className="text-xs">Includes charges and GST</div>
                </div>
            </div>


            <div className="space-y-2">
                <h3 className="text-xl font-semibold">Payment Details</h3>
                <CardElement 
                     id="payment-element" 
                     className="border rounded-md p-2 text-sm"/> 
            </div>

            <div className="flex justify-end">
                <button 
                    disabled={isLoading}
                    type="submit"
                    className="bg-red-600 text-white p-2 font-bold hover:bg-red-500 text-md disabled:bg-gray-500"
                >
                        {isLoading ? "Saving..": "Confirm Booking"}
                            
                </button>
            </div>
        </form>
        </>
    )
}