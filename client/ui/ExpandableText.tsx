'use client';

import React, { useState } from 'react';

type ExpandableTextProps = {
    text: string;
    maxLength?: number
    className: string
};

const ExpandableText = ({ text, maxLength = 200, className }: ExpandableTextProps) => {
    const [showMore, setShowMore] = useState(false);

    const shouldTruncate = text.length > maxLength;
    const displayText = showMore || !shouldTruncate ? text : `${text.slice(0, maxLength)}...`;

    return (
        <div >
            <p className={className}>{displayText}</p>
            {shouldTruncate && (
                <button
                    onClick={() => setShowMore(!showMore)}
                    className="text-blue-500 underline mt-1 text-sm cursor-pointer"
                >
                    {showMore ? 'Show less' : 'Show more'}
                </button>
            )}
        </div>
    );
};

export default ExpandableText;
