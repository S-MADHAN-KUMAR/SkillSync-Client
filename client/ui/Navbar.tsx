'use client';

import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { IoMdSunny } from 'react-icons/io';
import { IoIosMoon } from 'react-icons/io';
import { NavbarProps, NavLink } from '@/app/types/ui';
import Cookies from 'js-cookie';
import { RegisterFormValues } from '@/app/types/auth';

const defaultLinks: NavLink[] = [
    { label: 'Home', href: '/' },
    { label: 'Find Jobs', href: '/jobs' },
    { label: 'Companies', href: '/companies' },
    { label: 'Contact', href: '/contact' },
];

const Navbar: React.FC<NavbarProps> = ({ navLinks = defaultLinks }) => {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [user, setUser] = useState<RegisterFormValues | null>(null);

    useEffect(() => {
        setMounted(true);

        const candidate = localStorage.getItem('candidate');
        const employee = localStorage.getItem('employee');
        const userData = candidate || employee;

        const candidateToken = Cookies.get('candidateAccessToken');
        const employeeToken = Cookies.get('employeeAccessToken');
        const userToken = candidateToken || employeeToken;

        if (userData && userToken) {
            try {
                const parsedUser: RegisterFormValues = JSON.parse(userData);
                setUser(parsedUser);
            } catch (err) {
                console.error('Failed to parse user data:', err);
                setUser(null);
            }
        } else {
            setUser(null);
        }
    }, []);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <header className="bg-[#d1dce8] dark:bg-black flex items-center justify-between px-6 py-3 sticky top-0 z-50 shadow-sm">
            <div className="flex items-center gap-3">
                <img src="/logo.png" alt="SkillSync Logo" className="w-10 h-10" />
                <h1 className="font-bold text-2xl">SkillSync</h1>
            </div>

            <nav className="hidden md:flex gap-8 text-lg font-medium">
                {navLinks.map(({ label, href }) => (
                    <Link key={href} href={href} className={pathname === href ? 'text-[#e0469d]' : ''}>
                        {label}
                    </Link>
                ))}
            </nav>

            <div className="flex items-center gap-4">
                {!user && (
                    <>
                        <Link
                            href="/register"
                            className="text-white px-5 py-1 rounded hover:bg-[#e0469d] bg-black border-2 border-[#e0469d]"
                        >
                            Register
                        </Link>
                        <Link
                            href="/login"
                            className="text-white px-5 py-1 rounded hover:bg-[#e0469d] bg-black border-2 border-[#e0469d]"
                        >
                            Login
                        </Link>
                    </>
                )}

                <img
                    className="w-10 h-10 object-cover rounded"
                    src={
                        user?.profile
                            ? user.profile
                            : './profile.avif'
                    }
                />

                <button
                    className="ml-2 cursor-pointer hover:scale-110 duration-100"
                    onClick={toggleTheme}
                >
                    {mounted &&
                        (theme === 'light' ? (
                            <IoIosMoon className="w-6 h-6 text-blue-900" />
                        ) : (
                            <IoMdSunny className="w-6 h-6 text-yellow-400" />
                        ))}
                </button>
            </div>
        </header>
    );
};

export default Navbar;
