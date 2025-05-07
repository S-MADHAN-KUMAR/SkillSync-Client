'use client'

import React, { useEffect, useState, useMemo } from 'react'
import { IoSearchSharp } from 'react-icons/io5'
import Navbar from '../../../../ui/Navbar'
import { candidateLinks } from '@/app/types/ui'
import Pagination from '../../../../ui/paginations/Pagination'
import { EmployeeDataType } from '@/app/types/employee'
import { GetAllEmployees } from '../../../../api/employee/employee'
import CompanyCard from '../../../../ui/cards/CompanyCard'
import Footer from '../../../../components/general/Footer'

const Page = () => {
    const [employees, setEmployees] = useState<EmployeeDataType[]>([])
    const [loading, setLoading] = useState(false)
    const [selectedLocation, setSelectedLocation] = useState<string>('All')
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(9)
    const [totalPages, setTotalPages] = useState<number>(0)

    useEffect(() => {
        const fetchAllJobPosts = async () => {
            try {
                setLoading(true);

                const res = await GetAllEmployees(
                    page,
                    limit,
                    searchQuery,
                    selectedLocation,
                );

                if (res) {
                    setEmployees(res.employees as EmployeeDataType[]);
                    setTotalPages(res.totalPages as number);
                }
            } catch (err: any) {
                console.error('Error fetching job data:', err);
            } finally {
                setLoading(false);
            }
        };


        fetchAllJobPosts()
    }, [page, limit, searchQuery, selectedLocation])



    const allLocations = useMemo(() => {
        return Array.from(new Set(['All', ...employees.map(employee => employee?.companyState ?? '').filter(Boolean)]))
    }, [employees])

    const handlePageChange = (page: number) => setPage(page)

    return (
        <div>
            <Navbar navLinks={candidateLinks} />

            {/* Filters */}
            <div className="flex justify-around dark:bg-[#080808] bg-gray-100 p-2">

                {/* Search Bar */}
                <div className="relative w-8/12">
                    <input
                        type="text"
                        placeholder="Search jobs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full p-2.5 px-10 rounded-sm dark:bg-[#1f1f1f] dark:text-white outline-none"
                    />
                    <IoSearchSharp className="absolute top-2.5 left-3 w-6 h-6 dark:text-white/30" />
                </div>
                {/* Location Filter */}
                <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-3/12 text-center rounded-md dark:bg-[#1f1f1f] dark:text-white"
                >
                    {allLocations.map((loc, index) => (
                        <option key={index} value={loc}>{loc}</option>
                    ))}
                </select>

            </div>



            {/* Job Cards */}
            < div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5 dark:bg-[#080808] bg-gray-100 min-h-[80vh] ">
                {loading ? (
                    <p className="col-span-full text-center">Loading...</p>
                ) : employees.length > 0 ? (
                    employees.map((employee, index) => (
                        <CompanyCard key={employee._id || index} data={employee} customIndex={index} />
                    ))
                ) : (
                    <p className="col-span-full text-center">No Companies found.</p>
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
