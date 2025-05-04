'use client'

import { RegisterFormValues } from '@/app/types/auth';
import { JobPostFormValues } from '@/app/types/jobPost';
import React, { useEffect, useState } from 'react'
import { FaLocationDot } from 'react-icons/fa6'
import { IoIosTimer } from "react-icons/io";
import { RiGroupLine } from "react-icons/ri";
import { GetRecentJobs } from '../../../api/jobPost/jobPost';

const Overview = () => {
    const [jobPosts, setJobPosts] = useState<JobPostFormValues[]>([]);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<RegisterFormValues | null>(null);
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(5)
    useEffect(() => {
        const storedUser = typeof window !== 'undefined' ? localStorage.getItem('employee') : null;
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const fetchAllJobPosts = async () => {
        try {
            setLoading(true);
            const res = await GetRecentJobs(page, limit)
            if (Array.isArray(res)) {
                setJobPosts(res);
            } else if (res?.data && Array.isArray(res.data)) {
                setJobPosts(res.data);
            } else {
                console.error('Unexpected job posts format:', res);
                setJobPosts([]);
            }
        } catch (err: any) {
            console.error('Error fetching jobs:', err);
            setJobPosts([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAllJobPosts();
    }, []);

    return (
        <div className='h-fit w-full'>
            <h1 className='text-5xl font-bold mb-5'>Hello, {user?.name}</h1>
            <p className='text-lg text-gray-500 mb-10'>Here is your daily activities and applications</p>

            <div className="flex items-center gap-5">
                <div className="hover:scale-105 duration-300 w-full flex justify-evenly items-center bg-[#45f7d4] h-25 rounded-lg">
                    <div className="flex flex-col">
                        <h1 className='text-black text-4xl font-extrabold'>780</h1>
                        <p className='font-semibold text-[#000000d4]'>Saved Jobs</p>
                    </div>
                    <img src="/savedcandidates.png" className="w-20" />
                </div>
                <div className="hover:scale-105 duration-300 w-full flex justify-evenly items-center bg-[#fad85c] h-25 rounded-lg">
                    <div className="flex flex-col">
                        <h1 className='text-black text-4xl font-extrabold'>780</h1>
                        <p className='font-semibold text-[#000000d4]'>My Applications</p>
                    </div>
                    <img src="/applications.png" className="w-20" />
                </div>
                <div className="hover:scale-105 duration-300 w-full flex justify-evenly items-center bg-[#f2a1ff] h-25 rounded-lg">
                    <div className="flex flex-col">
                        <h1 className='text-black text-4xl font-extrabold'>{jobPosts.length}</h1>
                        <p className='font-semibold text-[#000000d4]'>My Job</p>
                    </div>
                    <img src="/myjobs.png" className="w-20" />
                </div>
            </div>

            <p className='text-2xl mt-10'>Recently posted job</p>

            {loading ? (
                <div className="text-center py-10 text-xl font-medium">
                    Loading jobs...
                </div>
            ) : (
                <table className="dark:bg-[#1f1f1f] mt-10 min-w-full text-left">
                    <thead>
                        <tr className="dark:bg-[#1f1f1f] bg-[#d2d2d2] uppercase dark:text-[white]">
                            <th className="py-2 w-[400px] text-center">Job</th>
                            <th className="py-2 px-4 text-center">Applications</th>
                            <th className="py-2 px-4 text-center">Status</th>
                            <th className="py-2 px-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(jobPosts) && jobPosts.length > 0 ? (
                            jobPosts.map((post, index) => (
                                <tr key={index} className='dark:bg-[black] dark:border-[#1f1f1f] border-b border-[#d1d1d1]'>
                                    <td className='px-5 flex gap-3 py-5'>
                                        <img
                                            src="https://media.licdn.com/dms/image/v2/D560BAQGtwKUNwBubxg/company-logo_100_100/company-logo_100_100/0/1688144190823/microsoft_azure_logo?e=1750291200&v=beta&t=mn8rvD8AW82f74Vd0n91jMZ2YGOk2jAgLhmM36lDkjw"
                                            className="w-18"
                                        />
                                        <div className="flex flex-col justify-between w-full">
                                            <div className="flex flex-col justify-between gap-1">
                                                <div className="flex items-center justify-between">
                                                    <h1 className='text-xl font-medium'>{post?.jobTitle}</h1>
                                                    <p className='text-[white] text-xs rounded-full bg-[#0740ece7] dark:bg-[#0740ec60] h-fit px-3 py-0.5'>
                                                        {post?.jobType}
                                                    </p>
                                                </div>
                                                <p className='dark:text-[#ffffffc9] text-sm text-[#222326]'>
                                                    Salary : ₹ {post?.minSalary} - ₹ {post?.maxSalary}
                                                </p>
                                                <div className="flex justify-between items-center">
                                                    <p className='text-xs text-[gray] flex items-center gap-1'>
                                                        <FaLocationDot className="w-3 h-3 inline" />
                                                        {post?.country}, {post?.state}
                                                    </p>
                                                    <p className='text-xs text-[gray] flex items-center gap-1'>
                                                        <IoIosTimer />
                                                        {Math.ceil((new Date(post?.expiredAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days remaining
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='text-center'>
                                        <p className='text-[gray] text-sm flex items-center font-medium justify-center gap-2'>
                                            <RiGroupLine className='w-4 h-4' />
                                            400 Applications
                                        </p>
                                    </td>
                                    <td className='text-center text-white'>
                                        <p className={post?.status
                                            ? 'bg-[#0ed00e] dark:bg-[#0ed00e78] w-fit p-1 px-4 rounded-full text-sm font-medium mx-auto'
                                            : 'bg-red-500 dark:bg-red-500 w-fit p-1 px-4 rounded-full text-sm font-medium mx-auto'}>
                                            {post?.status ? 'Active' : 'Blocked'}
                                        </p>
                                    </td>
                                    <td className='text-center text-white'>
                                        <p className="dark:bg-[#1f2def78] bg-[#1f2def] w-fit p-2 px-4 rounded text-sm font-medium mx-auto">
                                            View Applications
                                        </p>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="text-center py-10">
                                    No job posts found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default Overview
