import React, {useEffect, useState} from 'react';
import {useBlogContext} from "../hook/useBlogContext.js";
import {useAuthContext} from "../hook/useAuthContext.js";

const AddBlog = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error , setError] = useState(null);
    const [formData, setFormData] = useState({
        title : " ",
        excerpt : " ",
        content : " "
    })

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };


    const {dispatch} = useBlogContext()
    const {user} = useAuthContext()


    useEffect(() => {
        console.log(formData);
    }, [formData]);

    const handleChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add logic to handle form submission

        if (!user){
            setError('You must login');
            return
        }
        try {
            const response = await fetch('http://localhost:5000/api/user/blog', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${user.token}`
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            console.log("Response from server:", data);

            if (response.ok) {
                console.log("Data Submitted Successfully");
                dispatch({type: 'ADD_BLOG', payload: data});
                console.log(data);
            } else {
                setError(data.error);
            }
        } catch (e) {
            console.error("Error:", e.message);
        }


        // You can access form values using e.target.name.value, e.target.price.value, etc.
        e.target.reset()
        toggleModal()
    };

    return (
        <div>
            {/* Modal toggle */}
            <button
                onClick={toggleModal}
                className="block text-gray-700 outline outline-gray-700 hover:bg-gray-700-800 focus:ring-4 focus:outline-none focus:ring-gray-700 font-medium font-mono rounded-lg text-lg px-5 py-2.5 text-center hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                type="button"
            >
                new post
            </button>

            {/* Main modal */}
            {isModalOpen && (
                <div
                    id="crud-modal"
                    tabIndex="-1"
                    aria-hidden="true"
                    className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen"
                >
                    <div className="relative p-4 w-full max-w-md">
                        {/* Modal content */}
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            {/* Modal header */}
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Create New Blog
                                </h3>
                                <button
                                    type="button"
                                    onClick={toggleModal}
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            {/* Modal body */}
                            <form onSubmit={handleSubmit} className="p-4 md:p-5">
                                {/* ... rest of the form content ... */}
                                <div className="grid gap-4 mb-4 grid-cols-2">
                                    <div className="col-span-2">
                                        <label htmlFor="title"
                                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Blog Title</label>
                                        <input type="text" name="title" id="blog_title"
                                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                               placeholder="blog title" required="" onChange={handleChange}/>
                                    </div>
                                    <div className="col-span-2">
                                        <label htmlFor="excerpt"
                                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Blog Excerpt</label>
                                        <input type="text" name="excerpt" id="blog_excerpt"
                                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                               placeholder="blog excerpt" required="" onChange={handleChange}/>
                                    </div>

                                    <div className="col-span-2">
                                    <label htmlFor="content"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Blog Content</label>
                                    <textarea id="description" name="content" rows="10" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write product description here"  onChange={handleChange}></textarea>
                                    </div>
                                </div>
                                    <button
                                        type="submit"
                                        className="text-white inline-flex items-center bg-gray-600 font-medium  text-sm px-5 py-2.5 "
                                    >
                                        <svg
                                            className="me-1 -ms-1 w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Add new blog
                                    </button>
                                {error && <div className='w-full p-2 text-center text-red-600 mt-5'>
                                    {error}
                                </div>}
                            </form>
                        </div>
                    </div>
                </div>
                )}
        </div>
    );
};

export default AddBlog;
