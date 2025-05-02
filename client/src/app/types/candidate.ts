export interface CandidateProfileFormValues {
    userId?: string;
    logo: File | string | null;
    banner: File | string | null;
    name: string;
    about: string;
    bio: string;
    country: string;
    state: string;
    address: string;
    gender: string;
    website: string;
    skills: string[];
    education: {
        organization: string;
        course: string;
        duration: string;
    }[];
    experience: {
        company: string;
        position: string;
        duration: string;
    }[];
    resume: File | null;
}
