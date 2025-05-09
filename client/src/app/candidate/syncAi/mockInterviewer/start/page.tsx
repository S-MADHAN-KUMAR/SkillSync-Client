'use client';

import RecordBtn from '../../../../../../components/ai/RecordBtn'
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { GetMockInterview } from '../../../../../../api/ai/mockInterview';
import Navbar from '../../../../../../ui/Navbar';
import { candidateLinks } from '@/app/types/ui';
import { LuLightbulb } from 'react-icons/lu';
import { TypingEffect } from '../../../../../../animations/TypingEffect';
import Webcam from 'react-webcam';
import { showToast } from '../../../../../../helpers/showToast';
import { FiVolume2 } from 'react-icons/fi';
import Link from 'next/link';

const page = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [data, setData] = useState<any>(null);
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number | null>(0);
    const [selectedQuestionId, setSelectedQuestionID] = useState<string | null>(null);
    const [cameraAllowed, setCameraAllowed] = useState<boolean | null>(null);
    const selectedQuestion = selectedQuestionIndex !== null ? data?.jsonMockResp?.[selectedQuestionIndex] : null;

    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then(() => setCameraAllowed(true))
            .catch(() => setCameraAllowed(false));
    }, []);

    interface MockInterviewResponse {
        jsonMockResp: {
            _id: string;
            question: string;
        }[];
    }

    useEffect(() => {
        const fetchInterview = async () => {
            if (id) {
                try {
                    const res = await GetMockInterview(id);
                    const responseData = res.data as MockInterviewResponse;

                    setData(responseData);

                    if (responseData?.jsonMockResp?.[0]?._id) {
                        setSelectedQuestionID(responseData.jsonMockResp[0]._id);
                    }
                } catch (error) {
                    console.error('Failed to fetch interview:', error);
                }
            }
        };

        fetchInterview();
    }, []);



    const handleQuestionClick = (index: number, id: string) => {
        setSelectedQuestionIndex(index);
        setSelectedQuestionID(id);
    };

    const txtToSpeech = (text: string) => {
        if ('speechSynthesis' in window) {
            const speech = new SpeechSynthesisUtterance(text)
            window.speechSynthesis.speak(speech)
        } else {
            showToast("Sorry your broeser doesn't support", 'dark', 'error')
        }
    }

    const handlePrevious = () => {
        if (selectedQuestionIndex !== null && selectedQuestionIndex > 0) {
            const newIndex = selectedQuestionIndex - 1;
            setSelectedQuestionIndex(newIndex);
            setSelectedQuestionID(data?.jsonMockResp?.[newIndex]?._id);
        }
    };

    const handleNext = () => {
        if (
            selectedQuestionIndex !== null &&
            data?.jsonMockResp &&
            selectedQuestionIndex < data.jsonMockResp.length - 1
        ) {
            const newIndex = selectedQuestionIndex + 1;
            setSelectedQuestionIndex(newIndex);
            setSelectedQuestionID(data?.jsonMockResp?.[newIndex]?._id);
        }
    };

    return (
        <div>
            <Navbar navLinks={candidateLinks} />
            <div className="flex justify-evenly w-full h-full p-10 items-start">
                {/* Questions */}
                <div className='w-5/11 h-full flex flex-col p-5'>
                    <div className='bg-[#22212190] p-5 rounded-lg'>

                        <div className="flex flex-wrap w-full justify-start gap-4 ">
                            {
                                data?.jsonMockResp?.map((item: any, index: any) => (
                                    <p
                                        key={index}
                                        onClick={() => handleQuestionClick(index, item?._id)}
                                        className={`py-1 px-6 border rounded-full transition duration-200 cursor-pointer ${selectedQuestionIndex === index
                                            ? 'bg-blue-600 text-white border-blue-600 font-semibold'
                                            : 'hover:bg-gray-800'
                                            }`}
                                    >
                                        Question #{index + 1}
                                    </p>
                                ))
                            }
                        </div>

                        {selectedQuestion && (
                            <div className="mt-14 p-4 border border-[#042484] rounded-lg bg-gray-900 overflow-hidden min-h-[100px]">
                                <motion.p
                                    className="text-lg leading-loose whitespace-pre-wrap"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2, duration: 0.3 }}
                                >
                                    <TypingEffect text={selectedQuestion.question} speed={20} />
                                    <FiVolume2 className='cursor-pointer mt-6' onClick={() => txtToSpeech(selectedQuestion.question)} />
                                </motion.p>
                            </div>
                        )}

                    </div>
                    <div className="border w-full h-fit p-6 rounded-lg mt-10 border-yellow-600 text-amber-600 bg-[#dddd2c19]">
                        <h1 className='flex items-center mb-2 font-medium gap-1'><LuLightbulb />Information</h1>
                        <p>
                            Click on Record Answer when you want to answer the question. At the end of interview we will give you the feedback along with correct answer for each of question and your answer to comapre it.
                        </p>
                    </div>

                </div>
                {/* Video */}
                <div className='w-5/11 flex flex-col items-center gap-4 p-5'>
                    <div className="w-full bg-black h-[350px] flex justify-center items-center rounded-lg shadow-2xl">
                        {cameraAllowed === null ? (
                            <p className="text-white">Checking camera permissions...</p>
                        ) : cameraAllowed ? (
                            <Webcam
                                mirrored={true}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    borderRadius: '0.5rem',
                                }}
                            />
                        ) : (
                            <img src="/webcam.png" alt="Camera not allowed" />
                        )}
                    </div>

                    <RecordBtn selectedQuestion={selectedQuestion} selectedQuestionId={selectedQuestionId as string} id={id as string} />

                    <div className="flex gap-5 mt-6">
                        {selectedQuestionIndex !== null && selectedQuestionIndex > 0 && (
                            <button
                                type="button"
                                onClick={handlePrevious}
                                className="px-6 py-1 bg-blue-900 text-white rounded hover:bg-blue-700 transition cursor-pointer"
                            >
                                Previous Question
                            </button>
                        )}

                        {selectedQuestionIndex !== null &&
                            data?.jsonMockResp &&
                            selectedQuestionIndex < data.jsonMockResp.length - 1 ? (
                            <button
                                type="button"
                                onClick={handleNext}
                                className="px-6 py-1 bg-blue-900 text-white rounded hover:bg-blue-700 transition cursor-pointer"
                            >
                                Next Question
                            </button>
                        ) : (
                            <Link href={`/candidate/syncAi/mockInterviewer/feedback/${id}`}>
                                <button
                                    type="button"
                                    className="px-6 py-1 bg-red-700 text-white rounded hover:bg-red-500 transition cursor-pointer"
                                >
                                    End Interview
                                </button>
                            </Link>
                        )}
                    </div>


                </div>
            </div >
        </div >
    )
}

export default page