export interface RegisterFormValues {
    name: string;
    email: string;
    mobile: string;
    password: string;
    confirmPassword: string;
    role: 'candidate' | 'employee';
    status?: boolean
    profile?: string
    _id?: string
    employeeProfileId?: string
}
export interface LoginFormValues {
    email: string;
    password: string;
}

export interface GoogleCredential {
    email: string;
    name: string;
    picture: string;
}

export interface OtpVerifyFormValues {
    id?: string,
    otp: string;
}
export interface ForgotOtpFormValues {
    email: string,
}
export interface ForgotOtpVerifyFormValues {
    otp: string,
}

export interface ResetPasswordFormValues {
    password: string,
    confirmPassword: string
}

export enum User {
    CANDIDATE = 'candidate',
    EMPLOYEE = 'employee',
    ADMIN = 'admin',
}
