import React, { useState } from 'react';
import LoginForm from "./LoginForm.jsx";
import RegisterForm from "./RegisterForm.jsx";

const Tabs = () => {
    const [activeTab, setActiveTab] = useState(1);

    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber);
    };

    return (
        <div className="w-[100%] h-[100%]  flex flex-col items-center font-mono  px-10 py-5">
            <div className=" w-full h-[10%] flex flex-row space-x-4 bg-white">
                <button
                    onClick={() => handleTabClick(1)}
                    className={`py-2 px-8 ${
                        activeTab === 1 ? 'border-b border-b-black text-black' : ''
                    } focus:outline-none`}
                >
                    login
                </button>
                <button
                    onClick={() => handleTabClick(2)}
                    className={`py-2 px-8 ${
                        activeTab === 2 ? 'border-b text-black border-b-black ' : ''
                    } focus:outline-none`}
                >
                    sign-up
                </button>

            </div>

            <div className="mt-4 w-full h-[80%]">
                {activeTab === 1 && <LoginForm />}
                {activeTab === 2 && <RegisterForm />}
            </div>
        </div>
    );
};

export default Tabs;
