import * as Yup from 'yup';


export const EmployeeFromSchema = Yup.object({
    companyName: Yup.string().matches(/^[A-Za-z]+$/, 'Only letters are allowed').min(2, 'Min 2 characters').required('Company Name is required'),
    aboutCompany: Yup.string()
        .min(10, 'Min 10 characters')
        .required('About Company is required'),

    logo: Yup.mixed().test('fileType', 'Logo must be an image (jpg, jpeg, png)', (value) => {
        if (value && value instanceof File) {
            const validImageTypes = ['image/jpg', 'image/jpeg', 'image/png'];
            return validImageTypes.includes(value.type);
        }
        return true;
    }),
    banner: Yup.mixed().test('fileType', 'Banner must be an image (jpg, jpeg, png)', (value) => {
        if (value && value instanceof File) {
            const validImageTypes = ['image/jpg', 'image/jpeg', 'image/png'];
            return validImageTypes.includes(value.type);
        }
        return true;
    }),
});

export const FundingFromSchema = Yup.object({
    teamSize: Yup.number().typeError('Team Size must be a number').required('Team Size is required'),
    companyType: Yup.string()
        .oneOf(['Private', 'Public', 'Startup', 'Non-Profit'], 'Invalid Company Type')
        .required('Company Type is required'),
    industryTypes: Yup.string().min(5, 'Select at least one Industry Type').required('Industry Types is required'),
    founderName: Yup.string().required('Founder Name is required'),
    foundedYear: Yup.date()
        .max(new Date(), 'Founded year cannot be in the future')
        .required('Founded Year is required'),
    companyVision: Yup.string().required('Company Vision is required'),
});

export const SocialLinkFromSchema = Yup.object({
    socialLinks: Yup.array().of(
        Yup.object({
            platform: Yup.string().required('Platform is required'),
            url: Yup.string().url('Invalid URL format').required('URL is required'),
        })
    ),
});

export const AccountSettingFormSchema = Yup.object({
    companyPhone: Yup.string()
        .matches(/^\d+$/, 'Phone must be numeric')
        .required('Phone is required'),
    companyEmail: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
    companyCountry: Yup.string()
        .required('Country is required'),
    companyState: Yup.string()
        .required('State is required'),
    companyAddress: Yup.string()
        .required('Address is required'),
});