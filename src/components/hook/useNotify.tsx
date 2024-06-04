import { toast } from "react-toastify"


const useNotify = () => {
    const showToast = (message: string, options = {}) => toast(message, options);

    const showSuccessToast = (message: string, options = {}) => toast.success(message, options);

    const showErrorToast = (message: string, options = {}) => toast.error(message, options);

    const showWarningToast = (message: string, options = {}) => toast.warn(message, options);

    const showInfoToast = ( message: string, options = {}) => toast.info(message, options);

    return {
        showToast,
        showSuccessToast,
        showErrorToast,
        showWarningToast,
        showInfoToast
    }
}

export default useNotify;