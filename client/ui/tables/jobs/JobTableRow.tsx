// import React from 'react';
// import { FaLocationDot } from 'react-icons/fa6';
// import { IoIosTimer } from 'react-icons/io';
// import { RiGroupLine } from 'react-icons/ri';
// import { FiEdit } from 'react-icons/fi';
// import { MdDeleteOutline } from 'react-icons/md';
// import { FaUndo } from "react-icons/fa";
// import { JobTableRowProps } from '@/app/types/ui';


// const JobTableRow: React.FC<JobTableRowProps> = ({ post, onEdit, onDelete }) => {
//     const isExpired = new Date(post.expiredAt) < new Date();
//     const daysRemaining = Math.ceil(
//         (new Date(post.expiredAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
//     );

//     return (
//         <tr className="border-b dark:border-[#1f1f1f] border-[#d1d1d1] dark:bg-black">
//             <td className="px-5 py-5 flex gap-3">
//                 <img
//                     src={
//                         post?.logo ||
//                         'https://via.placeholder.com/40x40?text=Logo'
//                     }
//                     alt="Company Logo"
//                     className="w-20 object-cover rounded"
//                 />
//                 <div className="flex flex-col justify-between w-full">
//                     <div className="flex justify-between items-start">
//                         <h1 className="text-xl font-medium">{post.jobTitle}</h1>
//                         <span className="text-xs bg-[#0740ece7] dark:bg-[#0740ec60] text-white rounded-full px-3 py-0.5 inline-block whitespace-nowrap">
//                             {post.jobType}
//                         </span>
//                     </div>
//                     <p className="text-sm text-[#222326] dark:text-[#ffffffc9]">
//                         Salary: ₹{post.minSalary} - ₹{post.maxSalary}
//                     </p>
//                     <div className="flex justify-between items-center text-xs text-gray-500">
//                         <span className="flex items-center gap-1">
//                             <FaLocationDot className="w-3 h-3" />
//                             {post.country}, {post.state}
//                         </span>
//                         <span className="flex items-center gap-1">
//                             {isExpired ? (
//                                 <span className="text-red-500 flex items-center gap-1">
//                                     <IoIosTimer /> Expired at{' '}
//                                     {new Date(post.expiredAt).toLocaleDateString()}
//                                 </span>
//                             ) : (
//                                 <span className="text-green-600 flex items-center gap-1">
//                                     <IoIosTimer /> {daysRemaining} days remaining
//                                 </span>
//                             )}
//                         </span>
//                     </div>
//                 </div>
//             </td>

//             <td className="text-center">
//                 <div className="flex items-center justify-center gap-2 text-gray-500 font-medium text-sm">
//                     <RiGroupLine className="w-4 h-4" />
//                     400 Applications
//                 </div>
//             </td>

//             <td className="text-center">
//                 <div className="flex flex-col gap-3">
//                     <span
//                         className={`text-sm font-medium rounded-full px-4 py-1 mx-auto ${post.status
//                             ? 'bg-[#0ed00e] dark:bg-[#0ed00e78]'
//                             : 'bg-red-500 text-white'
//                             }`}
//                     >
//                         {post.status ? 'Active' : 'Blocked'}
//                     </span>
//                     <span
//                         className={`text-sm font-medium rounded-full px-4 py-1 mx-auto ${!isExpired
//                             ? 'bg-[#0ed00e] dark:bg-[#0ed00e78]'
//                             : 'bg-red-500 text-white'
//                             }`}
//                     >
//                         {!isExpired ? 'Not Expired' : 'Expired'}
//                     </span>
//                 </div>
//             </td>

//             <td className="text-center px-5">
//                 <div className="flex flex-col gap-2 justify-center">
//                     <button className="bg-[#1f2def] dark:bg-[#1f2def78] text-white py-2 rounded text-sm font-medium">
//                         View Applications
//                     </button>
//                     <div className="flex justify-between">
//                         <button
//                             onClick={() => onEdit(post._id)}
//                             className="bg-sky-900 text-white px-4 flex items-center gap-1 rounded text-sm py-1 font-medium"
//                         >
//                             Edit Job <FiEdit />
//                         </button>
//                         <button
//                             onClick={() => onDelete(post._id, post?.status)}
//                             className={`${post?.status ? "bg-red-500" : "bg-green-700"} text-white px-4 flex items-center gap-1 rounded text-sm py-1 font-medium cursor-pointer`}
//                         >
//                             {
//                                 post.status ? (
//                                     <MdDeleteOutline className='w-5 h-5' />
//                                 ) : (
//                                     <FaUndo />
//                                 )
//                             }

//                         </button>
//                     </div>
//                 </div>
//             </td>
//         </tr>
//     );
// };

