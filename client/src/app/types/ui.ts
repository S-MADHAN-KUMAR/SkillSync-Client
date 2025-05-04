import { JobPostFormValues } from "./jobPost";

export type Column<T> = {
    title: string;
    key: string;
    render?: (item: T) => React.ReactNode;
};

export type TableProps<T> = {
    data: T[];
    columns: Column<T>[];
    loading?: boolean;
    noDataText?: string;
};

export type PaginationProps = {
    TotalItems: number;      // total number of jobs or total pages (based on backend design)
    pageSize: number;       // jobs per page
    currentPage: number;
    onPageChange: (page: number) => void;
};

export interface GlowingButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
}

export interface NavLink {
    label: string;
    href: string;
}

export interface NavbarProps {
    navLinks?: NavLink[];
}

export const candidateLinks: NavLink[] = [
    { label: 'Home', href: '/candidate' },
    { label: 'Find Jobs', href: '/candidate/jobs' },
    { label: 'Companies', href: '/candidate/companies' },
    { label: 'Profile', href: '/candidate/profile' },
]
export const employeeLinks: NavLink[] = [
    { label: 'Home', href: '/employee' },
    { label: 'Candidates', href: '/employee/candidates' },
    { label: 'dashboard', href: '/employee/dashboard' },
]

export interface JobTableRowProps {
    post: JobPostFormValues;
    onEdit: (id: string) => void;
    onDelete: (id: string, status: string) => void;
}

export interface JobTableProps {
    jobPosts: JobPostFormValues[];
    onEdit: (id: string) => void;
    onDelete: (id: string, status: string) => void;
    onPageChange: (page: number) => void;
    page: number;
    totalPages: number;
}
