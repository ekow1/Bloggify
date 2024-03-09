import React, {useState} from "react";
import {useRegister} from "../hook/useRegister.js";

export const RegisterForm = () => {
    const [formData, setFormData] = useState({
        full_name: "",
        username: "",
        email: "",
        password: "",
    });

    const {register , isLoading , error} = useRegister();


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });


    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted with data:", formData);
       await  register(formData);
        // Reset the form directly through the form's reset method
        e.target.reset();
    };
    return (

        <div className=" w-[100%] h-[100%] bg-white flex flex-col justify-center items-center font-mono ">
            <form className=" w-[80%] " onSubmit={handleSubmit}>
                <div className="relative z-0 w-full mb-10  mt-5 group">
                    <input type="text" name="full_name" id="floating_full_name"
                           className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                           placeholder=" " required onChange={handleChange}/>
                    <label htmlFor="floating_full_name"
                           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">full
                        name</label>
                </div>
                <div className="relative z-0 w-full mb-10  group">
                    <input type="text" name="username" id="float_username"
                           className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                           placeholder=" " required onChange={handleChange}/>
                    <label htmlFor="float_username"
                           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> username</label>
                </div>
                <div className="relative z-0 w-full mb-10  group">
                    <input type="email" name="email" id="floating_email"
                           className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                           placeholder=" " required onChange={handleChange}/>
                    <label htmlFor="floating_email"
                           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email
                        address</label>
                </div>
                <div className="relative z-0 w-full mb-10 group">
                    <input type="password" name="password" id="floating_password"
                           className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                           placeholder=" " required onChange={handleChange}/>
                    <label htmlFor="floating_password"
                           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                </div>

                <button
                    type="submit"
                    className="text-white bg-black font-medium text-sm w-full sm:w-auto px-8 py-2.5 text-center font-mono cursor-pointer"
                    disabled={isLoading}
                >
                    {isLoading ? "Loading..." : "Sign-up"}
                </button>

                {error && <div className='w-full p-2 text-center text-red-600 mt-5'>
                    {error}
                </div>}
            </form>
        </div>

    )
}

export default RegisterForm;