'use client'
import React, { useState } from 'react';
import { BiLayer } from 'react-icons/bi';
import { MdWorkOutline } from 'react-icons/md';
import { FaRegBookmark } from 'react-icons/fa';
import { MdAddCircleOutline } from "react-icons/md";
import { IoMdSettings } from 'react-icons/io';
import Overview from '../../../../components/employee/dashboard/Overview';
import MyJobs from '../../../../components/employee/dashboard/MyJobs';
import PostJobs from '../../../../components/employee/dashboard/PostJobs';
import SavedCandidated from '../../../../components/employee/dashboard/SavedCandidated';
import Setting from '../../../../components/employee/dashboard/Setting';
import Navbar from '../../../../ui/Navbar';
import { employeeLinks } from '@/app/types/ui';
import GlowingButton from '../../../../ui/GlowingButton';
import { EmployeeLogout } from '../../../../api/auth/auth';
import { useRouter } from 'next/navigation';

export default function Page() {
    const [activeTab, setActiveTab] = useState("overview");
    const router = useRouter()
    const renderComponent = () => {
        switch (activeTab) {
            case "overview":
                return <Overview />;
            case "myjobs":
                return <MyJobs />;
            case "post":
                return <PostJobs />;
            case "saved":
                return <SavedCandidated />;
            case "settings":
                return <Setting />;
            default:
                return <Overview />;
        }
    };
    const handleLogout = async () => {
        await EmployeeLogout(router)
    }

    return (
        <div>
            <Navbar navLinks={employeeLinks} />
            <div className="w-[100vw] flex justify-between gap-10 pt-10 px-10">
                <div className="flex flex-col sticky top-26 justify-between h-[80vh]">
                    {/* Sidebar */}
                    <div className="bg-[#d1dce8]  flex flex-col w-[250px] dark:bg-black p-6 rounded-lg h-fit text-black dark:text-white">
                        <div className="flex flex-col gap-2">
                            <p
                                onClick={() => setActiveTab("overview")}
                                className={`cursor-pointer p-2 flex gap-2 items-center text-lg hover:bg-[#80808034] ${activeTab === "overview" ? "text-blue-500 border-s-2 border-blue-500 bg-[#2b60bc2a]" : "text-black dark:text-white"}`}
                            >
                                <BiLayer className='w-6 h-6' />
                                Overview
                            </p>
                            <p
                                onClick={() => setActiveTab("myjobs")}
                                className={`cursor-pointer p-2 flex gap-2 items-center text-lg hover:bg-[#80808034] ${activeTab === "myjobs" ? "text-blue-500 border-s-2 border-blue-500 bg-[#2b60bc2a]" : "text-black dark:text-white"}`}
                            >
                                <MdWorkOutline className='w-6 h-6' />
                                My Jobs
                            </p>
                            <p
                                onClick={() => setActiveTab("post")}
                                className={`cursor-pointer p-2 flex gap-2 items-center text-lg hover:bg-[#80808034] ${activeTab === "post" ? "text-blue-500 border-s-2 border-blue-500 bg-[#2b60bc2a]" : "text-black dark:text-white"}`}
                            >
                                <MdAddCircleOutline className='w-6 h-6' />
                                Post Jobs
                            </p>
                            <p
                                onClick={() => setActiveTab("saved")}
                                className={`cursor-pointer p-2 flex gap-2 items-center text-lg hover:bg-[#80808034] ${activeTab === "saved" ? "text-blue-500 border-s-2 border-blue-500 bg-[#2b60bc2a]" : "text-black dark:text-white"}`}
                            >
                                <FaRegBookmark className='w-6 h-6' />
                                Saved Candidated
                            </p>
                            <p
                                onClick={() => setActiveTab("settings")}
                                className={`cursor-pointer p-2 flex gap-2 items-center text-lg hover:bg-[#80808034] ${activeTab === "settings" ? "text-blue-500 border-s-2 border-blue-500 bg-[#2b60bc2a]" : "text-black dark:text-white"}`}
                            >
                                <IoMdSettings className='w-6 h-6' />
                                Settings
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
                <div className=" w-full mb-10">
                    {renderComponent()}
                </div>
            </div>
        </div>
    );
}
