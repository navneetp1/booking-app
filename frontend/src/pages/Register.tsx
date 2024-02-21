import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from '../api-client';
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";

export type RegisterFormData = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
}
export default function Register(){
    const queryClient = useQueryClient();
    const { showToast } = useAppContext();
    const navigate = useNavigate();
    //watch allows to get the value of a different form input
    const { 
            register, 
            watch, 
            handleSubmit, 
            formState: {errors},
        } = useForm<RegisterFormData>();

    const mutation = useMutation(apiClient.register, {
        onSuccess: async ()=> {
            // console.log("registration successful.");
            showToast({message: "Registration successful", type: "SUCCESS"});
            await queryClient.invalidateQueries("validateToken");
            navigate("/");
        },
        onError: (error: Error) => {
            // console.log(error.message)
            showToast({message: error.message, type: "ERROR"});
        }
    });

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    })

    return (
        <form className='flex flex-col gap-5' action="" onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold">
                Create an Account
            </h2>

            <div className="flex flex-col md:flex-row gap-10">
                <label className="text-gray-700 text-sm font-bold flex-1">
                    First Name
                    <input 
                    className="border rounded w-full py-2 px-2 font-normal" 
                    {...register("firstName", {required: "This field is required!"})} 
                    type="text" 
                    placeholder='Enter first name..' />
                    {errors.firstName && (
                        <span className="text-blue-500">{errors.firstName.message}</span>
                    )}
                </label>

                <label className="text-gray-700 text-sm font-bold flex-1">
                    Last Name
                    <input 
                    className="border rounded w-full py-2 px-2 font-normal" 
                    {...register("lastName", {required: "This field is required!"})}
                    type="text" 
                    placeholder='Enter last name..' />
                    {errors.lastName && (
                        <span className="text-blue-500">{errors.lastName.message}</span>
                    )}
                </label>
            </div>

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

            <label className="text-gray-700 text-sm font-bold flex-1">
                    Confirm Password
                    <input 
                    className="border rounded w-full py-2 px-2 font-normal" 
                    {...register("confirmPassword", 
                        { validate: (val)=> {
                            if(!val){
                                return "This field is required!!"
                            } 
                            else if(watch("password") !== val){
                                return "Passwords do not match!";
                            }
                        }
                        })}
                    type="password" 
                    placeholder='Enter password again..' />
                    {errors.confirmPassword && (
                        <span className="text-blue-500">{errors.confirmPassword.message}</span>
                    )}
            </label>

            <hr />

            <span className="flex items-center justify-between">
                <span className="text-sm">
                        Already have an account? <Link className='underline' to='/sign-in'>Login here</Link>
                </span>
                <button 
                    type="submit"
                    className="bg-red-600 text-white p-2 font-bold hover:bg-red-500 text-xl">
                    Create Account
                </button>
            </span>
        </form>
    )
}