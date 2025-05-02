// MyJobs.tsx
import React, { useEffect, useState } from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import { IoIosTimer } from 'react-icons/io';
import { RiGroupLine } from 'react-icons/ri';
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { JobPostFormValues } from '@/app/types/jobPost';
import { RegisterFormValues } from '@/app/types/auth';
import { GetAllJobs, RemoveJob } from '../../../api/jobPost/jobPost';
import Pagination from '../../../ui/paginations/Pagination';
import EditJob from './EditJob';

const MyJobs = () => {
    const [jobPosts, setJobPosts] = useState<JobPostFormValues[]>([]);
    const [loading, setLoading] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [id, setId] = useState<string | null>(null);
    const [user, setUser] = useState<RegisterFormValues | null>(null);
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(2)
    const [totalJobs, setTotalJobs] = useState<number>(0)
    const [totalPages, setTotalPages] = useState<number>(0);

    useEffect(() => {
        const storedUser = typeof window !== 'undefined' ? localStorage.getItem('employee') : null;
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleEdit = async (id: string) => {
        try {
            setEditOpen(true);
            setId(id)
        } catch (error) {
            console.error('Error fetching job:', error);
        }
    };

    const handleRemove = async (id: string) => {
        try {
            await RemoveJob(id)
            fetchAllJobPosts()
        } catch (error) {
            console.error(error);
        }
    };
    // Pagination handling
    const handlePageChange = (page: number) => {
        setPage(page);
    };

    const fetchAllJobPosts = async () => {
        try {
            setLoading(true);
            const res = await GetAllJobs(page, limit);
            if (res) {
                setJobPosts(res?.jobs);
                setTotalPages(res?.totalPages as number); // updated
                console.log(res);

            }
        } catch (error) {
            console.error('Error fetching jobs:', error);
            setJobPosts([]);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchAllJobPosts();
    }, [page, limit]);

    return (
        <div>
            {editOpen ? (
                <EditJob data={id || undefined} setEditOpen={setEditOpen} />

            ) : (
                <div>
                    <h1 className="text-3xl font-medium mb-8">My Jobs</h1>
                    <table className="min-w-full text-left dark:bg-[#1f1f1f] mt-6">
                        <thead>
                            <tr className="uppercase bg-[#d2d2d2] dark:bg-[#1f1f1f] dark:text-white">
                                <th className="py-2 text-center w-[400px]">Job</th>
                                <th className="py-2 px-4 text-center">Applications</th>
                                <th className="py-2 px-4 text-center">Status</th>
                                <th className="py-2 px-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(jobPosts) && jobPosts.length > 0 ? (
                                jobPosts.map((post, index) => (
                                    <tr key={index} className="border-b dark:border-[#1f1f1f] border-[#d1d1d1] dark:bg-black">
                                        <td className="px-5 py-5 flex gap-3">
                                            <img
                                                src="https://media.licdn.com/dms/image/v2/D560BAQGtwKUNwBubxg/company-logo_100_100/company-logo_100_100/0/1688144190823/microsoft_azure_logo?e=1750291200&v=beta&t=mn8rvD8AW82f74Vd0n91jMZ2YGOk2jAgLhmM36lDkjw"
                                                alt="Company Logo"
                                                className="w-18"
                                            />
                                            <div className="flex flex-col justify-between w-full">
                                                <div className="flex justify-between items-center">
                                                    <h1 className="text-xl font-medium">{post.jobTitle}</h1>
                                                    <span className="text-xs bg-[#0740ece7] dark:bg-[#0740ec60] text-white rounded-full px-3 py-0.5">
                                                        {post.jobType}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-[#222326] dark:text-[#ffffffc9]">
                                                    Salary: ₹{post.minSalary} - ₹{post.maxSalary}
                                                </p>
                                                <div className="flex justify-between items-center text-xs text-gray-500">
                                                    <span className="flex items-center gap-1">
                                                        <FaLocationDot className="w-3 h-3" />
                                                        {post.country}, {post.state}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <IoIosTimer />
                                                        {Math.ceil(
                                                            (new Date(post.experienceDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
                                                        )}{' '}
                                                        days remaining
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <div className="flex items-center justify-center gap-2 text-gray-500 font-medium text-sm">
                                                <RiGroupLine className="w-4 h-4" />
                                                400 Applications
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <span
                                                className={`text-sm font-medium rounded-full px-4 py-1 mx-auto ${post.status
                                                    ? 'bg-[#0ed00e] dark:bg-[#0ed00e78]'
                                                    : 'bg-red-500'
                                                    }`}
                                            >
                                                {post.status ? 'Active' : 'Blocked'}
                                            </span>
                                        </td>
                                        <td className="text-center px-5">
                                            <div className="flex flex-col gap-2 justify-center">
                                                <button className="bg-[#1f2def] dark:bg-[#1f2def78] text-white  py-2 rounded text-sm font-medium">
                                                    View Applications
                                                </button>
                                                <div className="flex justify-between">
                                                    <button
                                                        onClick={() => handleEdit(post._id as string)}
                                                        className="bg-green-500 text-white px-4 gap-2 rounded text-sm py-1 flex items-center font-medium cursor-pointer"
                                                    >
                                                        Edit Job
                                                        <FiEdit />
                                                    </button>
                                                    <button
                                                        onClick={() => handleRemove(post._id as string)}
                                                        className="bg-red-500 text-white px-4 gap-2 cursor-pointer rounded text-sm py-1 flex items-center font-medium cursor-pointe"
                                                    >
                                                        Remove Job
                                                        <MdDeleteOutline />
                                                    </button>
                                                </div>
                                            </div>
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
                    {jobPosts.length > 0 && (
                        <Pagination
                            totalPages={totalPages}
                            currentPage={page}
                            onPageChange={handlePageChange}
                        />
                    )}

                </div>
            )
            }
        </div >
    );
};

export default MyJobs;
