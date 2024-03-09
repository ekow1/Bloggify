import { useState } from "react";
import { useLogout } from "../hook/useLogout.js";
import { useAuthContext } from "../hook/useAuthContext.js";
import AddBlog from "./AddBlog.jsx";
import { NavLink } from "react-router-dom";
import { FiMenu } from "react-icons/fi"; // Import the menu icon from Feather Icons

const Navbar = () => {
    const { user } = useAuthContext();
    const { logout } = useLogout();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="w-full bg-white lg:flex lg:flex-col lg:justify-around">
            <div className="w-full h-20 lg:h-full flex justify-between items-center p-5 lg:p-10">
                <div className="flex justify-center items-center gap-3">
          <span className="px-5 py-2 rounded-full bg-slate-900 font-bold font-mono text-white text-4xl lg:text-5xl">
            B
          </span>
                    <h1 className="font-mono text-2xl lg:text-3xl font-bold">Bloggify</h1>
                </div>

                {/* Menu icon for smaller screens */}
                <div className="lg:hidden">
                    <FiMenu onClick={toggleMenu} className="text-2xl cursor-pointer" />
                </div>

                {user ? (
                    <div className="hidden lg:flex items-center justify-center text-xl lg:text-2xl">
                        {user.email}
                        <button
                            className="bg-transparent font-mono px-3 lg:px-5 ml-2"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="hidden lg:flex items-center gap-5 text-xl lg:text-2xl ">
                        <NavLink to="/auth">Create Blog</NavLink>
                        <NavLink to="/">Home</NavLink>
                    </div>
                )}
            </div>

            {/* Responsive Navigation for smaller screens */}
            {isMenuOpen && (
                <div className="lg:hidden flex flex-col items-center gap-5 text-xl">
                    {user ? (
                        <div>
                            {user.email}
                            <button
                                className="bg-transparent font-mono px-3 ml-2"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className=" w-[80%] h-[50%] flex flex-col lg:flex items-center gap-5 text-xl lg:text-2xl bg-slate-800 py-5 text-white">
                            <NavLink to="/auth">Create Blog</NavLink>
                            <NavLink to="/">Home</NavLink>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Navbar;
