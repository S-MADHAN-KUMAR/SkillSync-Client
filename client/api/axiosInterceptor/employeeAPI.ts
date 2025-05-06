import axios from 'axios';
import Cookies from 'js-cookie';

const employeeAPI = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    withCredentials: true,
});

employeeAPI.interceptors.request.use((config) => {
    const token = Cookies.get('employeeAccessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

employeeAPI.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            try {
                const refreshResponse = await axios.post(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}auth/refresh-token`, // <- fixed URL
                    {},
                    { withCredentials: true }
                );
                console.log('!!!!! refresh-token called !!!!!');

                const newAccessToken = refreshResponse.data.accessToken;

                Cookies.set('employeeAccessToken', newAccessToken);

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return employeeAPI(originalRequest);
            } catch (refreshError) {
                Cookies.remove('employeeAccessToken');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default employeeAPI;
