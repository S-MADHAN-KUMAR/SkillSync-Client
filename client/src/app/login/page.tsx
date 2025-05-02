'use client';

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter } from 'next/navigation';
import { LoginFormValues } from '../types/auth';
import { LoginSchema } from '../../../validations/authValidations';
import GoogleAuthBtn from '../../../components/general/GoogleAuthBtn';
import GlowingButton from '../../../ui/GlowingButton';
import { Login } from '../../../api/auth/auth';

const page = () => {
    const initialValues: LoginFormValues = {
        email: '',
        password: ''
    }
    const router = useRouter()

    const handleSubmit = async (values: LoginFormValues) => {
        await Login(values, router)
    };

    return (

        <div className='bg-slate-950 w-full h-[100vh] flex justify-between' >
            <div className=" flex flex-col items-center w-3/5 justify-evenly">
                <h1 className='text-5xl font-semibold  text-gray-100'>Login</h1>

                <Formik
                    initialValues={initialValues}
                    validationSchema={LoginSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="flex flex-col gap-6 w-1/2">
                            <div>
                                <label className="block mb-1">Email</label>
                                <Field
                                    name="email"
                                    type="email"
                                    className="input"
                                />
                                <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
                            </div>

                            <div>
                                <label className="block mb-1">Password</label>
                                <Field
                                    name="password"
                                    type="password"
                                    className="input"
                                />
                                <ErrorMessage name="password" component="div" className="text-red-600 text-sm mt-1" />
                            </div>
                            <p onClick={() => router.push('/forgotpassword')} className='  text-center text-sm text-gray-500 cursor-pointer'>
                                Forgot Password?
                            </p>
                            <div className="flex flex-col gap-6 items-center mt-6">
                                <GlowingButton
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-1.5 "
                                >
                                    {isSubmitting ? 'Submitting...' : 'Loggin'}
                                </GlowingButton>
                                <div className="w-full">
                                    <GoogleAuthBtn />
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
                <p onClick={() => router.push('/register')} className='mt-3  text-center text-sm text-sky-500 cursor-pointer'>
                    New to SkillSync? Create account
                </p>


            </div>

            <div className=" w-2/5 min-h-[100vh] relative">
                <img
                    className='w-full h-full object-cover'
                    src="./login.gif" alt="" />

                {/* Logo/Brand Section */}
                <div className="flex items-center gap-2 absolute top-4 right-4">
                    <img src="/logo.png" alt="SkillSync Logo" className="w-8 h-8" />
                    <p className="font-bold text-2xl text-gray-950">SkillSync</p>
                </div>
            </div>
        </div >
    );
};

export default page;
