'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Navbar from '../../../../../../ui/Navbar';
import { candidateLinks } from '@/app/types/ui';
import GlowingButton from '../../../../../../ui/GlowingButton';
import { useRouter } from 'next/navigation';
import { MockInterviewFormValidation } from '../../../../../../validations/aiValidation';
import { MockInterview } from '@/app/types/ai';
import { createMockInterview } from '../../../../../../api/ai/mockInterview';

const page = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');

    const loadingMessages = [
        'Generating...',
        'Things getting ready...',
        'Wait for magic...',
        'Almost done...'
    ];

    // Rotate loading messages while loading is true
    useEffect(() => {
        if (!loading) return;

        let index = 0;
        setLoadingMessage(loadingMessages[index]);
        const interval = setInterval(() => {
            index = (index + 1) % loadingMessages.length;
            setLoadingMessage(loadingMessages[index]);
        }, 10000);

        return () => clearInterval(interval);
    }, [loading]);

    const onSubmit = async (values: MockInterview) => {
        setLoading(true);
        const res = await createMockInterview(values);
        if (res) {
            const id = await res?._id;
            setLoading(false);
            router.push(`/candidate/syncAi/mockInterviewer/interviewPage?id=${id}`)
        } else {
            setLoading(false);
            console.error('Interview creation failed or ID is missing.');
        }
    };

    return (
        <>
            <Navbar navLinks={candidateLinks} />
            {
                loading ?
                    (
                        <div className="w-[100vw] h-[90vh] bg-[black] flex justify-center items-center">
                            {loadingMessage}
                        </div>
                    )
                    :
                    (

                        <div className='bg-black w-full min-h-[90vh] flex justify-evenly items-center flex-col'>
                            <div className="flex flex-col gap-4 text-center">
                                <motion.h1
                                    initial={{ opacity: 0, y: 100 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.4, ease: 'easeOut' }}
                                    className='text-4xl font-semibold'
                                >
                                    Tell us more about your job interviewing
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0, y: 100 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.5, ease: 'easeOut' }}
                                    className='text-xl text-gray-600'
                                >
                                    Add Details about job position/role, Job description
                                </motion.p>
                            </div>


                            <motion.div
                                initial={{ opacity: 0, y: 100 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.6, ease: 'easeOut' }}
                            >
                                <Formik
                                    initialValues={{
                                        jobRole: '',
                                        description: '',
                                        experience: '',
                                        mode: 'easy',
                                        numberOfQuestions: '',
                                    }}
                                    validationSchema={MockInterviewFormValidation}
                                    onSubmit={(values) => {
                                        onSubmit(values);
                                    }}
                                >
                                    {({ isSubmitting }) => (
                                        <Form className="w-full mx-auto space-y-5">
                                            <div className="flex gap-10">
                                                <div className="flex flex-col gap-5">
                                                    <div>
                                                        <label>Job Role / Position</label>
                                                        <Field
                                                            type="text"
                                                            name="jobRole"
                                                            className="input"
                                                            placeholder="Ex. Full Stack Developer"
                                                        />
                                                        <ErrorMessage name="jobRole" component="div" className="error text-sm mt-1" />
                                                    </div>
                                                    <div>
                                                        <label>Years of Experience</label>
                                                        <Field
                                                            type="number"
                                                            name="experience"
                                                            className="input"
                                                            placeholder="Ex.5"
                                                        />
                                                        <ErrorMessage name="experience" component="div" className="error text-sm mt-1" />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="mode">Difficulty Mode</label>
                                                        <Field as="select" name="mode" className="input">
                                                            <option value="easy">Easy</option>
                                                            <option value="medium">Medium</option>
                                                            <option value="hard">Hard</option>
                                                        </Field>
                                                        <ErrorMessage name="mode" component="div" className="error" />
                                                    </div>
                                                </div>
                                                <div className="flex flex-col justify-between">
                                                    <div>
                                                        <label>Job Description / Tech Stack</label>
                                                        <Field
                                                            as="textarea"
                                                            placeholder="Ex. React, Angular, Node.js, MySQL etc"
                                                            name="description"
                                                            className="input min-h-[100px] resize-none"
                                                            rows={5}
                                                        />
                                                        <ErrorMessage name="description" component="div" className="error text-sm mt-1" />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="numberOfQuestions">Number of Questions</label>
                                                        <Field type="number" name="numberOfQuestions" min={1} max={20} className="input" />
                                                        <ErrorMessage name="numberOfQuestions" component="div" className="error" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex justify-between mt-15">
                                                <div className="w-1/3">
                                                    <GlowingButton
                                                        className='py-1.5 w-full'
                                                        type="button"
                                                        onClick={() => router.push('/candidate/syncAi/mockInterviewer')}
                                                        disabled={isSubmitting}
                                                    >
                                                        Cancel
                                                    </GlowingButton>
                                                </div>
                                                <div className="w-1/3">
                                                    <GlowingButton
                                                        className='py-1.5 w-full'
                                                        type="submit"
                                                        disabled={isSubmitting || loading}
                                                    >
                                                        {loading ? loadingMessage : 'Submit'}
                                                    </GlowingButton>
                                                </div>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </motion.div>
                        </div >
                    )
            }
        </>
    );
};

export default page;
