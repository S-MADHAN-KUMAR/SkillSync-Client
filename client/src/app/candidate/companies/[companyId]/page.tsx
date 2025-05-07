'use client';

import { EmployeeDataType } from '@/app/types/employee';
import React, { useEffect, useState } from 'react';
import { GetEmployeeDetails } from '../../../../../api/employee/employee';
import Navbar from '../../../../../ui/Navbar';
import { candidateLinks } from '@/app/types/ui';
import ExpandableText from '../../../../../ui/ExpandableText';
import Footer from '../../../../../components/general/Footer';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const EmployeePage = ({ params }: { params: { companyId: string } }) => {
    const router = useRouter()
    const [company, setCompany] = useState<EmployeeDataType | null>(null);
    console.log(params);

    useEffect(() => {
        const fetchData = async () => {
            const id = params.companyId;
            if (!id) {
                console.error('No companyId found in params');
                return;
            }
            const res = await GetEmployeeDetails(id);
            if (res) setCompany(res.employee);
            console.log(res);
        };

        fetchData();
    }, [params.companyId]);

    const baseDelay = 0.2;
    return (
        <div>
            <Navbar navLinks={candidateLinks} />
            <div className="min-h-[90vh] w-full pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: baseDelay * 1 }}
                    className="relative"
                >
                    <img src={company?.logo} className="md:h-56 w-45 md:w-56 w-45 rounded-full object-cover border-4 border-[#121212] absolute top-36 md:left-30 right-10" />
                    <img src={company?.banner} className="h-60 w-full object-cover" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: baseDelay * 2 }}
                    className="h-full"
                >
                    <div className="md:ml-88 ml-5 p-2 flex flex-col gap-2">
                        <h1 className='text-6xl font-semibold'>{company?.companyName}</h1>
                        <p className='text-lg text-blue-600/70'>{company?.companyType}</p>
                        <div className="flex">
                            {company?.industryTypes?.split(',').slice(0, 3).map((industry, index) => (
                                <span
                                    key={index}
                                    className="text-sm text-gray-100 bg-blue-800/60 px-2 py-1 rounded mr-2"
                                >
                                    {industry}
                                </span>
                            ))}
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: baseDelay * 3 }}
                        className="md:mx-20 mt-10 h-full"
                    >
                        <div className="flex md:flex-row flex-col justify-between gap-20">
                            <div className="flex flex-col md:w-2/3">
                                <div className="p-5 rounded-lg h-fit">
                                    <h1 className='text-2xl font-medium mb-4'>About {company?.companyName}</h1>
                                    <ExpandableText
                                        className={'leading-loose'}
                                        maxLength={400}
                                        text={company?.aboutCompany || ''}
                                    />
                                </div>
                                <div className="p-5 rounded-lg mt-6">
                                    <h1 className='text-2xl font-medium mb-4'>Company vision {company?.companyName}</h1>
                                    <ExpandableText
                                        className={'leading-loose'}
                                        maxLength={300}
                                        text={company?.companyVision || ''}
                                    />
                                </div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 100 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: baseDelay * 4 }}
                                className="min-w-1/3 h-full flex justify-center flex-col items-center gap-20"
                            >
                                <div className="w-4/5 flex items-center justify-between bg-[#0b0b0bf6] rounded-lg py-5 px-8">
                                    <img src="/group.png" />
                                    <div className="bg-[#2a2727] text-[#2a2727] h-25">.</div>
                                    <div className="flex flex-col items-center gap-2">
                                        <h1 className='text-xl font-semibold'>Openings</h1>
                                        <h1 className='text-5xl syncAi font-bold'>{company?.jobPosts.length as number}</h1>
                                    </div>
                                </div>

                                <div className="rounded-lg flex-col gap-10 flex w-4/5">
                                    <h1 className='text-2xl font-medium text-center mx-auto'>Company Benefits</h1>
                                    <div className="flex flex-wrap items-center gap-6 justify-evenly">
                                        {company?.socialLinks.map((link, index) => (
                                            <div
                                                key={index}
                                                onClick={() => router.push(link.url)}
                                                className="px-4 py-1 rounded flex items-center gap-2 bg-[#041e5e80] cursor-pointer"
                                            >
                                                <img src="/connection.png" className="w-8" />
                                                <h1 className='text-lg font-medium'>{link.platform}</h1>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: baseDelay * 5 }}
                            className="p-5 rounded-lg md:mt-6 mt-20"
                        >
                            <h1 className='text-2xl font-medium mb-4'>Contact Information</h1>
                            <div className="flex md:flex-row flex-col md:gap-25 text-lg gap-5">
                                <div className="flex flex-col gap-5">
                                    <div className="flex items-center gap-5">
                                        <img src='/mail.png' className="w-10 h-10" />
                                        <p>{company?.companyEmail}</p>
                                    </div>
                                    <div className="flex items-center gap-5">
                                        <img src='/phone.png' className="w-10 h-10" />
                                        <p>{company?.companyPhone}</p>
                                    </div>
                                    <div className="flex items-center gap-5">
                                        <img src='/world.png' className="w-10 h-10" />
                                        <p>{company?.companyCountry}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-5">
                                    <div className="flex gap-5 w-100">
                                        <img src='/map.png' className="w-10 h-10" />
                                        <p>{company?.companyAddress}</p>
                                    </div>
                                    <div className="flex items-center gap-5">
                                        <img src='/state.png' className="w-10 h-10" />
                                        <p>{company?.companyState}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
            <Footer />
        </div >
    );
};

export default EmployeePage;
