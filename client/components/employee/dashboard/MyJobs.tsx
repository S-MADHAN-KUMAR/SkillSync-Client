// MyJobs.tsx
import React, { useEffect, useState } from 'react';
import { JobPostFormValues } from '@/app/types/jobPost';
import { RegisterFormValues } from '@/app/types/auth';
import { GetAllJobs, ToggleStatus } from '../../../api/jobPost/jobPost';
import EditJob from './EditJob';
import JobTable from '../../../ui/tables/jobs/JobTable';

const MyJobs = () => {
    const [jobs, setJobs] = useState<JobPostFormValues[]>([]);
    const [loading, setLoading] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [id, setId] = useState<string | null>(null);
    const [user, setUser] = useState<RegisterFormValues | null>(null);
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(3)
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

    const handleChangeStatus = async (id: string, status: string) => {
        try {
            await ToggleStatus(id, status)
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
            const res = await GetAllJobs(
                page,
                limit);
            if (res) {
                setJobs(res?.jobs);
                setTotalPages(res?.totalPages as number); // updated
                console.log(res);

            }
        } catch (error) {
            console.error('Error fetching jobs:', error);
            setJobs([]);
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
                <JobTable
                    jobPosts={jobs}
                    onEdit={handleEdit}
                    onDelete={handleChangeStatus}
                    onPageChange={handlePageChange}
                    page={page}
                    totalPages={totalPages}
                />
            )
            }
        </div >
    );
};

export default MyJobs;
