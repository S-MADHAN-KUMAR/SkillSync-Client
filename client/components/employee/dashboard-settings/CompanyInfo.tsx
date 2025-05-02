import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { CompanyProfile } from '@/app/types/employee';
import { EmployeeFromSchema } from '../../../validations/employeeValidation';
import { GetEmployeeProfile, UpdateEmployeeProfile } from '../../../api/employee/employee';

export default function CompanyProfileForm() {
    const storedUser = localStorage.getItem('employee');
    const user = storedUser ? JSON.parse(storedUser) : null;

    const [initialData, setInitialData] = useState<CompanyProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [bannerPreview, setBannerPreview] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await GetEmployeeProfile(user?.employeeProfileId ?? '');
            if (response) {
                setInitialData(response);
                setLogoPreview(response.logo as string);
                setBannerPreview(response.banner as string);
            }
        } catch (error) {
            console.log('No existing company profile found.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (values: CompanyProfile) => {
        try {
            setLoading(true);

            console.log('formData', values);

            const res = await UpdateEmployeeProfile(values, user?._id);
            if (res) {
                setIsEditing(false);
                fetchProfile(); // Refresh updated data
            }
        } catch (error) {
            console.error('Error saving profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const initialValues: CompanyProfile = {
        logo: initialData?.logo || '',
        banner: initialData?.banner || '',
        companyName: initialData?.companyName || '',
        aboutCompany: initialData?.aboutCompany || '',
    };

    return (
        <div className="bg-gray-50 p-10 relative">
            <h2 className="text-3xl font-semibold  text-slate-900 text-center mb-18">
                {initialData ? 'Edit Company Profile' : 'Add Company Profile'}
            </h2>

            {(!initialData || isEditing) ? (
                <Formik
                    initialValues={initialValues}
                    validationSchema={EmployeeFromSchema}
                    enableReinitialize
                    onSubmit={handleSubmit}
                >
                    {({ setFieldValue, values }) => (
                        <Form className="flex flex-col gap-10 ">
                            <div className="flex justify-between w-full">
                                {/* Logo Upload */}
                                <div className='flex flex-col gap-3 '>
                                    <label className="block ">Logo</label>
                                    <input
                                        type="file"
                                        name="logo"
                                        className="input"
                                        accept="image/*"
                                        onChange={(event) => {
                                            const file = event.target.files?.[0];
                                            if (file) {
                                                setFieldValue('logo', file);
                                                setLogoPreview(URL.createObjectURL(file));
                                            }
                                        }}
                                    />
                                    {logoPreview && (
                                        <img src={logoPreview} alt="Logo Preview" className="mt-2 h-38 w-38  object-cover shadow-lg" />
                                    )}
                                    <ErrorMessage name="logo" component="div" className="text-red-500 text-sm" />
                                </div>

                                {/* Banner Upload */}
                                <div className='flex flex-col gap-3 '>
                                    <label className="block ">Banner</label>
                                    <input
                                        type="file"
                                        name="banner"
                                        className="input"
                                        accept="image/*"
                                        onChange={(event) => {
                                            const file = event.target.files?.[0];
                                            if (file) {
                                                setFieldValue('banner', file);
                                                setBannerPreview(URL.createObjectURL(file));
                                            }
                                        }}
                                    />
                                    {bannerPreview && (
                                        <img src={bannerPreview} alt="Banner Preview" className="mt-2 h-38 shadow-lg w-[400px] object-cover" />
                                    )}
                                    <ErrorMessage name="banner" component="div" className="text-red-500 text-sm" />
                                </div>
                            </div>
                            <hr className='text-gray-300' />

                            {/* Company Name */}
                            <div className='flex flex-col gap-3'>
                                <label className="block ">Company Name</label>
                                <Field name="companyName" type="text" className="input" />
                                <ErrorMessage name="companyName" component="div" className="text-red-500 text-sm" />
                            </div>

                            {/* About Company */}
                            <div className='flex flex-col gap-3'>
                                <label className="block ">About Company</label>
                                <Field name="aboutCompany" as="textarea" className="input" />
                                <ErrorMessage name="aboutCompany" component="div" className="text-red-500 text-sm" />
                            </div>

                            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 w-1/3 ms-auto rounded mt-15">
                                Save
                            </button>
                        </Form>
                    )}
                </Formik>
            ) : (
                <div className='gap-10 flex flex-col'>
                    <div className="flex justify-between w-full ">
                        <div className="flex flex-col gap-2">
                            <label className="block">Logo</label>
                            {logoPreview ? (
                                <img src={logoPreview} alt="Logo" className="h-38 shadow-lg object-cover" />
                            ) : (
                                <p>No logo preview available</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="block ">Banner</label>
                            {bannerPreview ? (
                                <img src={bannerPreview} alt="Banner" className="h-38 shadow-lg w-[400px] object-cover" />
                            ) : (
                                <p>No banner preview available</p>
                            )}
                        </div>
                    </div>

                    <hr className='text-gray-300' />

                    <div className="flex flex-col gap-5">
                        <label className="block ">Company Name</label>
                        <p className='text-xl font-medium  input '>{initialData.companyName}</p>
                    </div>

                    <div className="flex flex-col gap-5">
                        <label className="block ">About Company</label>
                        <p className='text-xl font-medium  input '>{initialData.aboutCompany}</p>
                    </div>

                    <button
                        onClick={() => setIsEditing(true)}
                        className="bg-blue-500 w-1/3 mt-15 hover:bg-blue-600 text-white py-2 px-4 rounded"
                    >
                        Edit Profile
                    </button>
                </div>
            )
            }
            <div className={loading ? "loading" : ""}></div>
        </div >
    );
}
