// Importing necessary React features and icons
import React, { useState } from 'react';
import { RiArrowRightCircleFill, RiCloseFill } from "react-icons/ri";
import { RxAvatar } from "react-icons/rx";

// Functional component for displaying blog details and a modal for extended content
const BlogDetails = ({ content, title, time, author }) => {
    // State variable to manage the modal's open/closed state
    const [isModalOpen, setModalOpen] = useState(false);

    // Function to toggle the modal's open/closed state
    const toggleModal = () => {
        setModalOpen(!isModalOpen);
    };

    return (
        <div>
            {/* Link to trigger the modal */}
            <a
                onClick={toggleModal}
                className="inline-flex items-center justify-center gap-3 px-3  text-sm font-medium text-center text-gray-400 cursor-pointer "
            >
                Read more
                <RiArrowRightCircleFill size={20} />
            </a>

            {/* Main modal */}
            {isModalOpen && (
                <div
                    id="static-modal"
                    data-modal-backdrop="static"
                    tabIndex="-1"
                    aria-hidden="true"
                    className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] min-h-screen bg-gray-900 bg-opacity-50"
                >
                    {/* Modal container */}
                    <div className="relative p-4 w-full max-w-2xl max-h-full ">
                        {/* Modal content */}
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 ">
                            {/* Modal header */}
                            <div
                                className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 "
                            >
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
                                <button
                                    type="button"
                                    onClick={toggleModal}
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    <RiCloseFill size={20} />
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            {/* Modal body */}
                            <div className="p-4 md:p-5 overflow-auto  max-h-[70vh]">
                                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                    {content}
                                </p>
                            </div>
                            {/* Modal footer */}
                            <div
                                className="flex  justify-between items-center gap-10 p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600 text-gray-400"
                            >
                                <p className="  flex items-center gap-2 text-xl">
                                    <RxAvatar size={30} />  {author}
                                </p>
                                <p>{time}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Export the BlogDetails component as the default export
export default BlogDetails;
