'use client'
import React, { useState } from 'react'
import { MdMoreHoriz } from 'react-icons/md'
import { BiLike } from "react-icons/bi";
import { BiCommentDetail } from "react-icons/bi";
import { IoIosSend } from "react-icons/io";
import { MdEmojiEmotions } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";

const Post = () => {
    let text =
        `This component
checks if the text exceeds 20 characters.
If it does, it displays only the first 20 characters followed 
    by "...". Clicking "Show More" reveals the full text, and
"Show Less" hides it again. Let me know if you need any 
modifications! 🚀`

    const [showFull, setShowFull] = useState(false);
    const isLong = text.length > 20;

    return (
        <div className='border border-[#b9b9b997] dark:border-0 bg-white dark:bg-[#101111] w-full h-fit rounded-lg mb-12 p-5'>
            <div className="flex items-center justify-between gap-5">
                <div className="flex items-center gap-5">
                    <div className="flex relative ">
                        <img className='w-8 h-8 rounded-full 
            
            border-2 border-[#b9b9b997] dark:border-[black]
            ' src="data:image/jpeg;base64,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" alt="" />

                        <div className='w-8 h-8 absolute left-5 flex items-center justify-center text-lg border-[#1d1d1d] text-[#1d1d1d] dark:text-[#060a0f] rounded-full border-2 dark:border-[#060a0f] dark:bg-[#505457] bg-[gray]' >+</div>
                    </div>
                    <p className='text-xs text-black dark:text-gray-500'><span className='text-sm font-medium text-black dark:text-white hover:underline cursor-pointer' style={{ marginLeft: "5px" }}>Amal krishna K S</span>  and
                        <span className='text-sm font-medium text-black dark:text-white hover:underline cursor-pointer' style={{ marginLeft: "5px" }}>Muhammed kans</span> commented on this</p>

                </div>
                <MdMoreHoriz className='w-6 h-6' />
            </div>
            <div className="flex flex-col ">
                <hr className='text-[gray] my-4' />
                <div className="flex justify-batween items-start cursor-pointer">
                    <div className="flex gap-2 items-center w-full">
                        <img className='w-14 border' src="https://media.licdn.com/dms/image/v2/D4D0BAQFtUJnr-DjRtQ/company-logo_100_100/company-logo_100_100/0/1735121931152?e=1749081600&v=beta&t=2HjDSzt3-ot4BYyF6rv0zzBm9eMvdl_Z9wrUXIOfxso" alt="" />


                        <div className="flex flex-col w-full">
                            <h1 className='font-semibold text-lg'>TechVista
                            </h1>
                            <p className='text-xs font-extralight text-gray-600 inline'>25,143 followers</p>
                            <p className='text-xs font-extralight text-gray-600 inline'>9h •🌐</p>
                        </div>

                    </div>
                    <button className="w-fit px-6 border-blue-600 border-2  bg-blue-600 cursor-pointer text-white rounded text-sm p-0.5 font-medium">Follow</button>
                </div>

                <div className="rounded-lg w-full mt-7 mb-4">
                    <pre className="text whitespace-pre-wrap">
                        {showFull || !isLong ? text : text.slice(0, 20) + "..."}
                    </pre>
                    {isLong && (
                        <button
                            onClick={() => setShowFull(!showFull)}
                            className=" text-blue-500 hover:underline text-sm cursor-pointer"
                        >
                            {showFull ? "Show Less" : "Show More"}
                        </button>
                    )}
                </div>

                <img src="https://m.media-amazon.com/images/I/81vRg6RVaFL.jpg" className="w-full h-[85vh] object-contain bg-[black]" />
            </div>
            <div className="flex justify-between items-center mt-4">
                <p className='flex items-center gap-1 '><FaHeart className='w-5 h-5' />1,792</p>
                <div className="flex items-center gap-4">
                    <p className='text-sm text-[gray]'>8 comments</p>
                    <p className='text-sm text-[gray]'>3 reposts</p>
                </div>
            </div>
            <hr className='text-[gray] my-4 ' />
            <div style={{ margin: "10px 0" }} className="flex justify-between items-center text-[#404040] dark:text-[#ffffffb1]">
                <div className="flex items-center gap-1 cursor-pointer ">
                    <BiLike className='w-6 h-6' />
                    <h1 className='font-semibold'>Like</h1>
                </div>
                <div className="flex items-center gap-1 cursor-pointer">
                    <BiCommentDetail className='w-6 h-6' />
                    <h1 className='font-semibold'>Comment</h1>
                </div>
                <div className="flex items-center gap-1 cursor-pointer">
                    <IoIosSend className='w-6 h-6' />
                    <h1 className='font-semibold'>send</h1>
                </div>
            </div>

            <div style={{ margin: "40px 0" }} className="flex gap-4 relative">
                <img className='w-10 h-10 rounded-full' src="https://i.pinimg.com/736x/76/a7/0f/76a70f50208522e860bcd7d84d53d2c9.jpg" alt="" />
                <input style={{ padding: '0px 10px' }} type="text" placeholder='Add a comment ...' className='text-white placeholder:text-sm border-1 border-[#80808078] rounded-full placeholder:px-5 w-full ' />
                <MdEmojiEmotions className='w-8 h-8 absolute right-1 top-1 text-[#7a746d] cursor-pointer' />
            </div>

            <div className="flex flex-col p-5 dark:bg-[black] bg-[#d1d1d17c] rounded-lg">
                <div className="flex gap-2 items-center justify-between">
                    <div className='flex gap-2'>
                        <img className='w-10 h-10 rounded-full' src="https://i.pinimg.com/736x/74/24/1b/74241b8e06baf6a32c9f9556f7c9d19a.jpg" alt="" />
                        <div className="flex flex-col">
                            <h1>Groot</h1>
                            <p className='text-xs font-extralight text-[gray]'>4h ago</p>
                        </div>
                    </div>
                    <MdMoreHoriz className='w-6 h-6 cursor-pointer' />
                </div>
                <pre
                    style={{ margin: '15px 0' }}
                    className='my-2'>#interested</pre>

                <div className="flex gap-2 text-xs items-center text-[gray]">
                    <div className="flex items-center gap-1 cursor-pointer ">
                        <FaRegHeart className='w-3 h-3' />
                        <p>like</p>
                    </div>
                    <p>|</p>
                    <p className='cursor-pointer '>replay</p>
                </div>
            </div>

        </div>
    )
}

export default Post