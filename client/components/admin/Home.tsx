
import React from 'react'

const Home = () => {
    return (
        <div>
            <h1 className='text-5xl font-semibold'>Hello, <span className='syncAi'>{process.env.NEXT_PUBLIC_ADMIN_NAME}</span></h1>
        </div>
    )
}

export default Home