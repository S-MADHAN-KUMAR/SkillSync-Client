import * as Yup from 'yup';

export const RegisterSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    mobile: Yup.string()
        .matches(/^[0-9]{10}$/, 'Mobile must be 10 digits')
        .required('Mobile is required'),
    password: Yup.string().min(6, 'Min 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm Password is required'),
    role: Yup.string().oneOf(['candidate', 'employee'], 'Invalid role').required('Role is required'),
});

export const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
});

export const OtpVerifyFormSchema = Yup.object({
    otp: Yup.string()
        .required('OTP is required')
        .min(1, 'OTP is required'),
});

export const ForgotOtpFormSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
});

export const ForgotOtpVerifyFormSchema = Yup.object({
    otp: Yup.string()
        .required('OTP is required')
        .matches(/^[0-9]{6}$/, 'OTP must be exactly 6 digits'),
});

export const ResetPasswordFormSchema = Yup.object({
    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), ''], 'Passwords must match')
        .required('Confirm Password is required'),
});