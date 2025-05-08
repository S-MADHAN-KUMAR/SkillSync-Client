'use client';

import dynamic from 'next/dynamic';

// Only import on client
const RecordBtn = dynamic(() => import('../../../../../../components/ai/RecordBtn'), {
    ssr: false,
});
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { getMockInterview } from '../../../../../../api/ai/mockInterview';
import Navbar from '../../../../../../ui/Navbar';
import { candidateLinks } from '@/app/types/ui';
import { LuLightbulb } from 'react-icons/lu';
import { TypingEffect } from '../../../../../../animations/TypingEffect';
import Webcam from 'react-webcam';
// import RecordBtn from '../../../../../../components/ai/RecordBtn';

const page = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [data, setData] = useState<any>(null);
    const [webCamEnbled, setWebCamEnbled] = useState<boolean>(false);
    const [transcript, setTranscript] = useState<string>('');
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number | null>(0);

    useEffect(() => {
        const fetchInterview = async () => {
            if (id) {
                try {
                    const res = await getMockInterview(id);
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

    const handleQuestionClick = (index: number) => {
        setSelectedQuestionIndex(index);
    };

    const selectedQuestion = selectedQuestionIndex !== null ? data?.jsonMockResp?.[selectedQuestionIndex] : null;

    return (
        <div>
            <Navbar navLinks={candidateLinks} />
            <div className="flex justify-evenly w-full h-full p-10 items-start">
                {/* Questions */}
                <div className='w-5/11 h-full flex flex-col p-5'>
                    <div className='bg-[#22212190] p-5 rounded-lg'>

                        <div className="flex flex-wrap w-full justify-start gap-4 ">
                            {
                                data?.jsonMockResp?.map((_: any, index: any) => (
                                    <p
                                        key={index}
                                        onClick={() => handleQuestionClick(index)}
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
                    <div className="w-full bg-black h-[350px] flex justify-center items-center rounded-lg shadow-2xl ">
                        <img src="/webcam.png" />
                        <Webcam
                            mirrored={true}
                            style={{
                                width: "full",
                                height: "full"

                            }}
                        />
                    </div>
                    <RecordBtn onTranscriptUpdate={setTranscript} />
                </div>
            </div >
        </div >
    )
}

export default page