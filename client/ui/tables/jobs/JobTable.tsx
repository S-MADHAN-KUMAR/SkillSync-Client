import React from 'react';
import Pagination from '../../paginations/Pagination';
import JobTableRow from './JobTableRow';
import { JobTableProps } from '@/app/types/ui';

const JobTable: React.FC<JobTableProps> = ({
    jobPosts,
    onEdit,
    onDelete,
    onPageChange,
    page,
    totalPages,
}) => {
    return (
        <div>
            <h1 className="text-3xl font-medium mb-8">My Jobs</h1>
            <table className="min-w-full text-left dark:bg-[#1f1f1f] my-6">
                <thead>
                    <tr className="uppercase bg-[#d2d2d2] dark:bg-[#1f1f1f] dark:text-white">
                        <th className="py-2 text-center w-[400px]">Job</th>
                        <th className="py-2 px-4 text-center">Applications</th>
                        <th className="py-2 px-4 text-center">Status</th>
                        <th className="py-2 px-4 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {jobPosts.length > 0 ? (
                        jobPosts.map((post) => (
                            <JobTableRow
                                key={post._id}
                                post={post}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />
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
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                />
            )}
        </div>
    );
};

export default JobTable;
