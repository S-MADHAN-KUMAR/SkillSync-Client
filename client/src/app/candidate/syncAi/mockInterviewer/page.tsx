'use client'

import React, { useEffect, useState } from 'react';
import { candidateLinks } from '@/app/types/ui';
import { motion } from 'framer-motion';
import Navbar from '../../../../../ui/Navbar';
import GlowingButton from '../../../../../ui/GlowingButton';
import { IoMdAdd } from "react-icons/io";
import { useRouter } from 'next/navigation';
import { GetAllMockInterviews } from '../../../../../api/ai/mockInterview';
import InterviewCard from '../../../../../ui/cards/InterviewCard';

const Page = () => {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const fetchInterviews = async () => {
            try {
                const res = await GetAllMockInterviews();
                if (res) {
                    setData(res);
                }
            } catch (error) {
                console.error('Failed to fetch interview:', error);
            }
        };

        fetchInterviews();
    }, []);

    const router = useRouter()
    return (
        <div>
            <Navbar navLinks={candidateLinks} />

            {/* Landing Section */}
            <div
                style={{
                    backgroundImage: "url('/gradient.png')",
                    backgroundRepeat: "repeat",
                    backgroundPosition: "center",
                    backgroundSize: "contain",
                }}
                className="bg-black w-full h-[90vh] flex flex-col justify-center items-center"
            >
                <motion.h1
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.6, ease: 'easeOut' }}
                    className="text-6xl font-semibold text-center text-white"
                >
                    Your Personal AI Interview Coach
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.7, ease: 'easeOut' }}
                    className="text-xl text-gray-600 mt-5"
                >
                    Double your chances of landing that job offer with our AI-powered interview prep
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.8, ease: 'easeOut' }}
                    className="w-1/5 mt-10"
                >
                    <GlowingButton className="py-1.5 w-full" onClick={() => router.push('/candidate/syncAi/mockInterviewer/form')}>
                        Create Interview
                    </GlowingButton>
                </motion.div>

            </div>
            <div className="flex flex-col gap-10 w-full h-full min-h-[90vh] p-10 bg-[#0e0d0d]">
                <motion.h1
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2, ease: 'easeOut' }}
                    className='text-3xl font-semibold'>Dashboard</motion.h1>
                <div className="grid grid-cols-3  h-full gap-10 ">
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.3, ease: 'easeOut' }}
                        onClick={() => router.push('/candidate/syncAi/mockInterviewer/form')}
                        className="bg-[#1f1f1f] w-full h-[200px] rounded-lg flex justify-center items-center cursor-pointer hover:scale-105 duration-200">
                        <h1 className='text-2xl font-semibold flex items-center gap-2'>Add New <IoMdAdd className='w6 h-6' /></h1>
                    </motion.div>
                    {
                        data?.map((item: any, index: number) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 100 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.5 + index * 0.2, ease: 'easeOut' }}
                                className='w-full h-[200px]'
                            >
                                < InterviewCard data={item} id={item?._id} key={index} />
                            </motion.div>
                        ))
                    }
                </div>
            </div>

        </div >
    );
};

export default Page;
