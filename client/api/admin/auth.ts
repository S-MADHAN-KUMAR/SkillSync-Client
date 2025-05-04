import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Cookies from "js-cookie";
import { showToast } from "../../helpers/showToast";
import { LoginFormValues } from "@/app/types/admin";
import axios from "axios";

export const adminLogout = async (router: AppRouterInstance): Promise<void> => {
    Cookies.remove('adminToken')
    showToast('Admin loggout successfully.', 'dark', 'success');
    router.push('/admin/login')
}

export const AdminLogin = async (data: LoginFormValues, router: AppRouterInstance) => {
    try {
        const response = await axios.post<any>(
            `${process.env.NEXT_PUBLIC_SERVER_URL}admin/login`, data);

        const { success, message, token } = response.data;

        if (success) {
            Cookies.set('adminToken', token, { expires: 7 });
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