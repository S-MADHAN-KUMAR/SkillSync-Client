import React from 'react'
import Navbar from '../../../../ui/Navbar'
import { candidateLinks } from '@/app/types/ui'

const page = () => {
    return (
        <div>
            <Navbar navLinks={candidateLinks} />
        </div >
    )
}

export default page