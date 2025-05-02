import React, { useEffect, useState } from 'react';
import { BsPersonWorkspace } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { TfiWorld } from 'react-icons/tfi';
import { IoIosSettings } from 'react-icons/io';
import CompanyInfo from '../dashboard-settings/CompanyInfo';
import FoundingInfo from '../dashboard-settings/FoundingInfo';
import SocialMediaProfile from '../dashboard-settings/SocialMediaProfile';
import AccountSetting from '../dashboard-settings/AccountSetting';

const Setting = () => {
    const [activeTab, setActiveTab] = useState('companyInfo');



    const renderComponent = () => {


        switch (activeTab) {
            case 'companyInfo':
                return <CompanyInfo />;
            case 'foundingInfo':
                return <FoundingInfo />;
            case 'socialMedia':
                return <SocialMediaProfile />;
            case 'accountSettings':
                return <AccountSetting />;
            default:
                return <CompanyInfo />;
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-medium ">Settings</h1>
            <div className="flex items-center gap-10 mt-10 mb-10">
                <p
                    onClick={() => setActiveTab('companyInfo')}
                    className={`cursor-pointer p-2 flex gap-2 items-center  ${activeTab === 'companyInfo' ? 'text-blue-500 border-b-2 border-blue-500 ' : 'text-black dark:text-white'
                        }`}
                >
                    <BsPersonWorkspace className="w-4 h-4" />
                    Company Info
                </p>
                <p
                    onClick={() => setActiveTab('foundingInfo')}
                    className={`cursor-pointer p-2 flex gap-2 items-center   ${activeTab === 'foundingInfo' ? 'text-blue-500 border-b-2 border-blue-500 ' : 'text-black dark:text-white'
                        }`}
                >
                    <CgProfile className="w-4 h-4" />
                    Founding Info
                </p>
                <p
                    onClick={() => setActiveTab('socialMedia')}
                    className={`cursor-pointer p-2 flex gap-2 items-center   ${activeTab === 'socialMedia' ? 'text-blue-500 border-b-2 border-blue-500 ' : 'text-black dark:text-white'
                        }`}
                >
                    <TfiWorld className="w-4 h-4" />
                    Social Media Profile
                </p>
                <p
                    onClick={() => setActiveTab('accountSettings')}
                    className={`cursor-pointer p-2 flex gap-2 items-center   ${activeTab === 'accountSettings' ? 'text-blue-500 border-b-2 border-blue-500 ' : 'text-black dark:text-white'
                        }`}
                >
                    <IoIosSettings className="w-4 h-4" />
                    Account Settings
                </p>
            </div>

            {/* Dynamic Content Area */}
            <div className=" w-full mb-10">{renderComponent()}</div>
        </div>
    );
};

export default Setting;