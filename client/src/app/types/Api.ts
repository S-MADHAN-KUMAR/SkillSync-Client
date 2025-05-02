import { RegisterFormValues } from "./auth";
import { EmployeeDataType } from "./employee";
import { JobPostFormValues } from "./jobPost";

export type jobPostResponse = {
    success: boolean;
    jobs: JobPostFormValues
    message: string;
    totalJobs?: number
    totalPages?: number
    currentPage?: number
};

export type UserResponse = {
    success: boolean;
    user: RegisterFormValues
    token: string
    message: string;
};

export interface googleAuth {
    email: string;
    name: string;
    picture: string;
    role: string | null
}

export type EmployeeResponse = {
    success: boolean;
    employee: EmployeeDataType
    token: string
    message: string;
};

export type CandidateResponse = {
    success: boolean;
    candidates: EmployeeDataType
    user: RegisterFormValues
    token: string
    message: string;
};
