'use client';

import { JobPostFormValues } from '@/app/types/jobPost';
import React, { ReactElement, useEffect, useState } from 'react';
import { FaBookmark, FaLocationDot } from 'react-icons/fa6';
import { FaMapLocationDot } from "react-icons/fa6";
import { GetJob } from '../../../../../api/jobPost/jobPost';
import Navbar from '../../../../../ui/Navbar';
import { candidateLinks } from '@/app/types/ui';
import { motion } from 'framer-motion';
import Footer from '../../../../../components/general/Footer';

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

    const baseDelay = 0.2;
    return (
        <div>
            <Navbar navLinks={candidateLinks} />
            <div className="flex-col lg:flex-row md:justify-evenly w-full h-full px-10 pt-10 dark:bg-[#0e0e0e] bg-white pb-30 flex">
                {/* Left Section */}
                <div className="md:w-3/6 flex flex-col gap-10 mb-15 md:mb-0">
                    {/* Logo and Title */}
                    <div className="flex gap-5">
                        <motion.div
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: baseDelay * 1 }}
                            className="w-[160px] rounded-lg overflow-hidden"
                        >
                            <img src={jobPost?.logo} alt="Company Logo" />
                        </motion.div>

                        <div className="flex flex-col justify-evenly p-2 w-2/3">
                            <motion.h1
                                initial={{ opacity: 0, y: 100 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: baseDelay * 2 }}
                                className="text-gray-800 dark:text-gray-100 font-semibold text-4xl"
                            >
                                {jobPost?.jobTitle}
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 100 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: baseDelay * 3 }}
                                className="text-lg text-gray-500 dark:text-blue-400"
                            >
                                at {jobPost?.companyName}
                            </motion.p>

                            <motion.p
                                initial={{ opacity: 0, y: 100 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: baseDelay * 4 }}
                                className="bg-green-600 text-white w-fit px-4 py-0.5 rounded"
                            >
                                {jobPost?.jobType}
                            </motion.p>
                        </div>
                    </div>

                    {/* Description */}
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: baseDelay * 5 }}
                        className="flex flex-col gap-4"
                    >
                        <h1 className="text-gray-800 dark:text-gray-200 text-2xl font-semibold">Job Description</h1>
                        <p className="text-gray-600 text-lg dark:text-gray-300">{jobPost?.jobDescription}</p>
                    </motion.div>

                    {/* Requirements */}
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: baseDelay * 6 }}
                        className="flex flex-col gap-6"
                    >
                        <h1 className="mb-3 mt-10 text-gray-800 dark:text-gray-200 text-2xl font-semibold">Job Requirements</h1>
                        {['education', 'experience', 'jobLevel', 'vacancies'].map((field) => (
                            <div key={field} className="flex flex-col gap-2 bg-[#1f1f1f] p-5 rounded-lg">
                                <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-200 capitalize">
                                    {field} :
                                </h1>
                                <p className="text-gray-600 text-lg dark:text-gray-400">
                                    {String(jobPost?.[field as keyof typeof jobPost] ?? '')}
                                </p>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Right Section */}
                <div className="flex flex-col md:w-3/7 gap-10">
                    {/* Apply Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: baseDelay * 1 }}
                        className="flex items-center md:ms-auto gap-5"
                    >
                        <div className="dark:bg-[#000000] bg-blue-200 p-3 rounded">
                            <FaBookmark className="w-5 h-5 text-blue-800 dark:text-gray-200" />
                        </div>
                        <button className="bg-blue-600 text-white px-6 py-2 rounded text-xl">Apply Now</button>
                    </motion.div>

                    {/* Salary and Location */}
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: baseDelay * 2 }}
                        className="border-2 flex justify-between rounded-lg p-6 dark:bg-[#1c1c1c] bg-gray-50"
                    >
                        <div className="border-r-2 w-1/2 h-full flex flex-col gap-3 justify-center items-center">
                            <h1 className="font-medium text-lg text-gray-800 dark:text-gray-300">₹ Salary</h1>
                            <h1 className="text-xl font-semibold text-green-600">₹ {jobPost?.minSalary} - ₹ {jobPost?.maxSalary}</h1>
                            <p className="font-medium text-gray-500">{jobPost?.salaryType}</p>
                        </div>
                        <div className="flex flex-col items-center justify-center w-1/2 gap-4">
                            <FaMapLocationDot className="w-10 h-10 text-blue-400" />
                            <p className="dark:text-[#ffffff78] font-medium text-[#22232689] flex items-center gap-1">
                                <FaLocationDot className="w-4 h-4 inline" />
                                {jobPost?.country}, {jobPost?.state}
                            </p>
                        </div>
                    </motion.div>

                    {/* Skills */}
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: baseDelay * 3 }}
                        className="flex flex-col gap-6 px-6"
                    >
                        <h1 className="font-medium text-2xl text-gray-800 dark:text-gray-300">Skills :</h1>
                        <div className="flex flex-wrap gap-4">
                            {jobPost?.tags.map((tag, index) => (
                                <motion.p
                                    key={index}
                                    initial={{ opacity: 0, y: 60 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: baseDelay * (4 + index) }}
                                    className="hover:scale-105 duration-150 bg-blue-100 px-6 py-2 flex justify-center items-center rounded text-blue-800 border-blue-200 border-2 dark:border-0 dark:bg-[#1f1f1f] dark:text-gray-100"
                                >
                                    {tag}
                                </motion.p>
                            ))}
                        </div>
                    </motion.div>

                    {/* Job Benefits */}
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: baseDelay * 5 }}
                        className="flex flex-col gap-4 px-6"
                    >
                        <h1 className="font-medium text-2xl text-gray-800 dark:text-gray-300">Job Benefits :</h1>
                        <div className="flex flex-wrap gap-4">
                            {jobPost?.jobBenefits.map((benefit, index) => (
                                <motion.p
                                    key={index}
                                    initial={{ opacity: 0, y: 60 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: baseDelay * (6 + index) }}
                                    className="hover:scale-105 duration-150 bg-blue-100 px-6 py-2 flex justify-center items-center rounded text-blue-800 border-blue-200 border-2 dark:border-0 dark:bg-[#1f1f1f] dark:text-gray-100"
                                >
                                    {benefit}
                                </motion.p>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Page;
