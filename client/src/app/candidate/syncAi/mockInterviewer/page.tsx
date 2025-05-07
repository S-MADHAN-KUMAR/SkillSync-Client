import React from 'react'
import Navbar from '../../../../../ui/Navbar'
import { candidateLinks } from '@/app/types/ui'

const page = () => {
    return (
        <div>
            <Navbar
                navLinks={candidateLinks}
            />
            <div className="w-full min-h-screen flex flex-col lg:flex-row justify-between gap-5 p-5 bg-[#f5f3f0] dark:bg-[#080808]">

            </div>
        </div>
    )
}

export default page