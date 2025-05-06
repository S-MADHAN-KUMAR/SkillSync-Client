import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { JobPostFormSchema } from '../../../validations/jonPostValidation';
import { JobPostFormValues } from '@/app/types/jobPost';
import GlowingButton from '../../../ui/GlowingButton';
import { CreateJobPost } from '../../../api/jobPost/jobPost';

const storedUser = localStorage.getItem('employee');
const user = storedUser ? JSON.parse(storedUser) : null;

const initialValues: JobPostFormValues = {
    jobTitle: '',
    tags: [],
    minSalary: '',
    maxSalary: '',
    salaryType: '',
    education: '',
    experience: '',
    jobType: '',
    expiredAt: '',
    jobLevel: '',
    vacancies: '',
    country: '',
    state: '',
    address: '',
    jobDescription: '',
    jobBenefits: [],
    status: true,
    postedAt: new Date(),
    employeeId: user?._id,
};

const PostJob = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (
        values: JobPostFormValues,
        { resetForm, setSubmitting }: FormikHelpers<JobPostFormValues>
    ) => {
        try {
            setLoading(true);
            console.log(values);
            await CreateJobPost(values);
            resetForm();
        } catch (error) {
            console.error('Job post creation failed:', error);
        } finally {
            setLoading(false);
            setSubmitting(false);
        }
    };



    return (
        <div className='relative' >
            <h1 className="text-3xl font-medium mb-10">Post a Job</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={JobPostFormSchema}
                onSubmit={handleSubmit}
            >
                {({ values, setFieldValue }) => (
                    <Form className='bg-slate-950 p-10 rounded-lg flex flex-col gap-6'>
                        <div>
                            <label>Job Title</label>
                            <Field name="jobTitle" type="text"
                                className='input' />
                            <ErrorMessage name="jobTitle" component="div" className="error" />
                        </div >

                        <div>
                            <label>Tags (comma separated)</label>
                            <Field
                                name="tags"
                                type="text"
                                className='input'
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    const tagsArray = e.target.value.split(',').map(tag => tag.trim());
                                    setFieldValue('tags', tagsArray);
                                }}
                            />
                            <ErrorMessage name="tags" component="div" className="error" />
                        </div>
                        <div className="flex w-full gap-6 ">
                            <div className='w-full'>
                                <label>Minimum Salary</label>
                                <Field name="minSalary" type="number"
                                    className='input' />
                                <ErrorMessage name="minSalary" component="div" className="error" />
                            </div>

                            <div className='w-full'>
                                <label>Maximum Salary</label>
                                <Field name="maxSalary" type="number"
                                    className='input' />
                                <ErrorMessage name="maxSalary" component="div" className="error" />
                            </div>
                        </div>
                        <div className="flex w-full gap-6 ">
                            <div className='w-full'>
                                <label>Salary Type</label>
                                <Field name="salaryType" as="select"
                                    className='input'>
                                    <option value="">Select</option>
                                    <option value="Hourly">Hourly</option>
                                    <option value="Monthly">Monthly</option>
                                    <option value="Yearly">Yearly</option>
                                </Field>
                                <ErrorMessage name="salaryType" component="div" className="error" />
                            </div>
                            <div className='w-full'>
                                <label>Job Type</label>
                                <Field name="jobType" as="select"
                                    className='input'>
                                    <option value="">Select</option>
                                    <option value="Full-time">Full-time</option>
                                    <option value="Part-time">Part-time</option>
                                    <option value="Contract">Contract</option>
                                </Field>
                                <ErrorMessage name="jobType" component="div" className="error" />
                            </div>
                            <div className='w-full'>
                                <label>Experience Date</label>
                                <Field name="expiredAt" type="date"
                                    className='input' />
                                <ErrorMessage name="expiredAt" component="div" className="error" />
                            </div>
                            <div className='w-full'>
                                <label>Job Level</label>
                                <Field name="jobLevel" as="select"
                                    className='input'>
                                    <option value="">Select</option>
                                    <option value="Entry">Entry</option>
                                    <option value="Mid">Mid</option>
                                    <option value="Senior">Senior</option>
                                </Field>
                                <ErrorMessage name="jobLevel" component="div" className="error" />
                            </div>
                        </div>
                        <div>
                            <label>Education</label>
                            <Field name="education" type="text"
                                className='input' />
                            <ErrorMessage name="education" component="div" className="error" />
                        </div>

                        <div>
                            <label>Experience</label>
                            <Field name="experience" type="text"
                                className='input' />
                            <ErrorMessage name="experience" component="div" className="error" />
                        </div>
                        <div className="flex w-full gap-6 ">
                            <div className='w-full'>
                                <label>Vacancies</label>
                                <Field name="vacancies" type="number"
                                    className='input' />
                                <ErrorMessage name="vacancies" component="div" className="error" />
                            </div>

                            <div className='w-full'>
                                <label>Country</label>
                                <Field name="country" type="text"
                                    className='input' />
                                <ErrorMessage name="country" component="div" className="error" />
                            </div>

                            <div className='w-full'>
                                <label>State</label>
                                <Field name="state" type="text"
                                    className='input' />
                                <ErrorMessage name="state" component="div" className="error" />
                            </div>
                        </div>
                        <div>
                            <label>Address</label>
                            <Field name="address" type="text"
                                className='input' />
                            <ErrorMessage name="address" component="div" className="error" />
                        </div>

                        <div>
                            <label>Job Description</label>
                            <Field name="jobDescription" as="textarea"
                                className='input' />
                            <ErrorMessage name="jobDescription" component="div" className="error" />
                        </div>

                        <div>
                            <label>Job Benefits (comma separated)</label>
                            <Field
                                name="jobBenefits"
                                type="text"
                                className="input"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    const benefitsArray = e.target.value
                                        .split(',')
                                        .map((benefit: string) => benefit.trim());
                                    setFieldValue('jobBenefits', benefitsArray);
                                }}
                            />
                            <ErrorMessage name="jobBenefits" component="div" className="error" />
                        </div>
                        <div className="w-1/3 ms-auto mt-15">
                            <GlowingButton type="submit" className='py-1.5 w-full '>Submit</GlowingButton>
                        </div>
                    </Form >
                )}
            </Formik >
            <div className={loading ? "loading" : ""}></div>
        </div >
    );
};

export default PostJob;
