'use client';

import { JobPostFormValues } from '@/app/types/jobPost';
import React, { useEffect, useState } from 'react';
import { FaBookmark, FaLocationDot } from 'react-icons/fa6';
import { FaMapLocationDot } from "react-icons/fa6";
import { GetJob } from '../../../../../api/jobPost/jobPost';
import Navbar from '../../../../../ui/Navbar';
import { candidateLinks } from '@/app/types/ui';

const Page = ({ params }: { params: Promise<{ jobId: string }> }) => {
    const [jobId, setJobId] = useState<string | null>(null);
    const [jobPost, setJobPost] = useState<JobPostFormValues | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const unwrappedParams = await params;
            const id = unwrappedParams.jobId;
            setJobId(id);

            const res = await GetJob(id);
            if (res) setJobPost(res);
            console.log(res);
        };

        fetchData();
    }, []);


    return (
        <div>
            <Navbar navLinks={candidateLinks} />
            <div className="flex justify-evenly w-full p-10 mb-20 dark:bg-[#0e0e0e] bg-[white]">
                {/* 1 */}
                <div className=" w-3/6 flex flex-col gap-10">
                    {/* logo & title */}
                    <div className=" flex gap-5">
                        <div className="w-[160px]  rounded-lg overflow-hidden">
                            <img src={jobPost?.logo} alt="Company Logo" />
                        </div>
                        <div className=" flex flex-col justify-evenly p-2 w-2/3 ">
                            <h1 className="text-gray-800 dark:text-gray-100 font-semibold text-4xl">{jobPost?.jobTitle}</h1>
                            <p className='text-lg text-gray-500 dark:text-blue-400'>at {jobPost?.companyName}</p>

                            <p className='bg-green-600 text-white w-fit px-4 py-0.5 rounded'>{jobPost?.jobType}</p>
                        </div>
                    </div>
                    {/* descriptins */}
                    <div className=" flex flex-col gap-4 ">
                        <h1 className='text-gray-800 dark:text-gray-200 text-2xl font-semibold'>Job Description</h1>
                        <p className='text-gray-600 text-lg dark:text-gray-300'>
                            {jobPost?.jobDescription}
                        </p>
                    </div>
                    <div className=" flex flex-col gap-4" >
                        <h1 className='mb-10 text-gray-800 dark:text-gray-200 text-2xl font-semibold'>Job Requirements</h1>
                        <div className='flex flex-col gap-2  '>
                            <h1 className='text-lg font-semibold text-gray-800 dark:text-gray-200'>Education :</h1>
                            <p className='text-gray-600 text-lg dark:text-gray-400'>
                                {jobPost?.education}
                            </p>
                        </div>
                        <hr className='text-gray-600 ' />
                        <div className='flex flex-col gap-2'>
                            <h1 className='text-lg font-semibold text-gray-800 dark:text-gray-200'>Experience :</h1>
                            <p className='text-gray-600 text-lg dark:text-gray-400'>
                                {jobPost?.experience}
                            </p>
                        </div>
                        <hr className='text-gray-600 ' />
                        <div className='flex flex-col gap-2'>
                            <h1 className='text-lg font-semibold text-gray-800 dark:text-gray-200'>Job Level :</h1>
                            <p className='text-gray-600 text-lg dark:text-gray-400'>
                                {jobPost?.jobLevel}
                            </p>
                        </div>
                        <hr className='text-gray-600 ' />
                        <div className='flex flex-col gap-2'>
                            <h1 className='text-lg font-semibold text-gray-800 dark:text-gray-200'>Vacancies :</h1>
                            <p className='text-gray-600 text-lg dark:text-gray-400'>
                                {jobPost?.vacancies}
                            </p>
                        </div>
                        <hr className='text-gray-600 ' />
                    </div>

                </div>
                {/* 2 */}
                <div className=" flex flex-col w-3/7 gap-10">
                    {/* apply-btn */}
                    <div className=" flex items-center ms-auto gap-5">
                        <div className="dark:bg-[#000000] bg-blue-200 p-3 rounded">
                            <FaBookmark className='w-5 h-5 text-blue-800 dark:text-gray-200' />
                        </div>
                        <button className="bg-blue-600 text-white px-6 py-2 rounded text-xl">Apply Now</button>
                    </div>

                    <div className="border-2 flex justify-between rounded-lg p-6 dark:bg-[#1c1c1c] bg-gray-50">
                        <div className="border-r-2 w-1/2 h-full flex flex-col gap-3 justify-center items-center ">
                            <h1 className='font-medium text-lg text-gray-800 dark:text-gray-300'>₹ Salary</h1>
                            <h1 className='text-xl font-semibold text-green-600'>₹ {jobPost?.minSalary} - ₹ {jobPost?.maxSalary}</h1>
                            <p className='font-medium text-gray-500'>{jobPost?.
                                salaryType}</p>
                        </div>
                        <div className="flex flex-col items-center justify-center w-1/2 gap-4">
                            <FaMapLocationDot className='w-10 h-10 text-blue-400' />
                            <p className='dark:text-[#ffffff78]  dark:font-normal font-medium text-[#22232689] flex items-center gap-1'>
                                <FaLocationDot className="w-4 h-4 inline " />
                                {jobPost?.country} , {jobPost?.state}
                            </p>
                        </div>
                    </div>

                    <div className=" flex flex-col gap-6 px-6">
                        <h1 className='font-medium text-2xl text-gray-800 dark:text-gray-300'>Skills :</h1>
                        <div className=" flex flex-wrap gap-4">
                            {
                                jobPost?.tags.map((tag, index) => (
                                    <p
                                        className='hover:scale-105 duration-150 bg-blue-100 px-6 py-2 flex justify-center items-center rounded text-blue-800 border-blue-200 border-2 dark:border-0 dark:bg-[#1f1f1f] dark:text-gray-100'
                                        key={index}>{tag}</p>
                                ))
                            }
                        </div>
                    </div>
                    <div className=" flex flex-col gap-4 px-6">
                        <h1 className='font-medium text-2xl text-gray-800 dark:text-gray-300'>Job Benefits :</h1>
                        <div className=" flex flex-wrap  gap-4">
                            {
                                jobPost?.jobBenefits.map((tag, index) => (
                                    <p
                                        className='hover:scale-105 duration-150 bg-blue-100 px-6 py-2 flex justify-center items-center rounded text-blue-800 border-blue-200 border-2 dark:border-0 dark:bg-[#1f1f1f] dark:text-gray-100'
                                        key={index}>{tag}</p>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Page;
