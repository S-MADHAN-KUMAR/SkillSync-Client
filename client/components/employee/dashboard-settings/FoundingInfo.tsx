import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FoundingProfile } from '@/app/types/employee';
import { FundingFromSchema } from '../../../validations/employeeValidation';
import { GetEmployeeProfile, UpdateEmployeeProfile } from '../../../api/employee/employee';


export default function ExtendedCompanyProfileForm() {
    const storedUser = localStorage.getItem('employee');
    const user = storedUser ? JSON.parse(storedUser) : null;

    const [initialData, setInitialData] = useState<FoundingProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await GetEmployeeProfile(user?.employeeProfileId);
            if (response) {
                setInitialData({
                    teamSize: response.teamSize || '',
                    companyType: response.companyType || '',
                    industryTypes: response.industryTypes || '',
                    founderName: response.founderName || '',
                    foundedYear: response.foundedYear ? response.foundedYear.substring(0, 10) : '', // Only date part
                    companyVision: response.companyVision || '',
                });
            }
        } catch (error) {
            console.log('No extended profile data found.');
        } finally {
            setLoading(false);
        }
    };



    const handleSubmit = async (values: FoundingProfile) => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('teamSize', values.teamSize.toString());
            formData.append('companyType', values.companyType);
            formData.append('industryTypes', values.industryTypes)
            formData.append('founderName', values.founderName);
            formData.append('foundedYear', values.foundedYear);
            formData.append('companyVision', values.companyVision);

            const res = await UpdateEmployeeProfile(formData, user?._id);
            if (res) {
                setIsEditing(false);
                fetchProfile();
            }
        } catch (error) {
            console.error('Error saving extended profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const initialValues: FoundingProfile = {
        teamSize: initialData?.teamSize ?? '',
        companyType: initialData?.companyType ?? '',
        industryTypes: initialData?.industryTypes ?? '',
        founderName: initialData?.founderName ?? '',
        foundedYear: initialData?.foundedYear ?? '',
        companyVision: initialData?.companyVision ?? '',
    };

    return (
        <div className="bg-gray-50 p-10 relative">
            <h2 className="text-3xl font-semibold text-slate-900 text-center mb-18">
                {initialData ? 'Edit Company Founding Profile' : 'Add  Company Founding Profile'}
            </h2 >

            {
                (!initialData || isEditing) ? (
                    <Formik
                        initialValues={initialValues}
                        validationSchema={FundingFromSchema}
                        enableReinitialize
                        onSubmit={handleSubmit}
                    >
                        {({ setFieldValue, values }) => (
                            <Form className="flex flex-col gap-6">
                                {/* Team Size */}
                                <div className='flex flex-col gap-3'>
                                    <label className="block ">Team Size</label>
                                    <Field type="number" name="teamSize" className="input" />
                                    <ErrorMessage name="teamSize" component="div" className="text-red-500 text-sm" />
                                </div>

                                {/* Company Type */}
                                <div className='flex flex-col gap-3'>
                                    <label className="block ">Company Type</label>
                                    <Field as="select" name="companyType" className="input">
                                        <option value="">Select Company Type</option>
                                        <option value="Private">Private</option>
                                        <option value="Public">Public</option>
                                        <option value="Startup">Startup</option>
                                        <option value="Non-Profit">Non-Profit</option>
                                    </Field>
                                    <ErrorMessage name="companyType" component="div" className="text-red-500 text-sm" />
                                </div>

                                {/* Industry Types (Multiselect) */}
                                <div className='flex flex-col gap-3'>
                                    <label className="block ">Industry Types</label>
                                    <Field
                                        type="text"
                                        name="industryTypes"
                                        className="input"
                                        placeholder="Enter industries separated by commas (e.g. Technology, Finance)"
                                        value={values.industryTypes}
                                    />
                                    <ErrorMessage name="industryTypes" component="div" className="text-red-500 text-sm" />
                                </div>

                                {/* Founder Name */}
                                <div className='flex flex-col gap-3'>
                                    <label className="block ">Founder Name</label>
                                    <Field type="text" name="founderName" className="input" />
                                    <ErrorMessage name="founderName" component="div" className="text-red-500 text-sm" />
                                </div>

                                {/* Founded Year */}
                                <div className='flex flex-col gap-3'>
                                    <label className="block ">Founded Year</label>
                                    <Field type="date" name="foundedYear" className="input" />
                                    <ErrorMessage name="foundedYear" component="div" className="text-red-500 text-sm" />
                                </div>

                                {/* Company Vision */}
                                <div className='flex flex-col gap-3'>
                                    <label className="block ">Company Vision</label>
                                    <Field as="textarea" name="companyVision" className="input" />
                                    <ErrorMessage name="companyVision" component="div" className="text-red-500 text-sm" />
                                </div>

                                <button type="submit" className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded w-1/3 mt-18 ms-auto">
                                    Save
                                </button>
                            </Form>
                        )
                        }
                    </Formik >
                ) : (
                    <div className="flex flex-col gap-6">
                        <div className='flex flex-col gap-3'>
                            <label>Team Size:</label>
                            <div className="input">{initialData.teamSize}</div>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <label>Company Type:</label>
                            <div className="input">{initialData.companyType}</div>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <label>Industry Types:</label>
                            <div className="input">{initialData.industryTypes}</div>
                        </div>

                        <div className='flex flex-col gap-3'>
                            <label>Founder Name:</label>
                            <div className="input">{initialData.founderName}</div>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <label>Founded Year:</label>
                            <div className="input">{initialData.foundedYear}</div>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <label>Company Vision:</label>
                            <div className="input">{initialData.companyVision}</div>
                        </div>

                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-blue-500 mt-18 hover:bg-blue-600 text-white py-2 px-4 rounded w-1/3"
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