// export default JobTableRow;




import React from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import { IoIosTimer } from 'react-icons/io';
import { RiGroupLine } from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';
import { MdDeleteOutline } from 'react-icons/md';
import { FaUndo } from "react-icons/fa";
import { JobTableRowProps } from '@/app/types/ui';

const JobTableRow: React.FC<JobTableRowProps> = ({ post, onEdit, onDelete }) => {
    const isExpired = new Date(post.expiredAt) < new Date();
    const daysRemaining = Math.ceil(
        (new Date(post.expiredAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );

    return (
        <tr className="border-b flex w-full items-center justify-between dark:border-[#1f1f1f] border-[#d1d1d1] dark:bg-black">
            <div className="flex flex-col h-full justify-between  md:flex-row items-center md:block md:w-6/10">
                {/* Job Info */}
                <td className="p-5 md:w-4/6 ">
                    <div className="flex flex-col sm:flex-row gap-3 w-full">
                        <img
                            src={post?.logo || 'https://via.placeholder.com/40x40?text=Logo'}
                            alt="Company Logo"
                            className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex flex-col gap-1 w-full">
                            <div className="flex justify-between items-start flex-wrap">
                                <h1 className="text-base sm:text-lg font-medium">{post.jobTitle}</h1>
                                <span className="text-xs bg-[#0740ece7] dark:bg-[#0740ec60] text-white rounded-full px-3 py-0.5 mt-1 sm:mt-0">
                                    {post.jobType}
                                </span>
                            </div>
                            <p className="text-sm text-[#222326] dark:text-[#ffffffc9]">
                                Salary: ₹{post.minSalary} - ₹{post.maxSalary}
                            </p>
                            <div className="flex flex-col sm:flex-row justify-between text-xs text-gray-500 gap-1">
                                <span className="flex items-center gap-1">
                                    <FaLocationDot className="w-3 h-3" />
                                    {post.country}, {post.state}
                                </span>
                                <span className="flex items-center gap-1">
                                    {isExpired ? (
                                        <span className="text-red-500 flex items-center gap-1">
                                            <IoIosTimer /> Expired at{' '}
                                            {new Date(post.expiredAt).toLocaleDateString()}
                                        </span>
                                    ) : (
                                        <span className="text-green-600 flex items-center gap-1">
                                            <IoIosTimer /> {daysRemaining} days remaining
                                        </span>
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                </td>

                {/* Applications */}
                <td className="text-center md:w-2/6  px-4 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center justify-center gap-2">
                        <RiGroupLine className="w-4 h-4" />
                        400 Applications
                    </div>
                </td>
            </div>
            <div className="flex md:w-4/10 flex-col md:flex-row items-center justify-evenly md:block">
                {/* Status */}
                <td className="text-center md:w-2/10 p-5 h-full">
                    <div className="flex flex-col gap-2 text-sm">
                        <span
                            className={`font-medium rounded-full px-4 py-1 mx-auto w-fit ${post.status
                                ? 'bg-[#0ed00e] dark:bg-[#0ed00e78]'
                                : 'bg-red-500 text-white'
                                }`}
                        >
                            {post.status ? 'Active' : 'Blocked'}
                        </span>
                        <span
                            className={`font-medium rounded-full px-4 py-1 mx-auto w-fit ${!isExpired
                                ? 'bg-[#0ed00e] dark:bg-[#0ed00e78]'
                                : 'bg-red-500 text-white'
                                }`}
                        >
                            {!isExpired ? 'Not Expired' : 'Expired'}
                        </span>
                    </div>
                </td>

                {/* Actions */}
                <td className="text-center md:w-2/10 p-5 h-full">
                    <div className="flex flex-col gap-2 items-center">
                        <button className="bg-[#1f2def] dark:bg-[#1f2def78] text-white px-3 py-2 rounded text-sm font-medium w-full">
                            View Applications
                        </button>
                        <div className="flex flex-col sm:flex-row gap-2 w-full justify-between">
                            <button
                                onClick={() => onEdit(post._id)}
                                className="bg-sky-900 text-white flex items-center justify-center gap-1 rounded text-sm py-1 font-medium w-full"
                            >
                                Edit <FiEdit />
                            </button>
                            <button
                                onClick={() => onDelete(post._id, post.status)}
                                className={`${post.status ? "bg-red-500" : "bg-green-700"} text-white flex items-center justify-center gap-1 rounded text-sm py-1 font-medium w-full`}
                            >
                                {post.status ? <MdDeleteOutline /> : <FaUndo />}
                            </button>
                        </div>
                    </div>
                </td>
            </div>
        </tr>
    );
};

export default JobTableRow;
