import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showToast = (message: string, theme: string = 'dark', type: string = 'success') => {
    const toastTypes: any = {
        success: toast.success,
        error: toast.error,
        warning: toast.warning,
        info: toast.info,
    };

    const toastOptions = {
        theme
    };

    const toastFunction = toastTypes[type] || toast.success;
    toastFunction(message, toastOptions);
};