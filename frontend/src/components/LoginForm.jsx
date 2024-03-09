import React, {useEffect, useState} from "react";
import useLogin from "../hook/useLogin.js";

export const LoginForm = () => {
    const [formData, setFormData] = useState({

        email: "",
        password: "",
    });

    const {login , isLoading, error} = useLogin();


    const handleChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value,
        }))

        console.log(formData);
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted with data:", formData);
        await login(formData)
        e.target.reset();
    };
    return (
        <div className=" w-[100%] h-[100%] bg-white text-black flex flex-col justify-center items-center font-mono ">
            <form className=" w-[80%] " onSubmit={handleSubmit}>
                <div className="relative z-0 w-full mb-14 group">
                    <input type="email" name="email" id="floating_email"
                           className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                           placeholder=" " required onChange={handleChange}/>
                    <label htmlFor="floating_email"
                           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email
                        address</label>
                </div>
                <div className="relative z-0 w-full mb-14 group">
                    <input type="password" name="password" id="floating_password"
                           className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                           placeholder=" " required onChange={handleChange}/>
                    <label htmlFor="floating_password"
                           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                </div>




                <button
                    type="submit"
                    className="text-white bg-black font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center font-mono cursor-pointer"
                    disabled={isLoading}
                >
                    login
                </button>

                {error && <div className='w-full p-2 text-center text-red-600 mt-5'>
                    {error}
                </div>}
            </form>
        </div>
    )
}

export default LoginForm