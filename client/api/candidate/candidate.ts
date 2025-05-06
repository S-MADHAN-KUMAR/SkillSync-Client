import { CandidateProfileFormValues } from "@/app/types/candidate";
import axios, { AxiosError } from "axios";
import { showToast } from "../../helpers/showToast";
import { CandidateResponse } from "@/app/types/Api";
import candidateAPI from "../axiosInterceptor/candidateAPI";

export const UpdateCandidateProfile = async (data: CandidateProfileFormValues, id: string) => {
    try {
        const formData = new FormData();

        formData.append("name", data.name);
        formData.append("about", data.about);
        formData.append("bio", data.bio);
        formData.append("country", data.country);
        formData.append("state", data.state);
        formData.append("address", data.address);
        formData.append("gender", data.gender);
        formData.append("website", data.website);

        if (data.logo) formData.append("logo", data.logo);
        if (data.banner) formData.append("banner", data.banner);
        if (data.resume) formData.append("resume", data.resume);

        data.skills.forEach(skill => formData.append("skills[]", skill));

        data.education.forEach((edu, index) => {
            formData.append(`education[${index}][organization]`, edu.organization);
            formData.append(`education[${index}][course]`, edu.course);
            formData.append(`education[${index}][duration]`, edu.duration);
        });

        data.experience.forEach((exp, index) => {
            formData.append(`experience[${index}][company]`, exp.company);
            formData.append(`experience[${index}][position]`, exp.position);
            formData.append(`experience[${index}][duration]`, exp.duration);
        });

        const response = await candidateAPI.put<CandidateResponse>(
            `candidate/${id}/profile`,
            formData,
            {
                withCredentials: true,
            }
        );

        if (response.data.success) {
            showToast(response.data.message, 'dark', 'success');
            localStorage.setItem('candidate', JSON.stringify(response.data.user));
            return response;
        } else {
            showToast(response.data.message || 'Failed to update profile', 'dark', 'error');
        }
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        const message = err.response?.data?.message || err.message || 'Unknown error';
        throw new Error('Error updating profile: ' + message);
    }
}

export const GetCandidateProfile = async (id: string) => {
    try {
        console.log(id);

        const response = await candidateAPI.get<CandidateResponse>(
            `candidate/get/${id}/profile`);

        if (response.data.success) {
            return response.data.candidates
        }
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        const message = err.response?.data?.message || err.message || 'Unknown error';
        throw new Error('Error registering user: ' + message);
    }
}