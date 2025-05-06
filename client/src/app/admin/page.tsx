'use client'
import React, { useEffect, useState } from 'react';
import { BsPersonWorkspace } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { TfiWorld } from 'react-icons/tfi';
import { IoIosMoon, IoIosSettings, IoMdSunny } from 'react-icons/io';
import { useTheme } from 'next-themes';
import { adminLogout } from '../../../api/admin/auth';
import { useRouter } from 'next/navigation';
import Home from '../../../components/admin/Home';
import Candidates from '../../../components/admin/Candidates';
import Employees from '../../../components/admin/Employees';
import AiServices from '../../../components/admin/AiServices';
import GlowingButton from '../../../ui/GlowingButton';


const page = () => {
    const [activeTab, setActiveTab] = useState('home');
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };
    const router = useRouter();

    const renderComponent = () => {


        switch (activeTab) {
            case 'home':
                return <Home />;
            case 'candidates':
                return <Candidates />;
            case 'employees':
                return <Employees />;
            case 'aisevices':
                return <AiServices />;
            default:
                return <Home />;
        }
    };
    const handleLogout = async () => {
        await adminLogout(router)
    }
    return (
        <div className='w-full flex justify-between relative px-5 pt-15 pb-5 gap-5 h-[100vh]'>

            <div className="flex flex-col sticky top-26 justify-between h-full ">
                {/* Sidebar */}
                <div className="bg-[#d1dce8]  flex flex-col w-[250px] dark:bg-black p-6 rounded-lg h-fit text-black dark:text-white">
                    <div className="flex flex-col gap-5">
                        <p
                            onClick={() => setActiveTab("home")}
                            className={`cursor-pointer p-2 flex gap-2 items-center text-lg hover:bg-[#80808034] ${activeTab === "home" ? "text-blue-500 border-s-2 border-blue-500 bg-[#2b60bc2a]" : "text-black dark:text-white"}`}
                        >
                            <BsPersonWorkspace className='w-6 h-6' />
                            Home
                        </p>
                        <p
                            onClick={() => setActiveTab("candidates")}
                            className={`cursor-pointer p-2 flex gap-2 items-center text-lg hover:bg-[#80808034] ${activeTab === "candidates" ? "text-blue-500 border-s-2 border-blue-500 bg-[#2b60bc2a]" : "text-black dark:text-white"}`}
                        >
                            <CgProfile className='w-6 h-6' />
                            Candidates
                        </p>
                        <p
                            onClick={() => setActiveTab("employees")}
                            className={`cursor-pointer p-2 flex gap-2 items-center text-lg hover:bg-[#80808034] ${activeTab === "employees" ? "text-blue-500 border-s-2 border-blue-500 bg-[#2b60bc2a]" : "text-black dark:text-white"}`}
                        >
                            <TfiWorld className='w-6 h-6' />
                            Employees
                        </p>
                        <p
                            onClick={() => setActiveTab("aisevices")}
                            className={`cursor-pointer p-2 flex gap-2 items-center text-lg hover:bg-[#80808034] ${activeTab === "aisevices" ? "text-blue-500 border-s-2 border-blue-500 bg-[#2b60bc2a]" : "text-black dark:text-white"}`}
                        >
                            <IoIosSettings className='w-6 h-6' />
                            Ai Services
                        </p>

                    </div>
                </div>
                <div className="w-1/2" onClick={handleLogout}>
                    <GlowingButton className='py-1 w-full'>
                        logout
                    </GlowingButton>
                </div>
            </div>

            {/* Dynamic Content Area */}
            <div className="w-full bg-[#0b0b0b99] p-5 h-full">{renderComponent()}</div>

            <div className="cursor-pointer absolute top-4 right-4" onClick={toggleTheme}>
                {mounted && (
                    theme === 'light'
                        ? <IoIosMoon className="w-7 h-7 text-blue-900" />
                        : <IoMdSunny className="w-7 h-7 text-yellow-500" />
                )}
            </div>
        </div>
    );
};

export default page;