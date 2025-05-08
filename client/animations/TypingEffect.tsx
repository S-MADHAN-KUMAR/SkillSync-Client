import { useEffect, useState } from "react";

export const TypingEffect = ({ text, speed = 50 }: { text: string; speed?: number }) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        let currentIndex = 0;
        const interval = setInterval(() => {
            setDisplayedText(text.slice(0, currentIndex + 1));
            currentIndex++;
            if (currentIndex >= text.length) clearInterval(interval);
        }, speed);
        return () => clearInterval(interval);
    }, [text, speed]);

    return <>{displayedText}</>;
};
