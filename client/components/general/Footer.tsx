import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="dark:bg-[black] bg-[#d1dce8] dark:text-gray-300 py-10 pt-16">
            <div className="flex justify-evenly">

                {/* Logo & Tagline */}
                <div className='flex flex-col gap-4'>
                    <div className="flex items-center gap-2">
                        <img className='w-15' src="/logo.png" alt="" />
                        <h1 className="text-4xl font-bold ">Skill Sync</h1>
                    </div>
                    <p className="mt-2 ">
                        Find your dream job or hire top talent — all in one place.
                    </p>
                </div>

                {/* For Candidates */}
                <div className='flex flex-col gap-4'>
                    <h3 className="text-xl font-semibold  mb-2">For Candidates</h3>
                    <ul className="space-y-3 ">
                        <li><a href="/jobs" className="hover:underline">Browse Jobs</a></li>
                        <li><a href="/profile" className="hover:underline">My Profile</a></li>
                        <li><a href="/applications" className="hover:underline">My Applications</a></li>
                    </ul>
                </div>

                {/* For Recruiters */}
                <div className='flex flex-col gap-4'>
                    <h3 className="text-xl font-semibold  mb-2">For Recruiters</h3>
                    <ul className="space-y-3 ">
                        <li><a href="/post-job" className="hover:underline">Post a Job</a></li>
                        <li><a href="/dashboard" className="hover:underline">Dashboard</a></li>
                        <li><a href="/company" className="hover:underline">Company Profile</a></li>
                    </ul>
                </div>

                {/* Company Info */}
                <div className='flex flex-col gap-4'>
                    <h3 className="text-xl font-semibold  mb-2">Company</h3>
                    <ul className="space-y-3 ">
                        <li><a href="/about" className="hover:underline">About Us</a></li>
                        <li><a href="/contact" className="hover:underline">Contact</a></li>
                        <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
                    </ul>
                </div>
            </div>

            <div className="mt-8 pt-6 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} JobHub. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
