import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from '../api-client';
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";


export type SignInFormData = {
    email: string;
    password: string;
}
export default function SignIn(){
    
    const queryClient = useQueryClient();
    const { showToast } = useAppContext();
    const navigate = useNavigate();
    const { register, 
            formState: {errors},
            handleSubmit } = useForm<SignInFormData>();

    const mutation = useMutation(apiClient.signIn, {
        onSuccess: async () => {
            //1. show toast message
            showToast({message: "Sign In Successful", type: "SUCCESS"});
            await queryClient.invalidateQueries("validateToken");
            navigate("/");
            // console.log("user signed in")
        },
        onError: (error : Error) => {
            //show toast error
            showToast({message: error.message, type: "ERROR"});

        }
    })

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    });
    
    return (
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold">Sign in</h2>

            <label className="text-gray-700 text-sm font-bold flex-1">
                    Email
                    <input 
                    className="border rounded w-full py-2 px-2 font-normal" 
                    {...register("email", {required: "This field is required!"})}
                    type="email" 
                    placeholder='Enter email..' />
                    {errors.email && (
                        <span className="text-blue-500">{errors.email.message}</span>
                    )}
            </label>

            <label className="text-gray-700 text-sm font-bold flex-1">
                    Password
                    <input 
                    className="border rounded w-full py-2 px-2 font-normal" 
                    {...register("password", 
                        { required: "This field is required!", 
                          minLength: {
                            value: 6,
                            message: "Password must be atleast 6 characters."
                          }}
                    )}
                    type="password" 
                    placeholder='Enter password..' />
                    {errors.password && (
                        <span className="text-blue-500">{errors.password.message}</span>
                    )}
            </label>

            <span className="flex items-center justify-between">
                <span className="text-sm">
                    Not registered? <Link className='underline' to='/register'>Create an account here</Link>
                </span>
                <button 
                    type="submit"
                    className="bg-red-600 text-white p-2 font-bold hover:bg-red-500 text-xl">
                    Login
                </button>
            </span>
        </form>
    )
}