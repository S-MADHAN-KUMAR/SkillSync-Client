import React, { useEffect } from 'react';
import useSpeechToText from 'react-hook-speech-to-text';
import { AnimatePresence, motion } from 'framer-motion'

export default function RecordBtn({ onTranscriptUpdate }: { onTranscriptUpdate: (text: string) => void }) {
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false,
    });

    // Combine interim and final transcript for faster feedback
    useEffect(() => {
        const finalTranscript = results?.map((r: any) => r.transcript).join(' ') || '';
        const combinedTranscript = `${finalTranscript} ${interimResult || ''}`.trim();
        onTranscriptUpdate(combinedTranscript);
    }, [interimResult, results]);

    if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

    return (
        <div className='flex flex-col justify-center items-center gap-4'>
            <button
                onClick={isRecording ? stopSpeechToText : startSpeechToText}
                className={`flex items-center gap-2 py-1.5 px-6 rounded-full cursor-pointer transition duration-300 ${isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
                    }`}
            >
                <span className={`w-3 h-3 rounded-full ${isRecording ? 'bg-red-300' : 'bg-green-300'}`}></span>
                {isRecording ? 'Stop Recording' : 'Start Recording'}
            </button>
            {/* Only show live speech */}
            {interimResult && (
                <AnimatePresence mode="wait">
                    <motion.div
                        key={interimResult}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.4 }}
                        className=" text-white italic text-lg"
                    >
                        <p>{interimResult}</p>
                    </motion.div>
                </AnimatePresence>
            )}
        </div>
    );
}
