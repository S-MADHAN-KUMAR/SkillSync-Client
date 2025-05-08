import * as Yup from 'yup';

export const MockInterviewFormValidation = Yup.object().shape({
    jobRole: Yup.string()
        .required('Job role/position is required')
        .min(2, 'Job role must be at least 2 characters'),
    description: Yup.string()
        .required('Job description / tech stack is required')
        .min(10, 'Description must be at least 10 characters'),
    experience: Yup.number()
        .required('Years of experience is required')
        .min(0, 'Experience must be 0 or more')
        .max(50, 'Experience must be less than 50'),
    mode: Yup.string().oneOf(['easy', 'medium', 'hard']).required('Mode is required'),
    numberOfQuestions: Yup.number().required('Required').min(5).max(20),
});