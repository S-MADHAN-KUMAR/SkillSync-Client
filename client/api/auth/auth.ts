import axios, { AxiosError } from 'axios';
import { LoginFormValues, OtpVerifyFormValues, RegisterFormValues, ResetPasswordFormValues } from '@/app/types/auth';
import Cookies from 'js-cookie';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { showToast } from '../../helpers/showToast';
import { googleAuth, UserResponse } from '@/app/types/Api';

export const Register = async (data: RegisterFormValues, router: AppRouterInstance) => {
    try {
        const response = await axios.post<UserResponse>(
            `${process.env.NEXT_PUBLIC_SERVER_URL}auth/register`,
            data,
            { withCredentials: true }
        );

        if (response.data.success) {
            const { user, message, token } = response.data;
            console.log(message);

            const userType = user.role === 'candidate' ? 'candidate' : 'employee';
            localStorage.setItem(userType, JSON.stringify(user));
            Cookies.set(`${userType}Token`, token, { expires: 7 })
            showToast(message, 'dark', 'success');

            router.push('/register/otpVerify');
        } else {
            showToast(response.data.message || 'Registration failed', 'dark', 'error');
        }
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        const message = err.response?.data?.message || err.message || 'Unknown error';
        showToast(message)
        throw new Error('Error registering user: ' + message);
    }
}

export const OtpVerify = async (data: OtpVerifyFormValues, router: AppRouterInstance) => {
    try {
        const response = await axios.post<UserResponse>(
            `${process.env.NEXT_PUBLIC_SERVER_URL}auth/otp/verify`,
            data,
            { withCredentials: true }
        );

        if (response.data.success) {
            const { user, message, token } = response.data;
            console.log(message);

            const userType = user.role === 'candidate' ? 'candidate' : 'employee';
            localStorage.setItem(userType, JSON.stringify(user));
            Cookies.set(`${userType}Token`, token, { expires: 7 })
            showToast(message, 'dark', 'success');
            router.push(`/${userType}`);
        } else {
            showToast(response.data.message || 'Registration failed', 'dark', 'error');
        }
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        const message = err.response?.data?.message || err.message || 'Unknown error';
        showToast(message)
        throw new Error('Error registering user: ' + message);
    }

};

export const ResendOtp = async (email: string) => {
    try {
        const response = await axios.get<UserResponse>(
            `${process.env.NEXT_PUBLIC_SERVER_URL}auth/otp/resend/${email}`);

        if (response.data.success) {
            const { user, message } = response.data;
            const userType = user.role === 'candidate' ? 'candidate' : 'employee';
            localStorage.setItem(userType, JSON.stringify(user));
            showToast(message, 'dark', 'success');
        } else {
            showToast(response.data.message || 'Registration failed', 'dark', 'error');
        }
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        const message = err.response?.data?.message || err.message || 'Unknown error';
        showToast(message)
        throw new Error('Error registering user: ' + message);
    }

}

export const Login = async (data: LoginFormValues, router: AppRouterInstance) => {
    try {
        const response = await axios.post<UserResponse>(
            `${process.env.NEXT_PUBLIC_SERVER_URL}auth/login`,
            data,
            { withCredentials: true }
        );

        if (response.data.success) {
            const { user, message, token } = response.data;
            showToast(message, 'dark', 'success');
            const userType = user.role === 'candidate' ? 'candidate' : 'employee';
            localStorage.setItem(userType, JSON.stringify(user));
            Cookies.set(`${userType}Token`, token, { expires: 7 })
            router.push(`/${userType}`)
        } else {
            showToast(response.data.message, 'dark', 'error');
            localStorage.removeItem('candidate');
            localStorage.removeItem('employee');
            Cookies.remove(`candidateToken`)
            Cookies.remove(`employeeToken`)
        }
    } catch (error) {
        if (error && (error as any).isAxiosError) {
            showToast((error as any).response?.data?.message || 'Something went wrong', 'dark', 'error');
            localStorage.removeItem('candidate');
            localStorage.removeItem('employee');
            Cookies.remove(`candidateToken`)
            Cookies.remove(`employeeToken`)
        } else {
            console.error('Unexpected error:', error);
            showToast('An unexpected error occurred', 'dark', 'error');
            localStorage.removeItem('candidate');
            localStorage.removeItem('employee');
            Cookies.remove(`candidateToken`)
            Cookies.remove(`employeeToken`)
        }
    }
}

