// ui/paginations/Pagination.tsx
import React from 'react';

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
    if (totalPages <= 1) return null;

    const handlePrev = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    const renderPageNumbers = () => {
        const pages = [];

        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => onPageChange(i)}
                    className={`px-3 py-1 rounded-md  ${currentPage === i
                        ? 'bg-green-600 text-white'
                        : 'bg-white dark:bg-[#1f1f1f] text-gray-700 dark:text-white'
                        }`}
                >
                    {i}
                </button>
            );
        }

        return pages;
    };

    return (
        <div className="flex justify-center items-center mt-6 gap-2 flex-wrap ">
            <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="px-6 py-1 bg-blue-800 rounded-md disabled:opacity-50"
            >
                Prev
            </button>

            {renderPageNumbers()}

            <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="px-6 text-center py-1  rounded-md disabled:opacity-50 bg-blue-800"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
