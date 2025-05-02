import * as Yup from 'yup';

export const JobPostFormSchema = Yup.object({
    jobTitle: Yup.string().required('Job Title is required'),
    tags: Yup.array()
        .of(Yup.string())
        .min(1, 'At least one tag is required')
        .required('Tags are required'),
    minSalary: Yup.number()
        .typeError('Minimum Salary must be a number')
        .positive('Minimum Salary must be a positive number')
        .required('Minimum Salary is required'),

    maxSalary: Yup.number()
        .typeError('Maximum Salary must be a number')
        .positive('Maximum Salary must be a positive number')
        .required('Maximum Salary is required'),

    vacancies: Yup.number()
        .typeError('Vacancies must be a number')
        .positive('Vacancies must be a positive number')
        .required('Vacancies are required'),
    salaryType: Yup.string().required('Salary Type is required'),
    education: Yup.string().required('Education is required'),
    experience: Yup.string().required('Experience is required'),
    jobType: Yup.string().required('Job Type is required'),
    experienceDate: Yup.string().required('Experience Date is required'),
    jobLevel: Yup.string().required('Job Level is required'),
    country: Yup.string().required('Country is required'),
    state: Yup.string().required('State is required'),
    address: Yup.string().required('Address is required'),
    jobDescription: Yup.string().required('Job Description is required'),
    jobBenefits: Yup.array().of(Yup.string()),
    postedAt: Yup.date(),
});
