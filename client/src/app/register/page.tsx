'use client';
import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter } from 'next/navigation';
import GoogleAuthBtn from '../../../components/general/GoogleAuthBtn';
import { RegisterFormValues } from '../types/auth';
import { RegisterSchema } from '../../../validations/authValidations';
import GlowingButton from '../../../ui/GlowingButton';
import { Register } from '../../../api/auth/auth';

const page = () => {
    const router = useRouter()
    const initialValues: RegisterFormValues = {
        name: '',
        email: '',
        mobile: '',
        password: '',
        confirmPassword: '',
        role: 'candidate',
    }

    const handleSubmit = async (values: RegisterFormValues) => {
        await Register(values, router)
    };

    return (
        <div className='bg-slate-950 w-full h-[100vh] flex justify-between' >
            <div className=' flex flex-col items-center w-3/5 justify-evenly'>
                <h1 className='text-5xl font-semibold  text-gray-100'>Register</h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={RegisterSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="flex flex-col gap-6 w-2/3">



                            <div className="flex w-full flex-col justify-center items-center">
                                <div className="flex w-1/2 border bg-black border-gray-600 rounded-full select-none h-10">
                                    <label className="radio flex flex-grow items-center justify-center rounded-full p-0.5 cursor-pointer">
                                        <Field
                                            type="radio"
                                            name="role"
                                            value="candidate"
                                            className="peer hidden"
                                        />
                                        <span className="tracking-widest peer-checked:bg-[#26de54] uppercase
                                        text-sm 
                                        font-semibold
                                        peer-checked:text-white text-gray-700 flex justify-center flex-col text-center w-full h-full rounded-full transition duration-150 ease-in-out">
                                            Candidate
                                        </span>
                                    </label>

                                    <label className="radio flex flex-grow items-center justify-center rounded-full p-0.5 cursor-pointer">
                                        <Field
                                            type="radio"
                                            name="role"
                                            value="employee"
                                            className="peer hidden"
                                        />
                                        <span className="tracking-widest peer-checked:bg-[#e3323e] uppercase  text-sm 
                                        font-semibold
                                          peer-checked:text-white text-gray-700 flex justify-center flex-col text-center w-full h-full rounded-full transition duration-150 ease-in-out">
                                            Employee
                                        </span>
                                    </label>
                                </div>
                                <ErrorMessage name="role" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className="flex w-full justify-between gap-5">
                                <div>
                                    <label htmlFor="name">Name</label>
                                    <Field name="name" className="input" />
                                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                                </div>
                                <div>
                                    <label htmlFor="mobile">Mobile</label>
                                    <Field name="mobile" className="input" />
                                    <ErrorMessage name="mobile" component="div" className="text-red-500 text-sm" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email">Email</label>
                                <Field name="email" type="email" className="input" />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                            </div>


                            <div className=' flex w-full justify-between gap-5 '>
                                <div>
                                    <label htmlFor="password">Password</label>
                                    <Field name="password" type="password" className="input" />
                                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                                </div>


                                <div>
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <Field name="confirmPassword" type="password" className="input" />
                                    <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
                                </div>
                            </div>
                            <div className="flex gap-10 items-center">
                                <div className="w-1/2">
                                    <GlowingButton
                                        type="submit"
                                        disabled={isSubmitting}
                                        className=" w-full py-1.5"
                                    >

                                        {isSubmitting ? 'Submitting...' : 'Register'}
                                    </GlowingButton>
                                </div>
                                <div className="w-1/2">
                                    <GoogleAuthBtn />
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
                <p onClick={() => router.push('/login')} className='text-center text-sm text-sky-500 cursor-pointer'>
                    Already have account? login
                </p>
            </div>
            <div className=" w-2/5 min-h-[100vh] relative">
                <img
                    className='w-full h-full object-cover'
                    src="./register.gif" alt="" />

                {/* Logo/Brand Section */}
                <div className="flex items-center gap-2 absolute top-4 right-4">
                    <img src="/logo.png" alt="SkillSync Logo" className="w-8 h-8" />
                    <p className="font-bold text-2xl text-gray-950">SkillSync</p>
                </div>
            </div>
        </div >
    )
}

export default page