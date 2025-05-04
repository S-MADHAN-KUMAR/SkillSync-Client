import * as Yup from 'yup';

// File validation helpers
const isImage = (file: File | null) =>
    file && ['image/jpg', 'image/jpeg', 'image/png'].includes(file.type);

const isPDF = (file: File | null) => file && file.type === "application/pdf";

// Yup validation schema
export const CandidateFormSchema = Yup.object({
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
            organization: Yup.string().matches(/^[A-Za-z\s]+$/, "Only letters are allowed")
                .min(3, "Must be at least 3 characters")
                .required("Required"),
            course: Yup.string()
                .matches(/^[A-Za-z\s]+$/, "Only letters are allowed")
                .min(3, "Must be at least 3 characters")
                .required("Required"),
            duration: Yup.string()
                .matches(/^[0-9\-_]+$/, "Only numbers, dashes (-), and underscores (_) are allowed")
                .required("Required"),
        })
    ).min(1, "At least one education entry is required"),
    experience: Yup.array().of(
        Yup.object({
            company: Yup.string()
                .matches(/^[A-Za-z\s]+$/, "Only letters are allowed")
                .min(3, "Must be at least 3 characters")
                .required("Required"),

            position: Yup.string()
                .matches(/^[A-Za-z\s]+$/, "Only letters are allowed")
                .min(3, "Must be at least 3 characters")
                .required("Required"),

            duration: Yup.string()
                .matches(/^[0-9\-_]+$/, "Only numbers, dashes (-), and underscores (_) are allowed")
                .required("Required"),
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