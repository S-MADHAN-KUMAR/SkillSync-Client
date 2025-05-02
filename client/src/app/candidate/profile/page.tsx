'use client';

import React, { useEffect, useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { CandidateProfileFormValues } from "@/app/types/candidate";
import { GetCandidateProfile, UpdateCandidateProfile } from "../../../../api/candidate/candidate";

// File validation helpers
const isImage = (file: File | null) =>
    file && ['image/jpg', 'image/jpeg', 'image/png'].includes(file.type);

const isPDF = (file: File | null) => file && file.type === "application/pdf";

// Yup validation schema
const validationSchema = Yup.object({
    logo: Yup.mixed().test('fileType', 'Logo must be an image (jpg, jpeg, png)', (value) => {
        return !value || value instanceof File ? isImage(value) : true;
    }),
    banner: Yup.mixed().test('fileType', 'Banner must be an image (jpg, jpeg, png)', (value) => {
        return !value || value instanceof File ? isImage(value) : true;
    }),
    name: Yup.string().required("Name is required"),
    about: Yup.string().required("About is required"),
    bio: Yup.string().required("Bio is required"),
    country: Yup.string().required("Country is required"),
    state: Yup.string().required("State is required"),
    address: Yup.string().required("Address is required"),
    gender: Yup.string().required("Gender is required"),
    website: Yup.string().url("Invalid URL").required("Website is required"),
    skills: Yup.array().of(Yup.string().required("Skill is required")).min(1, "At least one skill is required"),
    education: Yup.array().of(
        Yup.object({
            organization: Yup.string().required("Required"),
            course: Yup.string().required("Required"),
            duration: Yup.string().required("Required"),
        })
    ).min(1, "At least one education entry is required"),
    experience: Yup.array().of(
        Yup.object({
            company: Yup.string().required("Required"),
            position: Yup.string().required("Required"),
            duration: Yup.string().required("Required"),
        })
    ).min(1, "At least one experience entry is required"),
    resume: Yup.mixed()
        .test("fileType", "Only PDF is allowed", (value) => {
            if (!value) return true;
            if (value instanceof File) return value.type === "application/pdf";
            if (typeof value === "string") return true;
            return false;
        })
        .test("requiredIfNoUrl", "Resume is required", function (value) {
            const existingUrl = typeof value === "string";
            const uploadedFile = value instanceof File;
            return existingUrl || uploadedFile;
        }),
});

// Default empty values
const defaultValues: CandidateProfileFormValues = {
    logo: null,
    banner: null,
    name: "",
    about: "",
    bio: "",
    country: "",
    state: "",
    address: "",
    gender: "",
    website: "",
    skills: [""],
    education: [{ organization: "", course: "", duration: "" }],
    experience: [{ company: "", position: "", duration: "" }],
    resume: null,
};

const CandidateProfileForm = () => {
    const [initialValues, setInitialValues] = useState<CandidateProfileFormValues>(defaultValues);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [bannerPreview, setBannerPreview] = useState<string | null>(null);
    const [resumeUrl, setResumeUrl] = useState<string | null>(null);
    const [isEdit, setIsEdit] = useState(false);
    const [readOnly, setReadOnly] = useState(false);

    const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("candidate") || "null") : null;

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user?.candidateProfileId) return;
            try {
                const res = await GetCandidateProfile(user.candidateProfileId);
                if (res) {
                    setInitialValues({
                        ...defaultValues,
                        ...res,
                        skills: res.skills?.length ? res.skills : [""],
                        education: res.education?.length ? res.education : [{ organization: "", course: "", duration: "" }],
                        experience: res.experience?.length ? res.experience : [{ company: "", position: "", duration: "" }],
                        resume: res.resume || ""
                    });
                    setLogoPreview(res.logo || null);
                    setBannerPreview(res.banner || null);
                    setResumeUrl(res.resume || null);
                    setIsEdit(true);
                    setReadOnly(true); // lock on load
                }
            } catch (error) {
                console.error("Failed to fetch profile:", error);
            }
        };
        fetchProfile();
    }, []);

    const handleSubmit = async (values: CandidateProfileFormValues) => {
        if (!user?._id) {
            console.error("User not found");
            return;
        }
        try {
            await UpdateCandidateProfile(values, user._id);
            alert("Profile updated successfully");
            setReadOnly(true); // lock again after save
        } catch (error) {
            console.error("Failed to update profile", error);
        }
    };

    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ setFieldValue, values }) => (
                <Form className="space-y-4">
                    {/* Logo */}
                    <div>
                        <label>Logo</label>
                        <input
                            type="file"
                            accept="image/*"
                            disabled={readOnly}
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    setFieldValue("logo", file);
                                    setLogoPreview(URL.createObjectURL(file));
                                }
                            }}
                        />
                        {logoPreview && <img src={logoPreview} alt="Logo" className="h-24" />}
                        <ErrorMessage name="logo" component="div" className="text-red-500" />
                    </div>

                    {/* Banner */}
                    <div>
                        <label>Banner</label>
                        <input
                            type="file"
                            accept="image/*"
                            disabled={readOnly}
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    setFieldValue("banner", file);
                                    setBannerPreview(URL.createObjectURL(file));
                                }
                            }}
                        />
                        {bannerPreview && <img src={bannerPreview} alt="Banner" className="h-24 w-[400px]" />}
                        <ErrorMessage name="banner" component="div" className="text-red-500" />
                    </div>

                    {/* Text Fields */}
                    {["name", "about", "bio", "country", "state", "address", "gender", "website"].map((field) => (
                        <div key={field}>
                            <label className="capitalize">{field}</label>
                            <Field name={field} className="border p-2 w-full" readOnly={readOnly} />
                            <ErrorMessage name={field} component="div" className="text-red-500" />
                        </div>
                    ))}

                    {/* Skills */}
                    <div>
                        <label>Skills</label>
                        <FieldArray name="skills">
                            {({ push, remove }) => (
                                <>
                                    {values.skills.map((_, i) => (
                                        <div key={i} className="flex gap-2 items-center">
                                            <Field name={`skills[${i}]`} className="border p-2" readOnly={readOnly} />
                                            {!readOnly && (
                                                <button type="button" onClick={() => remove(i)}>Remove</button>
                                            )}
                                        </div>
                                    ))}
                                    {!readOnly && (
                                        <button type="button" onClick={() => push("")}>Add Skill</button>
                                    )}
                                </>
                            )}
                        </FieldArray>
                    </div>

                    {/* Education */}
                    <div>
                        <label>Education</label>
                        <FieldArray name="education">
                            {({ push, remove }) => (
                                <>
                                    {values.education.map((_, i) => (
                                        <div key={i} className="grid grid-cols-3 gap-2 items-center">
                                            <Field name={`education[${i}].organization`} placeholder="Organization" className="border p-2" readOnly={readOnly} />
                                            <Field name={`education[${i}].course`} placeholder="Course" className="border p-2" readOnly={readOnly} />
                                            <Field name={`education[${i}].duration`} placeholder="Duration" className="border p-2" readOnly={readOnly} />
                                            {!readOnly && (
                                                <button type="button" onClick={() => remove(i)}>Remove</button>
                                            )}
                                        </div>
                                    ))}
                                    {!readOnly && (
                                        <button type="button" onClick={() => push({ organization: "", course: "", duration: "" })}>Add Education</button>
                                    )}
                                </>
                            )}
                        </FieldArray>
                    </div>

                    {/* Experience */}
                    <div>
                        <label>Experience</label>
                        <FieldArray name="experience">
                            {({ push, remove }) => (
                                <>
                                    {values.experience.map((_, i) => (
                                        <div key={i} className="grid grid-cols-3 gap-2 items-center">
                                            <Field name={`experience[${i}].company`} placeholder="Company" className="border p-2" readOnly={readOnly} />
                                            <Field name={`experience[${i}].position`} placeholder="Position" className="border p-2" readOnly={readOnly} />
                                            <Field name={`experience[${i}].duration`} placeholder="Duration" className="border p-2" readOnly={readOnly} />
                                            {!readOnly && (
                                                <button type="button" onClick={() => remove(i)}>Remove</button>
                                            )}
                                        </div>
                                    ))}
                                    {!readOnly && (
                                        <button type="button" onClick={() => push({ company: "", position: "", duration: "" })}>Add Experience</button>
                                    )}
                                </>
                            )}
                        </FieldArray>
                    </div>

                    {/* Resume Upload */}
                    <div>
                        <label>Resume (PDF)</label>
                        <input
                            type="file"
                            accept="application/pdf"
                            disabled={readOnly}
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    setFieldValue("resume", file);
                                    setResumeUrl(URL.createObjectURL(file));
                                }
                            }}
                        />
                        {resumeUrl && (
                            <div className="mt-4">
                                <label className="block mb-1 font-semibold">Resume Preview</label>
                                <div className="w-[295px] h-[442px]">
                                    <iframe
                                        src={`${resumeUrl}#page=1`}
                                        className="w-full h-full object-contain"
                                        title="Resume Preview"
                                    />
                                </div>
                            </div>
                        )}
                        <ErrorMessage name="resume" component="div" className="text-red-500" />
                    </div>

                    {/* Action Buttons */}
                    {readOnly ? (
                        <p

                            className="bg-yellow-500 text-white px-4 py-2 rounded"
                            onClick={() => setReadOnly(false)}
                        >
                            Edit Profile
                        </p>
                    ) : (
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            {isEdit ? "Update Profile" : "Create Profile"}
                        </button>
                    )}
                </Form>
            )}
        </Formik>
    );
};

export default CandidateProfileForm;
