import { AdminResponse } from "@/app/types/Api";
import axios, { AxiosError } from "axios";
import { showToast } from "../../helpers/showToast";


export const GetCandidates = async (
    page: number,
    pageSize: number,
    querys?: string,
) => {
    try {

        const params = new URLSearchParams();
        params.append('page', page.toString());
        params.append('pageSize', pageSize.toString());
        if (querys) params.append('querys', querys);

        const response = await axios.get<AdminResponse>(`${process.env.NEXT_PUBLIC_SERVER_URL}admin/candidates?${params.toString()}`)
        if (response.data.success) {
            return response.data
        } else {
            showToast(response.data.message, 'dark', 'error');
        }
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        const message = err.response?.data?.message || err.message || 'Unknown error';
        showToast(message)
        throw new Error('Error registering user: ' + message);
    }
};


export const GetEmployees = async (
    page: number,
    pageSize: number,
    querys?: string,
) => {
    try {

        const params = new URLSearchParams();
        params.append('page', page.toString());
        params.append('pageSize', pageSize.toString());
        if (querys) params.append('querys', querys);

        const response = await axios.get<AdminResponse>(`${process.env.NEXT_PUBLIC_SERVER_URL}admin/employees?${params.toString()}`
        )
        if (response.data.success) {
            return response.data
        } else {
            showToast(response.data.message, 'dark', 'error');
        }
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        const message = err.response?.data?.message || err.message || 'Unknown error';
        showToast(message)
        throw new Error('Error registering user: ' + message);
    }
};

export const ToggleStatus = async (id: string, role: string, status: boolean) => {
    console.log(id, role, status);

    try {
        const response = await axios.put<AdminResponse>(`${process.env.NEXT_PUBLIC_SERVER_URL}admin/users/status`, { id, role, status });
        if (response.data.success) {
            showToast(response.data.message, 'dark', 'success');
        } else {
            showToast(response.data.message, 'dark', 'success');
        }

    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        const message = err.response?.data?.message || err.message || 'Unknown error';
        showToast(message)
        throw new Error('Error registering user: ' + message);
    }

}