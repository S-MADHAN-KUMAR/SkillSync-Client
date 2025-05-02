'use client';

import React, { useState } from 'react';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { MdClose } from "react-icons/md";
import { showToast } from '../../helpers/showToast';
import { GoogleCredential } from '@/app/types/auth';
import { CheckUserExists, UserGoogleAuth } from '../../api/auth/auth';

const GoogleAuthBtn = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [credential, setCredential] = useState<CredentialResponse | null>(null);
    const [role, setRole] = useState('');

    const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
        if (!credentialResponse.credential) {
            showToast("No credential returned from Google", 'dark', 'error');
            return;
        }

        const decoded: GoogleCredential = jwtDecode<GoogleCredential>(credentialResponse.credential);
        setCredential(credentialResponse);

        const userExist = await CheckUserExists(decoded.email);

        if (userExist) {
            try {
                console.log(decoded);

                await UserGoogleAuth({ ...decoded, role }, router);
            } catch (error: any) {
                showToast('Login failed', 'dark', 'error');
            }
        } else {
            setIsOpen(true);
        }
    };

    const handleRoleSelect = async (selectedRole: string) => {
        setRole(selectedRole)
        if (!credential?.credential) return;

        try {
            const decoded: GoogleCredential = jwtDecode<GoogleCredential>(credential.credential);
            await UserGoogleAuth({ ...decoded, role: selectedRole }, router);
        } catch (error: any) {
            console.error('Google login failed', error);
        } finally {
            setIsOpen(false);
        }
    };


    return (
        <div>
            <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => console.log('Login Failed')}
                shape="pill"
                text="continue_with"
                width="full"
            />

            {isOpen && (
                <div className="bg-[#000000cd] flex justify-center items-center fixed inset-0 z-10">
                    <div className="bg-[#faf9f7] w-1/3 h-1/2 rounded-lg flex flex-col items-center relative p-6">
                        <h1 className="text-3xl text-slate-900 font-semibold mb-10">Select Your Role</h1>
                        <div className="flex justify-evenly items-center w-full">
                            <div className="w-1/3 flex flex-col items-center space-y-4">
                                <img src="/candidate.png" alt="Candidate" className="w-24" />
                                <button
                                    onClick={() => handleRoleSelect('candidate')}
                                    className="text-gray-950 font-semibold text-lg border-2 border-gray-300 shadow px-6 py-2 rounded-full hover:scale-105 transition duration-100"
                                >
                                    Candidate
                                </button>
                            </div>
                            <div className="w-1/3 flex flex-col items-center space-y-4">
                                <img src="/employee.png" alt="employee" className="w-24" />
                                <button
                                    onClick={() => handleRoleSelect('employee')}
                                    className="text-white font-semibold text-lg bg-[#1818ff] shadow px-6 py-2 rounded-full hover:scale-105 transition duration-100"
                                >
                                    Employee
                                </button>
                            </div>
                        </div>
                        <MdClose
                            onClick={() => setIsOpen(false)}
                            className="cursor-pointer absolute w-7 h-7 top-4 right-4 text-[#0000005b]"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default GoogleAuthBtn;
