"use client";

import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter } from 'next/navigation';
import { ForgotOtpVerifyFormSchema } from '../../../../validations/authValidations';
import { ForgotOtpVerifyFormValues } from '@/app/types/auth';
import GlowingButton from '../../../../ui/GlowingButton';
import { ForgotOtpVerify } from '../../../../api/auth/auth';

const page = () => {
    const router = useRouter();
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const candidate = localStorage.getItem('candidate');
        const employee = localStorage.getItem('employee');
        const userData = candidate || employee;
        setUserId(userData ? JSON.parse(userData) : null);
    }, []);


    const handleSubmit = async (values: ForgotOtpVerifyFormValues) => {
        console.log('OTP Submitted:', values.otp);
        if (userId) {
            await ForgotOtpVerify({ otp: values.otp, id: userId }, router);
        } else {
            console.error('User ID not found.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950">
            <div className=" p-8 rounded shadow-md w-96">
                <h2 className="text-5xl font-bold mb-6 text-center">Enter OTP</h2>
                <Formik
                    initialValues={{ otp: '' }}
                    validationSchema={ForgotOtpVerifyFormSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className='flex flex-col gap-6 mt-20'>
                            <div className="mb-10">
                                <label htmlFor="otp" className="block text-gray-700 font-medium mb-2">
                                    OTP
                                </label>
                                <Field
                                    type="text"
                                    name="otp"
                                    id="otp"
                                    maxLength="6"
                                    className="input"
                                />
                                <ErrorMessage
                                    name="otp"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>

                            <GlowingButton
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-1.5"
                            >
                                {isSubmitting ? 'Submitting...' : 'Verify OTP'}
                            </GlowingButton>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default page;
