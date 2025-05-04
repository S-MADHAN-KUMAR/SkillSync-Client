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

export const GetAllJobs = async (
    page: number,
    pageSize: number,
    querys?: string,
    location?: string,
    jobType?: string,
    skill?: string,
    active?: boolean,
    expiredBefore?: Date
) => {
    try {
        const params = new URLSearchParams();
        params.append('page', page.toString());
        params.append('pageSize', pageSize.toString());
        if (querys) params.append('querys', querys);
        if (location && location !== 'All') params.append('location', location);
        if (jobType && jobType !== 'All') params.append('jobType', jobType);
        if (skill && skill !== 'All') params.append('skill', skill);
        if (active !== undefined) params.append('active', String(active));
        if (expiredBefore !== undefined) params.append('expiredBefore', expiredBefore.toISOString());

        console.log("Calling API with params:", params.toString());

        const response = await axios.get<jobPostResponse>(
            `${process.env.NEXT_PUBLIC_SERVER_URL}employee/jobs?${params.toString()}`
        );

        if (response.data.success) {
            return response.data;
        }
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        const message = err.response?.data?.message || err.message || 'Unknown error';
        throw new Error('Error fetching jobs: ' + message);
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

export const ToggleStatus = async (id: string, status: string) => {
    try {
        const response = await axios.put<jobPostResponse>(
            `${process.env.NEXT_PUBLIC_SERVER_URL}employee/jobs/status/${id}`, { status: status }
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