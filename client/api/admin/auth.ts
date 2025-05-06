import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { showToast } from "../../helpers/showToast";
import { LoginFormValues } from "@/app/types/admin";
import axios from "axios";
import { AdminResponse } from "@/app/types/Api";

export const adminLogout = async (router: AppRouterInstance): Promise<void> => {
    try {
        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_URL}admin/logout`,
            {},
            { withCredentials: true }
        );
        if (res.data.success) {
            showToast(res.data.message, 'dark', 'success');
            localStorage.removeItem('admin');
            router.push('/admin/login');
        }
    } catch (error) {
        console.error('Logout error:', error);
    }
}

export const AdminLogin = async (data: LoginFormValues, router: AppRouterInstance) => {
    try {
        const response = await axios.post<AdminResponse>(
            `${process.env.NEXT_PUBLIC_SERVER_URL}admin/login`, data, { withCredentials: true });

        const { success, message } = response.data;

        if (success) {
            showToast(message, 'dark', 'success');
            router.push('/admin');
        } else {
            showToast(message, 'dark', 'error');
        }

    } catch (error: any) {
        const errMsg = error?.response?.data?.message || 'Login failed';
        showToast(errMsg, 'dark', 'error');
        console.error('Error while logging in:', error);
    }
};