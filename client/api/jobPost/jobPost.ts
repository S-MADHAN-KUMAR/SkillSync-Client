import { JobPostFormValues } from "@/app/types/jobPost";
import axios, { AxiosError } from "axios";
import { showToast } from "../../helpers/showToast";
import { jobPostResponse } from "@/app/types/Api";


export const CreateJobPost = async (data: JobPostFormValues) => {
    try {
        const response = await axios.post<jobPostResponse>(
            `${process.env.NEXT_PUBLIC_SERVER_URL}employee/jobs/create`,
            data,
            {
                withCredentials: true,
            }
        );

        if (response.data.success) {
            showToast(response.data.message, 'dark', 'success');
        } else {
            showToast(response.data.message || 'Failed to create job post', 'dark', 'error');
        }
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        const message = err.response?.data?.message || err.message || 'Unknown error';
        showToast(message)
        throw new Error('Error registering user: ' + message);
    }
};

export const updateJobPost = async (data: JobPostFormValues, id: string) => {
    try {
        const response = await axios.put<jobPostResponse>(
            `${process.env.NEXT_PUBLIC_SERVER_URL}employee/jobs/${id}`,
            data,
            {
                withCredentials: true,
            }
        );

        if (response.data.success) {
            showToast(response.data.message, 'dark', 'success');
        } else {
            showToast(response.data.message || 'Failed to create job post', 'dark', 'error');
        }
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        const message = err.response?.data?.message || err.message || 'Unknown error';
        showToast(message)
        throw new Error('Error registering user: ' + message);
    }
};

export const GetAllJobs = async (page: number, pageSize: number) => {
    try {
        const response = await axios.get<jobPostResponse>(
            `${process.env.NEXT_PUBLIC_SERVER_URL}employee/jobs?page=${page}&pageSize=${pageSize}`
        )
        if (response.data.success) {
            return response.data
        }
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        const message = err.response?.data?.message || err.message || 'Unknown error';
        throw new Error('Error registering user: ' + message);
    }
};

export const GetRecentJobs = async (page: number, pageSize: number) => {
    try {
        const response = await axios.get<jobPostResponse>(
            `${process.env.NEXT_PUBLIC_SERVER_URL}employee/jobs/recent`
        )
        if (response.data.success) {
            return response.data.jobs
        }
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        const message = err.response?.data?.message || err.message || 'Unknown error';
        throw new Error('Error registering user: ' + message);
    }
};

export const GetJob = async (id: string) => {
    try {
        const response = await axios.get<jobPostResponse>(
            `${process.env.NEXT_PUBLIC_SERVER_URL}employee/jobs/${id}`
        )
        if (response.data.success) {
            return response.data.jobs
        }
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        const message = err.response?.data?.message || err.message || 'Unknown error';
        throw new Error('Error registering user: ' + message);
    }
};

export const RemoveJob = async (id: string) => {
    try {
        const response = await axios.put<jobPostResponse>(
            `${process.env.NEXT_PUBLIC_SERVER_URL}employee/jobs/remove/${id}`
        )
        if (response.data.success) {
            showToast(response.data.message, 'dark', 'success')
        } else {
            showToast(response.data.message || 'Failed to update profile', 'dark', 'error');
        }
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        const message = err.response?.data?.message || err.message || 'Unknown error';
        showToast(message)
        throw new Error('Error registering user: ' + message);
    }
};