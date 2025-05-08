import { MockInterview } from "@/app/types/ai";
import { showToast } from "../../helpers/showToast";
import { MockInterviewResponse } from "@/app/types/Api";
import axios from "axios";

export const createMockInterview = async (data: MockInterview) => {
    try {
        const storedUser = localStorage.getItem('candidate');
        const parsedUser = storedUser ? JSON.parse(storedUser) : null;
        const id = parsedUser?._id as string ?? '';

        if (!id) {
            showToast('Candidate ID not found.', 'dark', 'error');
            return false;
        }

        const response = await axios.post<MockInterviewResponse>(
            `${process.env.NEXT_PUBLIC_SERVER_URL}ai/mockInterview/${id}`,
            data,
            { withCredentials: true }
        );

        if (response.data.success) {
            showToast(response.data.message, 'dark', 'success');
            return response.data
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
};

export const getMockInterview = async (id: string) => {
    try {
        const response = await axios.get<MockInterviewResponse>(
            `${process.env.NEXT_PUBLIC_SERVER_URL}ai/get/${id}`);

        if (response.data.success) {
            return response?.data
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
};
