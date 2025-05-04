'use client';

import React, { useEffect, useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { CandidateProfileFormValues } from "@/app/types/candidate";
import { GetCandidateProfile, UpdateCandidateProfile } from "../../../../api/candidate/candidate";
import { CandidateFormSchema } from "../../../../validations/candidateValidation";
import Navbar from "../../../../ui/Navbar";
import { candidateLinks } from "@/app/types/ui";
import GlowingButton from "../../../../ui/GlowingButton";



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
            setReadOnly(true);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Navbar navLinks={candidateLinks} />
            <div className={readOnly ? " w-full h-full flex flex-col p-6" : "hidden"}>
                <div className="relative">
                    <div className="w-full h-58 ">
                        <img src={initialValues?.banner} className="w-full h-full object-cover" />
                    </div>
                    <div className="w-56 absolute -bottom-26 left-30 border-4 rounded-full border-[#1e1e1e]">
                        <img src={initialValues?.logo} className="w-full h-full object-cover" />
                    </div>
                    {readOnly && (
                        <p className="w-40 absolute top-5 right-2">
                            <GlowingButton
                                type="button"
                                className="py-1.5 w-full text-sm "
                                onClick={() => setReadOnly(false)}
                            >
                                Edit Profile
                            </GlowingButton>
                        </p>
                    )}
                </div>
                <div className="bg-[#1e1e1e] w-full min-h-[90vh] p-30 flex flex-col gap-5">
                    <div className="flex  gap-16 h-[442px]">
                        <div className="flex flex-col gap-6">
                            <div className="flex items-end gap-2">
                                <h1 className="text-4xl font-medium">{initialValues?.name}</h1>
                                <p className="text-blue-800">/ {initialValues?.gender}</p>
                            </div>
                            <p className="text-lg font-light">{initialValues?.bio}</p>
                            <p className="text-gray-400 font-light">{initialValues?.state} , {initialValues?.country}</p>
                            <a href={initialValues?.website} className="text-blue-800 cursor-pointer hover:underline hover:underline-blue-800">{initialValues?.website}</a>
                            <div className=" flex flex-wrap gap-8">
                                {initialValues?.skills?.map((skill, index) => (
                                    <span key={index} className="bg-blue-900/40 px-6 py-1 rounded hover:scale-110 duration-150 cursor-pointer">{skill}</span>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 h-fit">
                            <label htmlFor="">Resume</label>
                            <div className="w-[295px] h-[442px]">
                                <iframe
                                    src={`${resumeUrl}#page=1`}
                                    className="w-full h-full object-contain"
                                    title="Resume Preview"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-10">
                        <div className="flex flex-col gap-1">
                            <label>About :</label>
                            <div className="border  border-gray-500 rounded p-8 text-lg leading-loose">
                                {initialValues?.about}
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label>Skills :</label>
                            <div className="border  border-gray-500 rounded p-10 flex flex-wrap gap-8 ">
                                {initialValues?.skills?.map((skill, index) => (
                                    <span key={index} className="bg-blue-800 py-2 px-8 text-lg rounded hover:scale-110 duration-150 cursor-pointer">{skill}</span>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label>Education :</label>
                            <div className="border  border-gray-500 rounded p-10 flex flex-wrap  gap-8 ">
                                {initialValues?.education?.map((edu, index) => (
                                    <div key={index} className="flex gap-2 w-fit border p-3 border-gray-500  rounded">
                                        <div className="border w-25 h-25 flex justify-center items-center rounded bg-gray-800 border-black">
                                            <img src="/education.png" className="w-12" />
                                        </div>
                                        <div className="flex flex-col justify-evenly ">
                                            <span className="text-2xl font-medium">{edu?.organization}</span>
                                            <p className="text-gray-400 text-sm">{edu?.course}</p>
                                            <p className="text-gray-400 text-sm">{edu?.duration}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label>Experience :</label>
                            <div className="border  border-gray-500 rounded p-10 flex flex-wrap  gap-8 ">
                                {initialValues?.experience?.map((edu, index) => (
                                    <div key={index} className="flex gap-2 w-fit border p-3 border-gray-500  rounded">
                                        <div className="border w-25 h-25 flex justify-center items-center rounded bg-gray-800 border-black">
                                            <img src="/expertise.png" className="w-12" />
                                        </div>
                                        <div className="flex flex-col justify-evenly ">
                                            <span className="text-2xl font-medium">{edu?.company}</span>
                                            <p className="text-gray-400 text-sm">{edu?.position}</p>
                                            <p className="text-gray-400 text-sm">{edu?.duration}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            < Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={CandidateFormSchema}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue, values, isSubmitting }) => (
                    <Form className={readOnly ? "hidden" : "p-10 bg-gray-950 rounded-lg m-6"}>
                        <div className={readOnly ? "flex relative" : "flex  justify-between"}>
                            {/* Logo */}
                            <div>
                                <div className="flex flex-col gap-2">
                                    <label>Logo</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        disabled={readOnly}
                                        className="input max-w-68 mb-3"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                setFieldValue("logo", file);
                                                setLogoPreview(URL.createObjectURL(file));
                                            }
                                        }}
                                    />
                                </div>
                                {logoPreview && <img src={logoPreview} alt="Logo" className="w-68 h-68 " />}
                                <ErrorMessage name="logo" component="div" className="error" />
                            </div>

                            {/* Banner */}
                            <div>
                                <div className="flex flex-col gap-2">
                                    <label>Banner</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        disabled={readOnly}
                                        className="input mb-3"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                setFieldValue("banner", file);
                                                setBannerPreview(URL.createObjectURL(file));
                                            }
                                        }}
                                    />
                                </div>
                                {bannerPreview && <img src={bannerPreview} alt="Banner" className="object-cover w-[800px] h-68" />}
                                < ErrorMessage name="banner" component="div" className="error" />
                            </div>
                        </div>

                        <div className={readOnly ? " bg-[#08080858] flex flex-col pl-20 pt-15" : " flex flex-col mt-15 gap-8"}>

                            <div className="flex flex-col gap-2 ">
                                <label htmlFor="" className={readOnly && "hidden"}>Name</label>
                                < Field name="name" className={readOnly ? "hidden" : "input max-w-1/3"} />
                                <ErrorMessage name="name" component="div" className="error mt-1 text-sm" />
                            </div>

                            <div className="flex justify-between  gap-10">

                                <div className="flex flex-col gap-2 w-full">
                                    <label htmlFor="" className={readOnly && "hidden"}>About</label>
                                    <Field
                                        as="textarea"
                                        name="about"
                                        rows={10}
                                        readOnly={readOnly}
                                        className={
                                            readOnly
                                                ? "hidden"
                                                : "input  resize-none"
                                        }
                                    />

                                    <ErrorMessage name="about" component="div" className="error mt-1 text-sm" />
                                </div>

                                <div className="flex flex-col gap-2 w-full">
                                    <label htmlFor="" className={readOnly && "hidden"}>Bio</label>
                                    < Field name="bio" as="textarea"
                                        rows={10} className={readOnly ? "hidden" : "input  resize-none"} />
                                    <ErrorMessage name="bio" component="div" className="error mt-1 text-sm" />
                                </div>
                            </div>



                            <div className="flex justify-between  gap-10">
                                <div className="flex flex-col gap-2 w-full">
                                    <label htmlFor="" className={readOnly && "hidden"}>Country</label>
                                    < Field name="country" className={readOnly ? "hidden " : "input"} />
                                    <ErrorMessage name="country" component="div" className="error mt-1 text-sm" />
                                </div>
                                <div className="flex flex-col gap-2 w-full">
                                    <label htmlFor="" className={readOnly && "hidden"}>State</label>
                                    < Field name="state" className={readOnly ? "hidden " : "input"} />
                                    <ErrorMessage name="state" component="div" className="error mt-1 text-sm" />
                                </div>
                                <div className="flex flex-col gap-2 w-full">
                                    <label htmlFor="" className={readOnly && "hidden"}>Address</label>
                                    < Field name="address" className={readOnly ? "hidden " : "input"} />
                                    <ErrorMessage name="address" component="div" className="error mt-1 text-sm" />
                                </div>
                            </div>

                            <div className="flex justify-between  gap-10">
                                <div className="flex flex-col gap-2 w-fit">
                                    <label htmlFor="" className={readOnly && "hidden"}>Gender</label>
                                    < Field name="gender" className={readOnly ? "hidden" : "input"} />
                                    <ErrorMessage name="gender" component="div" className="error mt-1 text-sm" />
                                </div>
                                <div className="flex flex-col gap-2 w-full">
                                    <label htmlFor="" className={readOnly && "hidden"}>Websit</label>
                                    < Field name="website" className={readOnly ? "hidden" : "input"} />
                                    <ErrorMessage name="website" component="div" className="error mt-1 text-sm" />
                                </div>

                            </div>
                        </div>
                        <hr className="my-10 text-gray-600" />
                        {/* Skills */}
                        <div className="mt-8">
                            <label className="mb-2">Skills</label>
                            <FieldArray name="skills">
                                {({ push, remove }) => (
                                    <>
                                        <div className="flex flex-wrap gap-4  mt-4">
                                            {values.skills.map((_, i) => (

                                                <div key={i} className={readOnly ? "hidden" : "flex flex-col w-fit gap-1"}>
                                                    < Field name={`skills[${i}]`} className="input" readOnly={readOnly} />
                                                    {!readOnly && (
                                                        <button type="button" className="text-xs text-red-600 text-right cursor-pointer" onClick={() => remove(i)}>Remove</button>
                                                    )}
                                                    < ErrorMessage name={`skills[${i}]`} component="div" className="error" />
                                                </div>

                                            ))}
                                        </div>

                                        {!readOnly && (
                                            <button type="button" className="bg-blue-600 px-8 py-1 rounded text-sm mt-8" onClick={() => push("")}>Add Skill</button>
                                        )}
                                    </>
                                )}
                            </FieldArray>
                        </div>

                        <hr className="my-10 text-gray-600" />

                        {/* Education */}
                        <div className="mt-8">
                            <label >Education</label>
                            <FieldArray name="education" >
                                {({ push, remove }) => (
                                    <>
                                        <div className="flex flex-col flex-wrap gap-4  mt-4 ">
                                            {values.education.map((_, i) => (
                                                <div className="flex flex-col gap-2">
                                                    <div key={i} className="flex justify-between gap-10 items-center mt-4">
                                                        <div className="flex flex-col gap-2 w-full">
                                                            <Field name={`education[${i}].organization`} placeholder="Organization" className="input" readOnly={readOnly} />
                                                            < ErrorMessage name={`education[${i}].organization`} component="div" className="error" />
                                                        </div>
                                                        <div className="flex flex-col gap-2 w-full">
                                                            <Field name={`education[${i}].course`} placeholder="Course" className="input" readOnly={readOnly} />
                                                            < ErrorMessage name={`education[${i}].course`} component="div" className="error" />
                                                        </div>
                                                        <div className="flex flex-col gap-2 w-full">
                                                            <Field name={`education[${i}].duration`} placeholder="Duration" className="input" readOnly={readOnly} />
                                                            < ErrorMessage name={`education[${i}].duration`} component="div" className="error" />
                                                        </div>

                                                    </div>
                                                    {!readOnly && (
                                                        <button type="button" className="text-xs text-red-600 ms-auto cursor-pointer" onClick={() => remove(i)}>Remove</button>
                                                    )}

                                                </div>
                                            ))}

                                            {!readOnly && (
                                                <button type="button" className='bg-blue-600 px-8 py-1 rounded text-sm mt-8 w-fit' onClick={() => push({ organization: "", course: "", duration: "" })}>Add Education</button>
                                            )}
                                        </div>
                                    </>
                                )}
                            </FieldArray>
                        </div>



                        <hr className="my-10 text-gray-600" />

                        {/* Experience */}
                        <div>
                            <label>Experience</label>
                            <FieldArray name="experience">
                                {({ push, remove }) => (
                                    <>
                                        {values.experience.map((_, i) => (
                                            <div className="flex flex-col gap-2">
                                                <div key={i} className="flex gap-10 mt-4 ">
                                                    <div className="flex flex-col gap-2 w-full">
                                                        <Field name={`experience[${i}].company`} placeholder="Company" className="input" readOnly={readOnly} />
                                                        < ErrorMessage name={`experience[${i}].company`} component="div" className="error" />
                                                    </div>
                                                    <div className="flex flex-col gap-2 w-full">
                                                        <Field name={`experience[${i}].position`} placeholder="Position" className="input" readOnly={readOnly} />
                                                        < ErrorMessage name={`experience[${i}].position`} component="div" className="error" />
                                                    </div>
                                                    <div className="flex flex-col gap-2 w-full">
                                                        <Field name={`experience[${i}].duration`} placeholder="Duration" className="input" readOnly={readOnly} />
                                                        < ErrorMessage name={`experience[${i}].duration`} component="div" className="error" />
                                                    </div>
                                                </div>
                                                {!readOnly && (
                                                    <button type="button" className="text-xs text-red-600 text-right cursor-pointer" onClick={() => remove(i)}>Remove</button>
                                                )}
                                            </div>
                                        ))}
                                        {!readOnly && (
                                            <button type="button" className="bg-blue-600 px-8 py-1 rounded text-sm mt-8 w-fit" onClick={() => push({ company: "", position: "", duration: "" })}>Add Experience</button>
                                        )}
                                    </>
                                )}
                            </FieldArray>
                        </div>

                        <hr className="my-10 text-gray-600" />

                        {/* Resume Upload */}
                        < div className="flex gap-20 items-center" >
                            <div className="flex flex-col gap-2">
                                <label>Resume (PDF)</label>
                                <div className="max-w-[295px] h-[442px] flex justify-center items-center  rounded-md relative">

                                    <label className="w-[295px] h-full flex justify-center items-center cursor-pointer bg-slate-900 hover:bg-slate-800 transition text-center border-slate-600 border rounded">
                                        <span className="text-gray-700">Upload Resume (PDF)</span>
                                        <input
                                            type="file"
                                            accept="application/pdf"
                                            disabled={readOnly}
                                            className="hidden"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    setFieldValue("resume", file);
                                                    setResumeUrl(URL.createObjectURL(file));
                                                }
                                            }}
                                        />
                                    </label>

                                </div>









                            </div>
                            {resumeUrl && (
                                <div className="flex flex-col gap-2">
                                    <label >Resume Preview</label>
                                    <div className="w-[295px] h-[442px]">
                                        <iframe
                                            src={`${resumeUrl}#page=1`}
                                            className="w-full h-full object-contain"
                                            title="Resume Preview"
                                        />
                                    </div>
                                </div>
                            )}
                            <ErrorMessage name="resume" component="div" className="error" />
                        </div>

                        <hr className="my-10 text-gray-600" />


                        <div className="w-1/4 ms-auto">
                            <GlowingButton
                                type="submit"
                                className="py-1.5 w-full"
                                disabled={isSubmitting}
                            >
                                {isSubmitting
                                    ? "Submitting..."
                                    : isEdit
                                        ? "Update Profile"
                                        : "Create Profile"}
                            </GlowingButton>
                        </div>

                    </Form>
                )}
            </Formik >
        </div >
    );
};

export default CandidateProfileForm;
