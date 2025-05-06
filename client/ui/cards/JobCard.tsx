'use client'
import { FaLocationDot } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { JobPostFormValues } from "@/app/types/jobPost";

type Props = {
    data: JobPostFormValues | undefined;
};

const JobCard = ({ data }: Props) => {
    return (
        <Link href={`/candidate/jobs/${data?._id}`} prefetch>
            <div
                className='p-3 hover:scale-105 duration-100 cursor-pointer
                dark:bg-[#1f1f1f]
                bg-[#ffffff]
                text-left flex sm:flex-row flex-col justify-between gap-3 
                rounded-xl border border-[#b9b9b997] dark:border-0'
            >
                <Image
                    src={data?.logo || '/default-logo.png'}
                    alt="Company Logo"
                    width={80}
                    height={80}
                    className='rounded-lg border w-full sm:w-26 h-auto object-contain'
                />
                <div className="flex flex-col justify-around gap-2 w-full">
                    <h1 className='sm:text-xl font-medium'>{data?.jobTitle}</h1>
                    <div className="flex justify-center sm:flex-row flex-col items-start md:items-center gap-2">
                        <p className='bg-[#28cb28fa] whitespace-nowrap h-fit text-[10px] sm:text-xs text-white px-2 py-0.5 rounded-full'>
                            {data?.jobType}
                        </p>
                        <p className='dark:text-[#ffffffc9] text-sm font-medium text-[#222326]'>
                            Salary: ₹ {data?.minSalary} - ₹ {data?.maxSalary}
                        </p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className='dark:text-[#ffffff78] text-[10px] sm:text-xs font-medium text-[#22232689] flex items-center gap-1'>
                            <FaLocationDot className="w-3 h-3 inline" />
                            {data?.country}, {data?.state}
                        </p>
                        <FaRegBookmark className='text-gray-400 cursor-pointer w-5 h-5' />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default React.memo(JobCard);
