export interface JobPostFormValues {
    _id?: string;
    jobTitle: string;
    tags: string[];
    minSalary: number | string;
    maxSalary: number | string;
    salaryType: string;
    education: string;
    experience: string;
    jobType: string;
    expiredAt: string;
    jobLevel: string;
    vacancies: number | string;
    country: string;
    state: string;
    address: string;
    jobDescription: string;
    jobBenefits: string[];
    status: boolean;
    postedAt: Date;
    employeeId: string | undefined;
}
