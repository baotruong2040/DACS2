import React from 'react';
import styles from './styles/Loading.module.css';

// Full Page Loading Overlay
export const PageLoading = ({ isLoading, text = "Đang tải..." }) => {
    if (!isLoading) return null;
    
    return (
        <div className={styles.loadingOverlay}>
            <div className={styles.spinnerContainer}>
                <div className={styles.spinner}></div>
                <span className={styles.loadingText}>{text}</span>
            </div>
        </div>
    );
};

// Dots Loading
export const DotsLoading = ({ isLoading }) => {
    if (!isLoading) return null;
    
    return (
        <div className={styles.loadingOverlay}>
            <div className={styles.spinnerContainer}>
                <div className={styles.dotsLoader}>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                </div>
                <span className={styles.loadingText}>Đang tải...</span>
            </div>
        </div>
    );
};

// Progress Bar Loading (ở đầu trang)
export const ProgressLoading = ({ isLoading }) => {
    if (!isLoading) return null;
    
    return (
        <div className={styles.progressBar}>
            <div className={styles.progressFill}></div>
        </div>
    );
};

// Inline Loading (cho các section nhỏ)
export const InlineLoading = ({ isLoading }) => {
    if (!isLoading) return null;
    
    return (
        <div className={styles.inlineLoader}>
            <div className={styles.inlineSpinner}></div>
        </div>
    );
};

// Skeleton Card Loading
export const SkeletonCard = () => {
    return (
        <div className={styles.skeletonCard}>
            <div className={styles.skeletonImage}></div>
            <div className={styles.skeletonText}></div>
            <div className={`${styles.skeletonText} ${styles.skeletonTextShort}`}></div>
        </div>
    );
};

// Skeleton List Loading
export const SkeletonList = ({ count = 4 }) => {
    return (
        <>
            {Array(count).fill(0).map((_, index) => (
                <SkeletonCard key={index} />
            ))}
        </>
    );
};

// Button with Loading state
export const LoadingButton = ({ isLoading, children, onClick, className, ...props }) => {
    return (
        <button 
            className={`${className} ${isLoading ? styles.buttonLoading : ''}`}
            onClick={isLoading ? undefined : onClick}
            disabled={isLoading}
            {...props}
        >
            {isLoading && <span className={styles.buttonSpinner}></span>}
            {children}
        </button>
    );
};

export default PageLoading;