import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, FieldArray } from 'formik';
import { SocialLinkFormValues } from '@/app/types/employee';
import { SocialLinkFromSchema } from '../../../validations/employeeValidation';
import { GetEmployeeProfile, UpdateEmployeeProfile } from '../../../api/employee/employee';

const SocialMediaProfile = () => {
    const [loading, setLoading] = useState(true);
    const [initialData, setInitialData] = useState<SocialLinkFormValues>({ socialLinks: [{ platform: '', url: '' }] });
    const [isEditing, setIsEditing] = useState(false);

    const storedUser = localStorage.getItem('employee');
    const user = storedUser ? JSON.parse(storedUser) : null;

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await GetEmployeeProfile(user?.employeeProfileId);
            if (response && response.socialLinks) {
                setInitialData({ socialLinks: response.socialLinks });
            }
        } catch (error) {
            console.log('No existing employee profile found.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (values: SocialLinkFormValues) => {
        try {
            setLoading(true);
            console.log('formData', values);
            const res = await UpdateEmployeeProfile(values, user?._id);
            if (res) {
                fetchProfile();
                setIsEditing(false); // 👈 Exit edit mode after saving
            }
        } catch (error) {
            console.error('Error saving profile:', error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="bg-gray-50 p-10 relative">
            <h2 className="text-3xl font-semibold  text-slate-900 text-center mb-18">
                {initialData ? 'Edit Social Profile' : 'Add Social Profile'}
            </h2>
            <Formik
                enableReinitialize
                initialValues={initialData}
                validationSchema={SocialLinkFromSchema}
                onSubmit={handleSubmit}
            >
                {({ values, errors, touched }) => (
                    <Form>
                        <FieldArray name="socialLinks">
                            {(arrayHelpers) => (
                                <div className='flex flex-col gap-4'>
                                    {values.socialLinks.map((link, index) => (
                                        <div key={index} className='flex flex-col w-full gap-5'>
                                            <div className="flex gap-5 bg-slate-200 px-5 pb-6 pt-5 rounded-lg">
                                                <div className='w-full'>
                                                    <label>Platform</label>
                                                    <Field
                                                        name={`socialLinks[${index}].platform`}
                                                        type="text"
                                                        className="input"
                                                        placeholder="Platform"
                                                        disabled={!isEditing} // 👈 Disable fields when not editing
                                                    />
                                                    {errors.socialLinks?.[index]?.platform &&
                                                        touched.socialLinks?.[index]?.platform && (
                                                            <div style={{ color: 'red' }}>
                                                                {errors.socialLinks[index]?.platform}
                                                            </div>
                                                        )}
                                                </div>
                                                <div className='w-full'>
                                                    <label>URL</label>
                                                    <Field
                                                        name={`socialLinks[${index}].url`}
                                                        type="text"
                                                        className="input"
                                                        placeholder="URL"
                                                        disabled={!isEditing} // 👈 Disable fields when not editing
                                                    />
                                                    {errors.socialLinks?.[index]?.url &&
                                                        touched.socialLinks?.[index]?.url && (
                                                            <div style={{ color: 'red' }}>
                                                                {errors.socialLinks[index]?.url}
                                                            </div>
                                                        )}
                                                </div>
                                            </div>

                                            {isEditing && (
                                                <button type="button" onClick={() => arrayHelpers.remove(index)} className='text-red-100 text-sm px-4 rounded-full cursor-pointer bg-red-500 w-fit ms-auto'>
                                                    Remove
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    {isEditing && (
                                        <button className='my-5 text-left cursor-pointer hover:underline hover:underline-blue-500 text-blue-500' type="button" onClick={() => arrayHelpers.push({ platform: '', url: '' })}>
                                            Add Social Link
                                        </button>
                                    )}
                                </div>
                            )}
                        </FieldArray>

                        {isEditing && (
                            <button type="submit" className="bg-blue-500 w-1/3 hover:bg-blue-600 text-white py-2 px-4 rounded">
                                Save
                            </button>
                        )}
                    </Form>
                )}
            </Formik>
            {!isEditing && (
                <button className="bg-blue-500 w-1/3 mt-15 hover:bg-blue-600 text-white py-2 px-4 rounded" onClick={() => setIsEditing(true)} style={{ marginBottom: '20px' }}>
                    Edit
                </button>
            )}
            <div className={loading ? "loading" : ""}></div>
        </div >
    );
};

export default SocialMediaProfile;
