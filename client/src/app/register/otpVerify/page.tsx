'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { OtpVerifyFormValues } from '@/app/types/auth';
import { OtpVerifyFormSchema } from '../../../../validations/authValidations';
import GlowingButton from '../../../../ui/GlowingButton';
import { OtpVerify, ResendOtp } from '../../../../api/auth/auth';

const VerifyOtpPage = () => {
    const [userType, setUserType] = useState<'candidate' | 'employee' | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [timer, setTimer] = useState(30);
    const [showResend, setShowResend] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const employee = localStorage.getItem('employee');
        const candidate = localStorage.getItem('candidate');

        if (employee) {
            const parsed = JSON.parse(employee);
            setUserType('employee');
            setUserId(parsed._id);
            setEmail(parsed.email);
        } else if (candidate) {
            const parsed = JSON.parse(candidate);
            setUserType('candidate');
            setUserId(parsed._id);
            setEmail(parsed.email);
        }
    }, []);

    useEffect(() => {
        if (timer > 0) {
            const countdown = setTimeout(() => setTimer(timer - 1), 1000);
            return () => clearTimeout(countdown);
        } else {
            setShowResend(true);
        }
    }, [timer]);

    const handleSubmit = async (values: OtpVerifyFormValues) => {
        console.log(values, userId);
        await OtpVerify({ id: userId as string, ...values }, router);
    };

    const handleResend = async () => {
        if (userId) {
            await ResendOtp(email as string);
        }
        setTimer(30);
        setShowResend(false);
    };

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center bg-slate-950 text-white">
            <h1 className="text-5xl font-bold mb-6 text-center">OTP Verify</h1>
            <Formik
                initialValues={{ otp: '' }}
                validationSchema={OtpVerifyFormSchema}
                onSubmit={handleSubmit}
            >
                {() => (
                    <Form className="flex flex-col gap-10 w-full max-w-sm px-6 mt-20">
                        <div className="flex flex-col gap-3">
                            <label htmlFor="otp" >
                                Enter your OTP
                            </label>
                            <Field
                                name="otp"
                                type="text"
                                maxLength={6}
                                className="input "
                            />
                            <ErrorMessage name="otp" component="div" className="text-red-500 text-sm" />
                        </div>
                        <GlowingButton
                            type="submit"
                            className="w-full py-1.5"
                        >
                            Verify OTP
                        </GlowingButton>
                        <div className="text-center mt-4 text-sm text-gray-300">
                            {showResend ? (
                                <p
                                    onClick={handleResend}
                                    className="text-blue-400 hover:underline cursor-pointer"
                                >
                                    Resend OTP
                                </p>
                            ) : (
                                <span className='text-gray-500 cursor-not-allowed'>Resend OTP in {timer}s</span>
                            )}
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default VerifyOtpPage;
