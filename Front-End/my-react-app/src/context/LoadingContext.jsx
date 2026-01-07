import React, { createContext, useContext, useState, useCallback } from 'react';
import { PageLoading, ProgressLoading } from '../components/Loading';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("Đang tải...");
    const [loadingType, setLoadingType] = useState('spinner'); // 'spinner' | 'progress'

    const showLoading = useCallback((text = "Đang tải...", type = 'spinner') => {
        setLoadingText(text);
        setLoadingType(type);
        setIsLoading(true);
    }, []);

    const hideLoading = useCallback(() => {
        setIsLoading(false);
    }, []);

    // Loading với thời gian tối thiểu
    const showLoadingWithMinTime = useCallback((text = "Đang tải...", minTime = 500) => {
        setLoadingText(text);
        setIsLoading(true);
        
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, minTime);
        });
    }, []);

    // Wrap async function với loading
    const withLoading = useCallback(async (asyncFn, text = "Đang tải...", minTime = 500) => {
        showLoading(text);
        const startTime = Date.now();
        
        try {
            const result = await asyncFn();
            const elapsed = Date.now() - startTime;
            
            // Đảm bảo loading hiển thị ít nhất minTime
            if (elapsed < minTime) {
                await new Promise(resolve => setTimeout(resolve, minTime - elapsed));
            }
            
            return result;
        } finally {
            hideLoading();
        }
    }, [showLoading, hideLoading]);

    return (
        <LoadingContext.Provider value={{ 
            isLoading, 
            showLoading, 
            hideLoading, 
            showLoadingWithMinTime,
            withLoading 
        }}>
            {loadingType === 'spinner' ? (
                <PageLoading isLoading={isLoading} text={loadingText} />
            ) : (
                <ProgressLoading isLoading={isLoading} />
            )}
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
};