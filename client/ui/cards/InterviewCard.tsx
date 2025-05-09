import React from 'react';
import Link from 'next/link';

interface InterviewData {
    jobPosition: string;
    jsonMockResp: JSON
    jobDescription: string
    jobExperience: number
    mode: string
    numberOfQuestions: number
    createdAt: Date
}

interface InterviewCardProps {
    data: InterviewData;
    id: string
}

const InterviewCard: React.FC<InterviewCardProps> = ({ data, id }) => {
    return (
        <div
            className="bg-[#1f1f1f] w-full h-full rounded-lg flex flex-col justify-between p-5 cursor-pointer hover:scale-105 duration-200">
            <h1 className='text-4xl font-semibold
             syncAi drop-shadow-2xl'>{data?.jobPosition}</h1>
            <h1>{data?.jobExperience} Years of Experience</h1>
            <p className='text-gray-400 text-sm'>created at : {new Date(data?.createdAt).toLocaleDateString()}</p>
            <div className="flex justify-between items-center w-full">
                <Link href={`/candidate/syncAi/mockInterviewer/feedback/${id}`}>
                    <button className='px-5 shadow-2xl  border border-gray-400 py-1.5 rounded cursor-pointer'>Feedback</button>
                </Link>

                <Link href={`/candidate/syncAi/mockInterviewer/start?id=${id}`}>
                    <button className='px-10 shadow-2xl  bg-blue-800 py-1.5 rounded cursor-pointer'>Start</button>
                </Link>
            </div>
        </div>
    );
};

export default InterviewCard;
