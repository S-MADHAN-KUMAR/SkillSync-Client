import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { AccountSettingForm, CompanyProfile } from '@/app/types/employee';
import { AccountSettingFormSchema } from '../../../validations/employeeValidation';
import { GetEmployeeProfile, UpdateEmployeeProfile } from '../../../api/employee/employee';
// import { getEmployeeProfile, updateEmployeeProfile } from '../../../api/employee/employee';

const AccountSettings = () => {
    const [loading, setLoading] = useState(true);
    const [initialData, setInitialData] = useState<AccountSettingForm>({
        companyPhone: '',
        companyEmail: '',
        companyCountry: '',
        companyState: '',
        companyAddress: '',
    });
    const [editMode, setEditMode] = useState(false);

    const storedUser = localStorage.getItem('employee');
    const user = storedUser ? JSON.parse(storedUser) : null;

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await GetEmployeeProfile(user?.employeeProfileId);
            if (response) {
                setInitialData({
                    companyPhone: response.companyPhone || '',
                    companyEmail: response.companyEmail || '',
                    companyCountry: response.companyCountry || '',
                    companyState: response.companyState || '',
                    companyAddress: response.companyAddress || '',
                });
            }
        } catch (error) {
            console.log('No existing employee profile found.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (values: AccountSettingForm, { setSubmitting }: FormikHelpers<AccountSettingForm>) => {
        try {
            setLoading(true);

            const res = await UpdateEmployeeProfile(values, user?._id);
            if (res) {
                fetchProfile();
                setEditMode(false);
            }
        } catch (error) {
            console.error('Error saving profile:', error);
        } finally {
            setLoading(false);
            setSubmitting(false);
        }
    };

    return (
        <div className="bg-gray-50 p-10 relative">
            <h2 className="text-3xl font-semibold  text-slate-900 text-center mb-18">
                {initialData ? 'Edit Account setting Profile' : 'Add Account setting Profile'}
            </h2>
            <Formik
                enableReinitialize
                initialValues={initialData}
                validationSchema={AccountSettingFormSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched, isSubmitting }) => (
                    <Form>
                        {/* Fields */}
                        <div style={{ marginBottom: '20px' }}>
                            <label>Phone</label>
                            <Field
                                name="companyPhone"
                                type="text"
                                className="input"
                                placeholder="Phone"
                                disabled={!editMode}
                            />
                            {errors.companyPhone && touched.companyPhone && (
                                <div style={{ color: 'red' }}>{errors.companyPhone}</div>
                            )}
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label>Email</label>
                            <Field
                                name="companyEmail"
                                type="email"
                                className="input"
                                placeholder="Email"
                                disabled={!editMode}
                            />
                            {errors.companyEmail && touched.companyEmail && (
                                <div style={{ color: 'red' }}>{errors.companyEmail}</div>
                            )}
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label>Country</label>
                            <Field
                                name="companyCountry"
                                type="text"
                                className="input"
                                placeholder="Country"
                                disabled={!editMode}
                            />
                            {errors.companyCountry && touched.companyCountry && (
                                <div style={{ color: 'red' }}>{errors.companyCountry}</div>
                            )}
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label>State</label>
                            <Field
                                name="companyState"
                                type="text"
                                className="input"
                                placeholder="State"
                                disabled={!editMode}
                            />
                            {errors.companyState && touched.companyState && (
                                <div style={{ color: 'red' }}>{errors.companyState}</div>
                            )}
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label>Address</label>
                            <Field
                                name="companyAddress"
                                type="text"
                                className="input"
                                placeholder="Address"
                                disabled={!editMode}
                            />
                            {errors.companyAddress && touched.companyAddress && (
                                <div style={{ color: 'red' }}>{errors.companyAddress}</div>
                            )}
                        </div>

                        {/* Buttons */}
                        {!editMode ? (
                            <p className="bg-blue-500 w-1/3 mt-15 text-center hover:bg-blue-600 text-white py-2 px-4 rounded" onClick={() => setEditMode(true)}>
                                Edit
                            </p>
                        ) : (
                            <button className="bg-blue-500 w-1/3 mt-15 hover:bg-blue-600 text-white py-2 px-4 rounded" type="submit" disabled={isSubmitting}>
                                Save
                            </button>
                        )}
                    </Form>
                )}
            </Formik>
            <div className={loading ? "loading" : ""}></div>
        </div >
    );
};

export default AccountSettings;
