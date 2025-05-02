import { EmployeeResponse } from "@/app/types/Api";
import axios, { AxiosError } from "axios";
import { showToast } from "../../helpers/showToast";
import { CompanyProfile } from "@/app/types/employee";

export const GetEmployeeProfile = async (id: string) => {
    try {
        const response = await axios.get<EmployeeResponse>(
            `${process.env.NEXT_PUBLIC_SERVER_URL}employee/${id}/profile`);

        if (response.data.success) {
            return response.data.employee
        }
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        const message = err.response?.data?.message || err.message || 'Unknown error';
        throw new Error('Error registering user: ' + message);
    }
}

export const UpdateEmployeeProfile = async (data: CompanyProfile, id: string) => {
    try {
        const response = await axios.put<EmployeeResponse>(
            `${process.env.NEXT_PUBLIC_SERVER_URL}employee/${id}/profile`,
            data,
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }
        );

        if (response.data.success) {
            showToast(response.data.message, 'dark', 'success');
            localStorage.setItem('employee', JSON.stringify(response.data.employee));
            return response;
        } else {
            showToast(response.data.message || 'Failed to update profile', 'dark', 'error');
        }
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        const message = err.response?.data?.message || err.message || 'Unknown error';
        throw new Error('Error registering user: ' + message);
    }
};