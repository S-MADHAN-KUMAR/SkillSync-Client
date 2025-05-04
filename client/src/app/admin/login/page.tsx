'use client';

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter } from 'next/navigation';
import { LoginSchema } from '../../../../validations/adminValidation';
import { LoginFormValues } from '@/app/types/admin';
import { AdminLogin } from '../../../../api/admin/auth';

const page = () => {
    const initialValues: LoginFormValues = {
        email: '',
        password: ''
    }
    const router = useRouter()

    const handleSubmit = async (values: LoginFormValues) => {
        await AdminLogin(values, router)
    };

    return (

        <div className='bg-slate-950 w-full h-[100vh] flex justify-between' >
            <div className=" flex flex-col items-center w-3/5 justify-evenly">
                <h1 className='text-5xl font-semibold  text-gray-100'>Admin Login</h1>

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

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-blue-600 text-white py-2  rounded-full hover:bg-blue-700 transition"
                            >
                                {isSubmitting ? 'Submitting...' : 'Loggin'}
                            </button>
                        </Form>
                    )}
                </Formik>


            </div>

            <div className=" w-2/5 min-h-[100vh] relative">
                <img
                    className='w-full h-full object-cover'
                    src="https://i.pinimg.com/originals/69/fb/2c/69fb2c59f9cc88bed51770e91792ab1c.gif" alt="" />

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
