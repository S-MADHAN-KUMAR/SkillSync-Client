'use client'

import { JobPostFormValues } from '@/app/types/jobPost'
import React, { useEffect, useState, useMemo } from 'react'
import { IoSearchSharp } from 'react-icons/io5'
import { GetAllJobs } from '../../../../api/jobPost/jobPost'
import Navbar from '../../../../ui/Navbar'
import { candidateLinks } from '@/app/types/ui'
import Pagination from '../../../../ui/paginations/Pagination'
import JobCard from '../../../../ui/cards/JobCard'
import Footer from '../../../../components/general/Footer'

const Page = () => {
    const [jobPosts, setJobPosts] = useState<JobPostFormValues[]>([])
    const [loading, setLoading] = useState(false)
    const [selectedType, setSelectedType] = useState<string>('All')
    const [selectedTag, setSelectedTag] = useState<string>('All')
    const [selectedLocation, setSelectedLocation] = useState<string>('All')
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(9)
    const [totalPages, setTotalPages] = useState<number>(0)

    useEffect(() => {
        const fetchAllJobPosts = async () => {
            try {
                setLoading(true);

                const res = await GetAllJobs(
                    page,
                    limit,
                    searchQuery,
                    selectedLocation,
                    selectedType,
                    selectedTag,
                    true,
                    new Date()
                );

                if (res) {
                    setJobPosts(res.jobs);
                    setTotalPages(res.totalPages as number);
                }
            } catch (err: any) {
                console.error('Error fetching job data:', err);
            } finally {
                setLoading(false);
            }
        };


        fetchAllJobPosts()
    }, [page, limit, searchQuery, selectedLocation, selectedType, selectedTag])

    const allTags = useMemo(() => {
        return Array.from(new Set(['All', ...jobPosts.flatMap(job => job.tags ?? [])]))
    }, [jobPosts])

    const allTypes = useMemo(() => {
        return Array.from(new Set(['All', ...jobPosts.map(job => job.jobType ?? '').filter(Boolean)]))
    }, [jobPosts])

    const allLocations = useMemo(() => {
        return Array.from(new Set(['All', ...jobPosts.map(job => job.state ?? '').filter(Boolean)]))
    }, [jobPosts])

    const handlePageChange = (page: number) => setPage(page)

    return (
        <div>
            <Navbar navLinks={candidateLinks} />

            {/* Filters */}
            <div className="flex justify-around dark:bg-[#080808] bg-gray-100 p-2">
                {/* Location Filter */}
                <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-2/12 text-center rounded-md dark:bg-[#1f1f1f] dark:text-white"
                >
                    {allLocations.map((loc, index) => (
                        <option key={index} value={loc}>{loc}</option>
                    ))}
                </select>

                {/* Search Bar */}
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

                {/* Type Filter */}
                <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-2/12 text-center rounded-md dark:bg-[#1f1f1f] dark:text-white"
                >
                    {allTypes.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                    ))}
                </select>
            </div>

            {/* Tag Buttons */}
            <div className="flex gap-2 p-3 dark:bg-[#080808] overflow-x-auto whitespace-nowrap max-w-full scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
                {allTags.map((tag, index) => (
                    <span
                        key={index}
                        onClick={() => setSelectedTag(tag)}
                        className={`inline-block cursor-pointer px-5 py-2 border rounded text-xs md:text-sm hover:scale-110 transition ${selectedTag === tag
                            ? 'bg-blue-500 text-white border-none'
                            : 'bg-[#e9e9e9] dark:bg-[#1f1f1f] text-black dark:text-white border-none'
                            }`}
                    >
                        {tag}
                    </span>
                ))}
            </div>


            {/* Job Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-3 grid-rows-3  gap-5 py-15 px-5 dark:bg-[#080808] bg-gray-100 ">
                {loading ? (
                    <p className="col-span-full text-center">Loading...</p>
                ) : jobPosts.length > 0 ? (
                    jobPosts.map((post, index) => (
                        <JobCard key={post._id || index} data={post} customIndex={index} />
                    ))
                ) : (
                    <p className="col-span-full text-center">No jobs found.</p>
                )}
            </div>

            {/* Pagination */}
            <Pagination
                totalPages={totalPages}
                currentPage={page}
                onPageChange={handlePageChange}
            />
            <Footer />
        </div >
    )
}

export default Page
