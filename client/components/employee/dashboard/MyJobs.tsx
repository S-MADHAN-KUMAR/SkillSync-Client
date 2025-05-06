import React, { useEffect, useState } from 'react';
import { JobPostFormValues } from '@/app/types/jobPost';
import { RegisterFormValues } from '@/app/types/auth';
import { GetJobs, ToggleStatus } from '../../../api/jobPost/jobPost';
import EditJob from './EditJob';
import JobTable from '../../../ui/tables/jobs/JobTable';
import { IoSearchSharp } from 'react-icons/io5';

const MyJobs = () => {
    const [jobs, setJobs] = useState<JobPostFormValues[]>([]);
    const [loading, setLoading] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [id, setId] = useState<string | null>(null);
    const [user, setUser] = useState<RegisterFormValues | null>(null);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(3);
    const [totalJobs, setTotalJobs] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [searchQuery, setSearchQuery] = useState<string>('')
    // Load user from localStorage once
    useEffect(() => {
        const storedUser = typeof window !== 'undefined' ? localStorage.getItem('employee') : null;
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleEdit = (id: string) => {
        setEditOpen(true);
        setId(id);
    };

    const handleChangeStatus = async (id: string, status: string) => {
        try {
            await ToggleStatus(id, status);
            fetchAllJobPosts();
        } catch (error) {
            console.error(error);
        }
    };

    const handlePageChange = (page: number) => {
        setPage(page);
    };

    const fetchAllJobPosts = async () => {
        if (!user?._id) return;
        try {
            setLoading(true);
            const res = await GetJobs(user._id, page, limit, searchQuery);
            if (res) {
                setJobs(res.jobs || []);
                setTotalPages(res.totalPages || 0);
                setTotalJobs(res.totalJobs || 0);
            }
        } catch (error) {
            console.error('Error fetching jobs:', error);
            setJobs([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?._id) {
            fetchAllJobPosts();
        }
    }, [user, page, limit, searchQuery]);

    return (
        <div>
            {editOpen ? (
                <EditJob data={id || undefined} setEditOpen={setEditOpen} />
            ) : (
                <>
                    <div className="flex items-center w-full justify-between">
                        <h1 className="text-3xl font-medium">My Jobs</h1>
                        <div className="relative w-7/12">
                            <input
                                type="text"
                                placeholder="Search jobs..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full p-2.5 px-10 rounded-sm dark:bg-[#1f1f1f] dark:text-white outline-none"
                            />
                            <IoSearchSharp className="absolute top-2.5 left-3 w-6 h-6 dark:text-white/30" />
                        </div>
                    </div>

                    <JobTable
                        jobPosts={jobs}
                        onEdit={handleEdit}
                        onDelete={handleChangeStatus}
                        onPageChange={handlePageChange}
                        page={page}
                        totalPages={totalPages}
                    />
                </>
            )}
        </div>
    );
};

export default MyJobs;
