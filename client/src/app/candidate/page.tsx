'use client'
import React, { useEffect } from 'react'
import { MdAccountCircle } from 'react-icons/md'
import { BiSolidImageAdd } from 'react-icons/bi'
import Navbar from '../../../ui/Navbar'
import { candidateLinks } from '../types/ui'
import Post from '../../../ui/cards/Post'
import { GetCandidateProfile } from '../../../api/candidate/candidate'
import { CandidateProfileFormValues } from '../types/candidate'
import { useRouter } from 'next/navigation'

const page = () => {
    const [data, setData] = React.useState<CandidateProfileFormValues>(null);
    const router = useRouter()
    const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("candidate") || "null") : null;
    useEffect(() => {
        const fetchProfile = async () => {
            if (!user?.candidateProfileId) return;
            try {
                const res = await GetCandidateProfile(user.candidateProfileId);
                if (res) {
                    setData(res);
                }
            } catch (error) {
                console.error("Failed to fetch profile:", error);
            }
        };
        fetchProfile();
    }, []);
    return (
        <div>
            <Navbar
                navLinks={candidateLinks}
            />
            <div className="w-full min-h-screen flex flex-col lg:flex-row justify-between gap-5 p-5 bg-[#f5f3f0] dark:bg-[#080808]">

                {/* ---- 1 ----*/}
                <div className="border border-[#b9b9b997] dark:border-0 bg-[#ffffff] dark:bg-[black] pb-4 min-h-[40vh] rounded-lg md:w-[300px] h-full flex justify-between items-center flex-col overflow-hidden">

                    <div className=" w-full  h-[25vh]">
                        <div className="w-full h-24 relative ">
                            <img
                                className="w-full h-full object-cover"
                                src={data?.banner || 'https://help.icontact.com/customers/servlet/rtaImage?eid=ka8Hr000000bmcK&feoid=00N2H000005mBEj&refid=0EMHr000002vydy'}
                            />
                            <div className="w-30 h-30 overflow-hidden rounded-full border-white border-4 dark:border-[black] absolute -bottom-15 left-1/2 transform -translate-x-1/2">
                                <img
                                    className="w-full h-full object-cover"
                                    src={data?.logo || 'https://www.shutterstock.com/image-vector/default-avatar-photo-placeholder-profile-600nw-772402006.jpg'}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="h-fit gap-10  flex flex-col  justify-around items-center text-center px-4">
                        <h1 className="text-2xl font-medium">{user?.name}</h1>
                        <p className="text-sm text-[gray]">
                            {data?.name
                                ?
                                `${data?.name}`
                                :
                                'Update yourname'
                            }</p>
                        <p className="text-xs text-[gray]">
                            {data?.bio
                                ? `${data.bio.slice(0, 80)}...`
                                : 'Update your bio'}
                        </p>

                        <p className="text-xs text-[gray]">{data?.state ? data?.state
                            :
                            'Update your  location'} , {data?.country
                            }</p>

                        <button onClick={() => router.push('/candidate/profile')} className="bg-[#093b82] text-sm text-white font-medium text-center h-8 rounded-full wordspace-nowrap inline-block px-6">
                            Update Profile
                        </button>
                    </div>

                </div>



                {/* ---- 2 ----*/}
                <div className=" md:w-[600px] rounded-lg ">
                    <div className="border border-[#b9b9b997] dark:border-0 w-full bg-[#ffffff] dark:bg-[#101111] h-15 mb-2 rounded-lg flex items-center justify-between gap-4 px-4">
                        <img className='w-10 rounded-full' src="https://i.pinimg.com/736x/76/a7/0f/76a70f50208522e860bcd7d84d53d2c9.jpg" alt="" />
                        <div className='border border-[#b9b9b997] dark:border-0 bg-[#e3e3e3] dark:bg-[black] px-4 py-2 rounded-md w-full flex justify-center gap-2 items-center'>
                            <BiSolidImageAdd className='w-5 h-5 ' />
                            Start a post
                        </div>
                        <div className='border border-[#b9b9b997] dark:border-0 bg-[#e3e3e3] dark:bg-[black] px-4 py-2 rounded-md w-full flex justify-center gap-2 items-center'>
                            <MdAccountCircle className='w-5 h-5 ' />
                            View Profile
                        </div>
                    </div>
                    <Post />
                    <Post />
                    <Post />
                    <Post />

                </div>




                {/* ---- 3 ----*/}
                <div className="py-4 border border-[#b9b9b997] dark:border-0 rounded-lg md:w-[380px] flex flex-col gap-4 h-fit bg-[#ffffff] dark:bg-[black]"
                >
                    <h1 className="text-2xl font-semibold ms-5"> Trending Now</h1>

                    <div className="flex flex-col gap-3 items-center justify-evenly">
                        {/* CARD */}
                        <div className="hover:scale-105 cursor-pointer duration-500 w-[330px] h-[100px] flex justify-between p-2 gap-3 rounded-lg bg-[#e6e6e652] border border-[#b9b9b997] dark:border-0 dark:bg-[#1f1f1f] ">
                            <img
                                className="w-1/4 gap-3 rounded-md"
                                src="https://img.naukimg.com/logo_images/groups/v1/4621127.gif"
                            />
                            <div className="flex flex-col justify-evenly w-full">
                                <div className="textContent">
                                    <p className="text-xl font-semibold">Clans of Clash</p>
                                    <span className="text-blue-500 text-xs dark:text-gray-500">12 min ago</span>
                                </div>
                                <p className="dark:text-[#d1d1d1] text-xs ">Xhattmahs is not attacking your base!</p>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default page