export const CheckUserExists = async (email: string): Promise<boolean> => {
    try {
        const response = await axios.get<UserResponse>(
            `${process.env.NEXT_PUBLIC_SERVER_URL}auth/users/email/${email}`,
            { withCredentials: true }
        );

        if (response?.data.success) {
            return true;
        } else {
            return false;
        }
    } catch (error: any) {
        showToast(error.response?.data?.message, 'dark', 'error');
        return false;
    }
};

export const UserGoogleAuth = async (data: googleAuth, router: AppRouterInstance) => {
    try {
        const response = await axios.post<UserResponse>(
            `${process.env.NEXT_PUBLIC_SERVER_URL}auth/google`,
            data,
            { withCredentials: true }
        );

        if (response.data.success) {
            showToast(response.data.message, 'dark', 'success');
            const { user, token } = response.data;
            if (user?.role === 'candidate') {
                router.push('/candidate');
                Cookies.set('candidateToken', token, { expires: 7 })
                localStorage.setItem('candidate', JSON.stringify(user));
            } else {
                router.push('/employee');
                Cookies.set('employeeToken', token, { expires: 7 })
                localStorage.setItem('employee', JSON.stringify(user));
            }
        } else {
            showToast(response.data.message, 'dark', 'error');
        }
    } catch (error: any) {
        if (error.response?.status === 404) {
            return false;
        }
        showToast(error.response?.data?.message || 'Something went wrong', 'dark', 'error');
        return false;
    }
}

export const CandidateLogout = async (router: AppRouterInstance): Promise<void> => {
    Cookies.remove('candidateToken')
    localStorage.removeItem('candidate');
    showToast('candidate logged out', 'dark', 'success');
    router.push('/login')
}

export const EmployeeLogout = async (router: AppRouterInstance): Promise<void> => {
    Cookies.remove('employeeToken')
    Cookies.remove('isCompanySetupComplete')
    localStorage.removeItem('employee');
    showToast(' employee logged out', 'dark', 'success');
    router.push('/login')
}

export const ForgotEmail = async (email: string, router: AppRouterInstance) => {
    try {
        const response = await axios.get<UserResponse>(
            `${process.env.NEXT_PUBLIC_SERVER_URL}auth/otp/forgot/${email}`);

        if (response.data.success) {
            const { user, message } = response.data;
            const userType = user.role === 'candidate' ? 'candidate' : 'employee';
            localStorage.setItem(userType, JSON.stringify(user));
            showToast(message, 'dark', 'success');
            router.push('/forgotpassword/otpVerify')
        } else {
            showToast(response.data.message || 'Registration failed', 'dark', 'error');
        }
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        const message = err.response?.data?.message || err.message || 'Unknown error';
        showToast(message)
        throw new Error('Error registering user: ' + message);
    }

};

export const ForgotOtpVerify = async (data: { id: string, otp: string }, router: AppRouterInstance) => {
    try {
        const response = await axios.post<UserResponse>(
            `${process.env.NEXT_PUBLIC_SERVER_URL}auth/otp/forgot/verify`,
            data,
            { withCredentials: true }
        );

        if (response.data.success) {
            const { user, message } = response.data;
            const userType = user.role === 'candidate' ? 'candidate' : 'employee';
            localStorage.setItem(userType, JSON.stringify(user));
            showToast(message, 'dark', 'success');
            router.push('/forgotpassword/resetPassword')
            return response.data.success
        } else {
            showToast(response.data.message || 'Registration failed', 'dark', 'error');
        }
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        const message = err.response?.data?.message || err.message || 'Unknown error';
        showToast(message)
        throw new Error('Error registering user: ' + message);
    }

};

export const ResetPassword = async (data: ResetPasswordFormValues, router: AppRouterInstance) => {
    try {
        const response = await axios.post<UserResponse>(
            `${process.env.NEXT_PUBLIC_SERVER_URL}auth/password/reset`,
            data,
            { withCredentials: true }
        );

        if (response.data.success) {
            const { user, message } = response.data;
            console.log(message);

            const userType = user.role === 'candidate' ? 'candidate' : 'employee';
            localStorage.setItem(userType, JSON.stringify(user));
            showToast(message, 'dark', 'success');
            router.push(`/login`);
        } else {
            showToast(response.data.message || 'Registration failed', 'dark', 'error');
        }
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        const message = err.response?.data?.message || err.message || 'Unknown error';
        showToast(message)
        throw new Error('Error registering user: ' + message);
    }

};