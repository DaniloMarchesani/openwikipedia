import { RegisterSchema, TRegisterSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import 'react-toastify/dist/ReactToastify.css';
import useNotify from "@/components/hook/useNotify";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import AnimatedBg from "@/components/common/AnimatedBg";

const RegisterPage = () => {

    const { BACKEND_URI } = import.meta.env;

    const [success, setSuccess] = useState(false)
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const [isPasswordConfirmationVisible, setIsPasswordConfirmationVisible] = useState(false)

    const { showSuccessToast, showWarningToast} = useNotify();

    const defaultValues: TRegisterSchema = {
        username: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        firstname: "",
        lastname: ""
    } 

    const form = useForm<TRegisterSchema>({
        defaultValues: defaultValues,
        resolver: zodResolver(RegisterSchema)
    })

    const onSubmit: SubmitHandler<TRegisterSchema> = async (formData) => {
        try {
            const response = await axios.post(`${BACKEND_URI}/api/auth/register`, formData);
            if(response.data.error) {
                showWarningToast("Something went very wrong getting the data!");
                form.setError("root", { message: response.data.error })
            }
            showSuccessToast("Registered Successfully!🎉");
            setSuccess(true)
        } catch (error) {
            console.log(error)
            showWarningToast("Something went wrong!");
            form.setError("root", { message: "Something went wrong!" + error })
        }
    } 

    



    return (
        <div className="flex flex-col w-full items-center max-w-lg">
            <AnimatedBg />
            {success ? (
                <>
                    <h1 className="text-3xl font-bold">Registered Successfully!🎉</h1>
                    <p>Login now and have fun using the app!</p>
                    <Button asChild>
                        <Link to={"/login"}>Go to Login</Link>
                    </Button>
                </>
               
            ) :(
                <div className="w-full">
                    <h1 className="text-4xl font-bold mb-10">Sign Up</h1>
                    <form
                        className="flex flex-col gap-4"
                        onSubmit={form.handleSubmit(onSubmit)}>
                        {/* USERNAME */}
                        <Controller
                            name="username"
                            control={form.control}
                            render={({ field }) => (
                                <Input type="text" placeholder="Username" {...field} />
                            )}
                        />
                        {form.formState.errors.username && ( <p className="text-red-500 text-sm">{form.formState.errors.username.message}</p>)}
                        {/* EMAIL */}
                        <Controller
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <Input type="email" placeholder="Email" {...field} />
                            )}
                        />
                        {form.formState.errors.email && ( <p className="text-red-500 text-sm">{form.formState.errors.email.message}</p>)}
                        {/* PASSWORD */}
                        <Controller
                            name="password"
                            control={form.control}
                            render={({ field }) => (
                                <Input type={isPasswordVisible ? "text" : "password"} placeholder="Password" {...field} />
                            )}
                        />
                        {form.formState.errors.password && ( <p className="text-red-500 text-sm">{form.formState.errors.password.message}</p>)}
                        <Label>
                            <input type="checkbox" onChange={() => setIsPasswordVisible(!isPasswordVisible)} />
                            <span className="ml-2">Show Password</span>
                        </Label>
                        {/* PASSWORD CONFIRMATION */}
                        <Controller
                            name="passwordConfirmation"
                            control={form.control}
                            render={({ field }) => (
                                <Input type={isPasswordConfirmationVisible ? "text" : "password"} placeholder="Password Confirmation" {...field} />
                            )}
                        />
                        {form.formState.errors.passwordConfirmation && ( <p className="text-red-500 text-sm">{form.formState.errors.passwordConfirmation.message}</p>)}
                        <Label>
                            <input type="checkbox" onChange={() => setIsPasswordConfirmationVisible(!isPasswordConfirmationVisible)} />
                            <span className="ml-2">Show Password</span>
                        </Label>
                        
                        {/* FIRSTNAME */}
                        <Controller
                            name="firstname"
                            control={form.control}
                            render={({ field }) => (
                                <Input type="text" placeholder="Firstname" {...field} />
                            )}
                        />
                        {form.formState.errors.firstname && ( <p className="text-red-500 text-sm">{form.formState.errors.firstname.message}</p>)}
                        {/* LASTNAME */}
                        <Controller
                            name="lastname"
                            control={form.control}
                            render={({ field }) => (
                                <Input type="text" placeholder="Lastname" {...field} />
                            )}
                        />
                        {form.formState.errors.lastname && ( <p className="text-red-500 text-sm">{form.formState.errors.lastname.message}</p>)}
                        <Button type="submit">Register</Button>
                        {form.formState.errors.root && (
                            <p className="text-sm text-red-500">{form.formState.errors.root.message}</p>
                        )}
                    </form>
                    
                </div>
               
            )}
        
        </div>
    );
}

export default RegisterPage;