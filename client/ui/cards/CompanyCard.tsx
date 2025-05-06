import { EmployeeDataType } from '@/app/types/employee';
import { GrLocationPin } from "react-icons/gr";
import { FaLocationDot } from "react-icons/fa6";
import React from 'react'
import Link from 'next/link';

type Props = {
    data: EmployeeDataType | undefined;
};

const CompanyCard = ({ data }: Props) => {
    return (
        <Link href={`/candidate/companies/${data?._id}`} prefetch>
            <div className="flex justify-between max-w-[420px] h-[200px] bg-[#1f1f1f] rounded-xl shadow-md overflow-hidden p-3">
                <div className="w-[200px] h-full rounded-lg overflow-hidden">
                    <img src={data?.logo} className="w-full h-full object-cover" />
                </div>
                <div className="w-[220px] h-full px-3 flex flex-col justify-between">
                    <h1 className='text-2xl font-medium'>{data?.companyName}</h1>
                    <p className='text-sm text-pink-500'>{data?.companyType}</p>
                    <p className='text-sm text-gray-500 '>
                        Founder :
                        <span className=' text-blue-500 font-medium text-base ms-2 '>{data?.founderName}</span>
                    </p>
                    <div className="flex">
                        {data?.industryTypes?.split(',').slice(0, 3).map((industry, index) => (
                            <span
                                key={index}
                                className="text-sm text-gray-100 bg-blue-800 px-2 py-1 rounded mr-2"
                            >
                                {industry}
                            </span>
                        ))}
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                        <p className='flex items-center gap-1'>
                            <FaLocationDot />
                            {data?.companyCountry}</p> ,
                        <p className='flex items-center gap-1'>
                            <GrLocationPin />
                            {data?.companyState}
                        </p>
                    </div>

                </div>
            </div >
        </Link >
    )
}

export default CompanyCard