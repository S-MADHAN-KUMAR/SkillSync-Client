'use client';

import React, { useEffect, useState } from 'react';
import { GetMockInterview } from '../../../../../../../api/ai/mockInterview';
import Navbar from '../../../../../../../ui/Navbar';
import { candidateLinks } from '@/app/types/ui';
import { animate, useMotionValue, useTransform, motion } from 'framer-motion';
import { FaRegStar, FaStar } from 'react-icons/fa6';
import confetti from 'canvas-confetti';
import { FaStarHalfAlt } from 'react-icons/fa';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import Link from 'next/link';

const Page = ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const [data, setData] = useState<any>(null);
    const [expandedIndexes, setExpandedIndexes] = useState<{ [key: number]: boolean }>({});

    const ratings = data?.jsonMockAnswer?.map((item: any) => Number(item.rating) || 0) || [];
    const average = ratings.length ? ratings.reduce((a: number, b: number) => a + b, 0) / ratings.length : 0;

    const count = useMotionValue(0);
    const display = useTransform(count, (latest) => latest.toFixed(1));
    const [roundedDisplay, setRoundedDisplay] = useState('0.0');

    useEffect(() => {
        const controls = animate(count, average, {
            duration: 3,
            onUpdate: (v) => setRoundedDisplay(v.toFixed(1)),
        });
        return () => controls.stop();
    }, [average]);

    useEffect(() => {
        const fetchInterview = async () => {
            try {
                const res = await GetMockInterview(id);
                if (res) setData(res.data);
            } catch (error) {
                console.error('Failed to fetch interview:', error);
            }
        };

        fetchInterview();
    }, [id]);

    const success = () => {
        const count = 500;
        const defaults = { origin: { y: 0.7 } };

        const fire = (particleRatio: number, opts: any) => {
            confetti({
                ...defaults,
                ...opts,
                particleCount: Math.floor(count * particleRatio),
            });
        };

        fire(0.25, { spread: 120, startVelocity: 55 });
        fire(0.2, { spread: 150 });
        fire(0.35, { spread: 200, decay: 0.92, scalar: 1.0 });
        fire(0.1, { spread: 300, startVelocity: 30, decay: 0.93, scalar: 1.4 });
        fire(0.1, { spread: 400, startVelocity: 50, decay: 0.94 });
    };

    useEffect(() => {
        if (data?.jsonMockAnswer?.length > 0) {
            success();
        }
    }, [data]);

    const toggleExpand = (index: number) => {
        setExpandedIndexes((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    return (
        <div>
            <Navbar navLinks={candidateLinks} />
            {
                data?.jsonMockAnswer?.length > 0 ? (
                    <div className="p-8">
                        <motion.h1
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.4, ease: 'easeOut' }}
                            className="text-5xl text-center font-bold mb-2"
                        >
                            🎉 Congratulations!
                        </motion.h1>
                        <motion.h2
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.5, ease: 'easeOut' }}
                            className="text-xl text-center mb-10"
                        >
                            Here is your interview feedback
                        </motion.h2>

                        <motion.h1
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.6, ease: 'easeOut' }}
                            className="text-2xl font-semibold mb-6"
                        >
                            Your overall interview rating:{" "}
                            <motion.span className="text-green-400">{roundedDisplay}</motion.span>
                            <span className="text-gray-400"> / 10</span>
                        </motion.h1>

                        <motion.h2
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.5, ease: 'easeOut' }}
                            className="mb-4 text-lg text-gray-500"
                        >
                            Below are your interview questions, answers, and feedback for improvement:
                        </motion.h2>

                        {data?.jsonMockResp?.map((item: any, index: number) => {
                            const answerData = data.jsonMockAnswer?.[index];
                            const rating = Number(answerData?.rating || 0);
                            const userAnswer = answerData?.userAnswer || 'No answer provided.';
                            const feedback = answerData?.feedback || 'No feedback available.';
                            const correctAnswer = item?.answer || 'No correct answer provided.';
                            const isExpanded = expandedIndexes[index];

                            const fullStars = Math.floor(rating);
                            const hasHalfStar = rating % 1 >= 0.5;
                            const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

                            return (
                                <div key={index}>
                                    <motion.h3
                                        initial={{ opacity: 0, y: 100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.2, ease: 'easeOut' }}
                                        onClick={() => toggleExpand(index)}
                                        className="text-lg font-medium cursor-pointer rounded p-4 my-4 bg-[#222222b2] shadow-md flex justify-between w-full items-center"
                                    >
                                        Q{index + 1}: {item.question}
                                        {isExpanded ? <MdExpandLess className='w-5 h-5' /> : <MdExpandMore className='w-5 h-5' />}
                                    </motion.h3>

                                    {isExpanded && (
                                        <div className="mt-3 rounded-xl p-8 bg-[#070606] text-lg text-gray-200 flex flex-col gap-4">
                                            <motion.div
                                                initial={{ opacity: 0, y: 100 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3, delay: 0.3, ease: 'easeOut' }}
                                                className="flex items-center gap-2"
                                            >
                                                <h1 className="text-amber-400 text-lg font-semibold">Rating:</h1>
                                                <div className="flex text-yellow-500 gap-2">
                                                    {[...Array(fullStars)].map((_, i) => <FaStar key={`full-${i}`} />)}
                                                    {hasHalfStar && <FaStarHalfAlt />}
                                                    {[...Array(emptyStars)].map((_, i) => (
                                                        <motion.div
                                                            key={`empty-${i}`}
                                                            initial={{ opacity: 0, scale: 0 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
                                                        >
                                                            <FaRegStar />
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </motion.div>

                                            <motion.p
                                                initial={{ opacity: 0, y: 100 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3, delay: 0.4, ease: 'easeOut' }}
                                                className={rating > 1
                                                    ? "bg-[#0000ff11] p-4 rounded-lg border-blue-800 border"
                                                    : "bg-[#ff000011] p-4 rounded-lg border-red-800 border"}
                                            >
                                                <span className={rating > 1 ? "font-medium text-blue-600 me-2" : "font-medium text-red-600 me-2"}>
                                                    Your Answer:
                                                </span>
                                                {userAnswer}
                                            </motion.p>

                                            <motion.p
                                                initial={{ opacity: 0, y: 100 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3, delay: 0.5, ease: 'easeOut' }}
                                                className="bg-[#0b5a1611] p-4 rounded-lg border-green-800 border"
                                            >
                                                <span className="font-medium text-green-600 me-2">Correct Answer:</span>
                                                {correctAnswer}
                                            </motion.p>

                                            <motion.p
                                                initial={{ opacity: 0, y: 100 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3, delay: 0.6, ease: 'easeOut' }}
                                                className="bg-[#2e490a11] p-4 rounded-lg border-yellow-800 border"
                                            >
                                                <span className="font-medium text-yellow-600 me-2">Feedback:</span>
                                                {feedback}
                                            </motion.p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-20 text-gray-400 text-xl font-semibold flex flex-col justify-center items-center h-[70vh] ">
                        No interview data available yet. Please complete your mock interview to view feedback here.
                    </div>
                )
            }
            <div className="w-full flex justify-end p-10 ">
                <Link href="/candidate/syncAi/mockInterviewer">
                    <button className="ml-auto bg-blue-800 px-6 py-2 text-lg font-medium rounded cursor-pointer">
                        Go to dashboard
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Page;
