'use client';

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { GetMockInterview } from '../../../../../../api/ai/mockInterview';
import Webcam from 'react-webcam'
import { LuLightbulb } from "react-icons/lu";
import Navbar from '../../../../../../ui/Navbar';
import { candidateLinks } from '@/app/types/ui';
import Link from 'next/link';

const InterviewPage = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [data, setData] = useState<any>(null);
    const [webCamEnbled, setWebCamEnbled] = useState<boolean>(false);

    useEffect(() => {
        const fetchInterview = async () => {
            if (id) {
                try {
                    const res = await GetMockInterview(id);
                    if (res) {
                        setData(res?.data);
                    }
                } catch (error) {
                    console.error('Failed to fetch interview:', error);
                }
            }
        };

        fetchInterview();
    }, []);

    return (
        <div>
            <Navbar navLinks={candidateLinks} />
            <div className=" w-full h-full flex flex-col justify-center items-center p-10">
                <h1 className='text-3xl font-semibold'>Let's Get Started </h1>
                <div className="mt-20 flex justify-evenly  w-full">
                    <div className='max-w-2/5 '>
                        <div className="flex flex-col shadow-2xl gap-5 bg-[#202020] p-10 rounded-lg">
                            <h1 className='text-xl text-blue-700'><span className='font-medium text-white'>Job Role/Job Position : </span>{data?.jobPosition}</h1>
                            <h1 className='text-xl text-blue-700'><span className='font-medium text-white'>Job Description/ Tech Stack : </span>{data?.jobDescription}</h1>
                            <h1 className='text-xl text-blue-700'><span className='font-medium text-white'>Years of Experience : </span>{data?.jobExperience}</h1>
                            <h1 className='text-xl text-blue-700'><span className='font-medium text-white'>Difficulty Mode : </span>{data?.mode}</h1>
                            <h1 className='text-xl text-blue-700'><span className='font-medium text-white'>Number of Questions : </span>{data?.numberOfQuestions}</h1>
                        </div>
                        <div className="border w-full h-fit p-6 rounded-lg mt-10 border-yellow-600 text-amber-600 bg-[#dddd2c19]">
                            <h1 className='flex items-center mb-2 font-medium gap-1'><LuLightbulb />Information</h1>
                            <p>
                                Enable Video Web Cam and Microphone to Start your Al Generated Mock Interview, It Has 5 question which you can answer and at the last you will get the report on the basis of your answer. NOTE: We never record your video, Web cam access you can disable at any time if you want
                            </p>
                        </div>
                    </div>
                    <div className='w-2/5 h-[460px] overflow-hidden sticky top-36 '>
                        {
                            webCamEnbled
                                ?
                                <div className='w-full flex flex-col justify-between items-center gap-6'>
                                    <Webcam
                                        onUserMedia={() => setWebCamEnbled(true)}
                                        onUserMediaError={() => setWebCamEnbled(false)}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: '10px',
                                            boxShadow: "10px"
                                        }}
                                    />
                                    <Link href={`/candidate/syncAi/mockInterviewer/start?id=${id}`}>
                                        < button
                                            className='bg-sky-600 px-6 py-1.5  rounded-full font-medium cursor-pointer hover:scale-105 duration-200  shadow-2xl'>Start Interview</button>
                                    </Link>
                                </div>
                                :
                                <div className='flex flex-col items-center justify-between h-full'>
                                    < div className="bg-[#272727d1] w-full h-[350px] flex justify-center items-center rounded-lg shadow-2xl">
                                        <img src="/webcam.png" className="" />
                                    </div>
                                    <button
                                        onClick={() => setWebCamEnbled(true)}
                                        className='text-blue-500 font-medium hover:underline hover:underline-blue-500 cursor-pointer'>Enable Web Cam and Microphone</button>
                                    <Link href={`/candidate/syncAi/mockInterviewer/start?id=${id}`}>
                                        < button
                                            className='bg-sky-600 px-6 py-1.5  rounded-full font-medium cursor-pointer hover:scale-105 duration-200  shadow-2xl'>Start Interview</button>
                                    </Link>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div >
    );
};

export default InterviewPage;
