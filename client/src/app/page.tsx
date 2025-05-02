'use client'
import React from 'react'
import GlowingButton from '../../ui/GlowingButton'
import Navbar from '../../ui/Navbar'

const page = () => {
  return (
    <div>
      <Navbar />

      < div
        style={{
          backgroundImage: "url('/gradient.png')",
          backgroundRepeat: "repeat",
          backgroundPosition: "center",
          backgroundSize: "contain",
        }
        }
        className=' flex flex-col justify-center items-center w-[100vw] h-[90vh] bg-[#d2dde9] 
         dark:bg-[#000000] ' >


        <h1 className="w-9/12 text-black dark:text-[#f7f9fa] text-center text-6xl font-extrabold leading-normal">
          Discover Your Next <span className='text-[#e0469d]'>Career</span> Move | Find Jobs Now!
        </h1>
        <div className='w-1/4 mt-6'>
          <GlowingButton className='w-full py-2'>
            Get Find Your Job With SkillSync
          </GlowingButton>
        </div>
      </div>

      <div className="bg-[#d1dce8] dark:bg-black w-[100vw] min-h-[100vh] flex justify-evenly items-center flex-col " >

        <h1 className='text-4xl font-semibold'>How SkillSync work</h1>
        <div className="flex w-full justify-evenly items-center">

          <div className=" relative  gap-3 flex flex-col justify-center items-center w-1/6 min-h-[250px] ">
            <div className=" p-4 rounded-full bg-[#191818f9]">
              <img width="94" height="94" src="https://img.icons8.com/3d-fluency/94/guest-male--v1.png" alt="resume" />
            </div>
            <h1 className='text-xl font-semibold'>Create Account</h1>
            <p className='text-[#636161fc] text-center'>Create your SkillSync account using Gmail or fill out the form below to get started!</p>
            <img src="/arrow-right.png" className="absolute w-60 -top-20 -right-40" />
          </div>


          <div className="relative gap-3 flex flex-col justify-center items-center w-1/6 min-h-[250px]">
            <div className="  p-4 rounded-full bg-[#191818f9]">
              <img width="94" height="94" src="https://img.icons8.com/3d-fluency/94/resume.png" alt="resume" />
            </div>
            <h1 className='text-xl font-semibold'>Upload Your Resume</h1>
            <p className='text-[#636161fc] text-center'>Upload your resume to showcase your skills and get matched with the perfect job opportunities!</p>
            <img src="/arrow-left.png" className="absolute w-60 -bottom-20 -right-40" />
          </div>


          <div className="relative gap-3 flex flex-col justify-center items-center w-1/6 min-h-[250px]">
            <div className="  p-4 rounded-full bg-[#191818f9]">
              <img width="94" height="94" src="https://img.icons8.com/3d-fluency/1500/search.png" alt="resume" />
            </div>
            <h1 className='text-xl font-semibold'>Find Suitable Job</h1>
            <p className='text-[#636161fc] text-center'>Discover job opportunities that align with your skills and career goals!</p>
            <img src="/arrow-right.png" className="absolute w-60 -top-20 -right-40" />
          </div>


          <div className=" gap-3 flex flex-col justify-center items-center w-1/6 min-h-[250px]">
            <div className=" p-4 rounded-full bg-[#191818f9]">
              <img width="94" height="94" src="https://img.icons8.com/?size=100&id=kgfo8W3bFDUx&format=png&color=000000" alt="resume" />
            </div>
            <h1 className='text-xl font-semibold'>Apply Job</h1>
            <p className='text-[#636161fc] text-center'>Apply for your dream job in just a few clicks and take the next step in your career!</p>
          </div>
        </div>
      </div >
    </div>
  )
}

export default page