"use client";
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter } from 'next/navigation';
import { ForgotOtpFormValues } from '../types/auth';
import { ForgotOtpFormSchema } from '../../../validations/authValidations';
import GlowingButton from '../../../ui/GlowingButton';
import { ForgotEmail } from '../../../api/auth/auth';

const ForgotOtp = () => {
    const router = useRouter()

    const handleSubmit = async (values: ForgotOtpFormValues) => {
        await ForgotEmail(values.email, router)
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950">
            <div className=" p-8 rounded shadow-md w-96">
                <h2 className="text-5xl font-bold mb-6 text-center">Forgot OTP</h2>
                <Formik
                    initialValues={{ email: '' }}
                    validationSchema={ForgotOtpFormSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className='flex flex-col gap-6 mt-20'>
                            <div className="mb-10">
                                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                                    Email
                                </label>
                                <Field
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="input"
                                />
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>

                            <GlowingButton
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-1.5"
                            >
                                {isSubmitting ? 'Submitting...' : 'Send OTP'}
                            </GlowingButton>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default ForgotOtp;
