import { RegisterFormValues } from "./auth";
import { CandidateProfileFormValues } from "./candidate";
import { EmployeeDataType } from "./employee";
import { JobPostFormValues } from "./jobPost";

export type jobPostResponse = {
    success: boolean;
    jobs: JobPostFormValues[]
    job: JobPostFormValues
    message: string;
    totalJobs?: number
    totalPages?: number
    currentPage?: number
};

export type UserResponse = {
    success: boolean;
    user: RegisterFormValues
    token: string
    accessToken: string
    message: string;
};
export type AdminResponse = {
    success: boolean;
    users: RegisterFormValues[]
    token: string
    totalPages: number
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
    totalPages: number
    employee: EmployeeDataType
    employees: EmployeeDataType[]
    token: string
    message: string;
};

export type CandidateResponse = {
    success: boolean;
    candidates: CandidateProfileFormValues
    user: RegisterFormValues
    token: string
    message: string;
};
