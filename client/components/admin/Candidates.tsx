import { RegisterFormValues } from '@/app/types/auth'
import React, { useEffect, useState } from 'react'
import { IoSearchSharp } from 'react-icons/io5'
import { GetCandidates, ToggleStatus } from '../../api/admin/admin'
import Pagination from '../../ui/paginations/Pagination'

const Candidates = () => {
    const [candidates, setCandidates] = useState<RegisterFormValues[]>([])
    const [loading, setLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(1)
    const [totalPages, setTotalPages] = useState<number>(0)

    const fetchAllCandidates = async () => {
        try {
            setLoading(true);

            const res = await GetCandidates(
                page,
                limit,
                searchQuery,
            );

            if (res) {
                setCandidates(res.users);
                setTotalPages(res.totalPages as number);
            }
        } catch (err: any) {
            console.error('Error fetching job data:', err);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchAllCandidates()
    }, [page, limit, searchQuery])

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    }
    const handleChangeStatus = async (status: boolean, id: string, role: string) => {
        const Newstatus = !status;
        await ToggleStatus(id, role, Newstatus);
        fetchAllCandidates();
    }

    return (
        <div>
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
            {loading ? (
                <p className="text-lg">Loading...</p>
            ) : (
                <table className="dark:bg-[#1f1f1f] mt-10 min-w-full text-left">
                    <thead>
                        <tr className="dark:bg-[#1f1f1f] bg-[#d2d2d2] uppercase dark:text-[white]">
                            <th className="py-3 px-4 text-center">Image</th>
                            <th className="py-3 px-4 text-center">Name</th>
                            <th className="py-3 px-4 text-center">ID</th>
                            <th className="py-3 px-4 text-center">Status</th>
                            <th className="py-3 px-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className='bg-black'>
                        {candidates.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center py-6 text-gray-500">
                                    No candidates found.
                                </td>
                            </tr>
                        ) : (
                            candidates.map((candidate, index) => (
                                <tr key={index} className="border-y-2 dark:border-gray-700">
                                    <td className="p-5 text-center">
                                        <img
                                            src={candidate?.profile || '/default.png'}
                                            alt="Profile"
                                            className="w-14 h-14 rounded mx-auto object-cover"
                                        />
                                    </td>
                                    <td className="py-2 px-4 text-center text-lg">{candidate?.name}</td>
                                    <td className="py-2 px-4 text-center text-gray-400">{candidate?._id}</td>
                                    <td className="py-2 px-4 text-center">
                                        <p className={candidate?.status ? "py-1 px-3 rounded text-green-100 text-center bg-green-600" : "py-1 px-3 rounded text-red-100 text-center bg-red-600"}>
                                            {candidate?.status ? 'Active' : 'Blocked'}
                                        </p>
                                    </td>
                                    <td className="py-2 px-4 text-center">
                                        <p
                                            onClick={() => handleChangeStatus(candidate?.status ?? false, candidate?._id ?? '', candidate?.role ?? '')}
                                            className={`cursor-pointer py-1 px-3 rounded text-center 
      ${candidate?.status ? 'text-red-100 bg-red-600' : 'text-green-100 bg-green-600'}`}
                                        >
                                            {candidate?.status ? 'Block' : 'Unblock'}
                                        </p>
                                    </td>

                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            )}

            <Pagination
                totalPages={totalPages}
                currentPage={page}
                onPageChange={handlePageChange}
            />
        </div >
    )
}

export default Candidates