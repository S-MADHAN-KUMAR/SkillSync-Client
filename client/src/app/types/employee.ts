export interface CompanyProfile {
    _id?: string;
    logo: string | File;
    banner: string | File;
    companyName: string;
    aboutCompany: string;
}

export interface FoundingProfile {
    teamSize: number | '';
    companyType: 'Private' | 'Public' | 'Startup' | 'Non-Profit' | '';
    industryTypes: string;
    founderName: string;
    foundedYear: string;
    companyVision: string;
}

export interface SocialLink {
    platform: string;
    url: string;
}

export interface SocialLinkFormValues {
    socialLinks: SocialLink[];
}

export interface AccountSettingForm {
    companyPhone: string;
    companyEmail: string;
    companyCountry: string;
    companyState: string;
    companyAddress: string;
}

export interface EmployeeDataType
    extends CompanyProfile,
    FoundingProfile,
    SocialLinkFormValues,
    AccountSettingForm { }