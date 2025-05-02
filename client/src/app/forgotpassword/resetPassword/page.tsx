"use client";

import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { ResetPasswordFormValues } from '@/app/types/auth';
import { ResetPasswordFormSchema } from '../../../../validations/authValidations';
import GlowingButton from '../../../../ui/GlowingButton';
import { ResetPassword } from '../../../../api/auth/auth';

const Page = () => {
    const router = useRouter();
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const candidate = localStorage.getItem('candidate');
        const employee = localStorage.getItem('employee');
        const userData = candidate || employee;
        setUserId(userData ? JSON.parse(userData) : null);
    }, []);



    const handleSubmit = async (values: ResetPasswordFormValues) => {
        console.log('Password submitted:', values.password);

        if (userId) {
            await ResetPassword({ password: values.password, id: userId }, router);
        } else {
            console.error('User ID not found.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950">
            <div className="p-8 rounded shadow-md w-1/3">
                <h2 className="text-5xl font-bold mb-6 text-center">Reset Password</h2>
                <Formik
                    initialValues={{ password: '', confirmPassword: '' }}
                    validationSchema={ResetPasswordFormSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className='flex flex-col gap-6 mt-20'>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                                    New Password
                                </label>
                                <Field
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="input"
                                />
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
                                    Confirm Password
                                </label>
                                <Field
                                    type="password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    className="input"
                                />
                                <ErrorMessage
                                    name="confirmPassword"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>

                            <GlowingButton
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-1.5"
                            >
                                {isSubmitting ? 'Submitting...' : 'Reset Password'}
                            </GlowingButton>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Page;
