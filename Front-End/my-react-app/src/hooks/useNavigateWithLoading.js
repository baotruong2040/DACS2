import { useNavigate } from 'react-router-dom';
import { useLoading } from '../context/LoadingContext';

export const useNavigateWithLoading = () => {
    const navigate = useNavigate();
    const { showLoading, hideLoading } = useLoading();

    const navigateWithLoading = async (path, options = {}) => {
        const { minTime = 500, loadingText = "Đang chuyển trang..." } = options;
        
        showLoading(loadingText);
        
        await new Promise(resolve => setTimeout(resolve, minTime));
        
        navigate(path);
        hideLoading();
    };

    return navigateWithLoading;
};