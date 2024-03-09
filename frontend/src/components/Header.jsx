import React from "react";
import { RiSearch2Line } from "react-icons/ri";
import AddBlog from "./AddBlog.jsx";

const Header = ({ user, setSearch, handleSearch,  search }) => {
    const handleSearchChange = (e) => {

          const value = e.target.value;

            setSearch(value)
            handleSearch();


    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        handleSearch();
        //clear()
    };

    return (
        <div className='w-full h-auto py-5 mb-10 md:mb-32 mt-5 flex flex-col md:flex-row justify-center items-center gap-10'>
            <form className="w-full md:w-[30%] max-w-xl" onSubmit={handleSearchSubmit}>
                <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
                    Search
                </label>
                <div className="relative">
                    <button type="submit" className="absolute inset-y-0 start-0 flex items-center ps-5 cursor-pointer">
                        <RiSearch2Line color="black"  />
                    </button>
                    <input
                        type='search'
                        id='search'
                        className=' w-full p-4 ps-14 text-sm text-gray-900 border-2 border-black outline-none focus:outline-none  cursor-pointer '
                        placeholder='Search by the first words of the  title'
                        name='search'
                        value={search}  // Ensure the input value is controlled
                        onChange={handleSearchChange}

                    />

                </div>
            </form>

            {user && (
                <AddBlog />
            )}
        </div>
    );
};

export default Header;
