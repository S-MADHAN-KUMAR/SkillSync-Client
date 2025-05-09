import React, { useEffect, useState } from 'react';
import useSpeechToText from 'react-hook-speech-to-text';
import { AnimatePresence, motion } from 'framer-motion';
import { SaveAnswer } from '../../api/ai/mockInterview';
import { showToast } from '../../helpers/showToast';

interface RecordBtnProps {
    selectedQuestion: {
        question: string;
        _id?: string;
    };
    selectedQuestionId: string;
    id: string;
}

export default function RecordBtn({
    selectedQuestion,
    selectedQuestionId,
    id
}: RecordBtnProps) {
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

    const [loading, setLoading] = useState(false);

    const transcript =
        results?.map((r: any) => r.transcript).join(' ') || '';

    useEffect(() => {
        const combinedTranscript = `${transcript} ${interimResult || ''}`.trim();
    }, [interimResult, results]);

    if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

    const SaveUserAnswer = async () => {
        if (!isRecording) {
            startSpeechToText();
        } else {
            stopSpeechToText();
            setLoading(true);

            if (transcript.trim().length < 5) {
                showToast("Please speak at least 10 words for a complete answer.", 'dark', 'error');
                setLoading(false);
                return;
            }

            const feedbackPrompt = `
            Question: ${selectedQuestion.question}
            User Answer: ${transcript}
            
            Based on the interview question and the user's answer, provide constructive feedback (if any) in 3 to 5 lines.
            
            Respond ONLY in valid JSON format with the following structure:
            {
              "rating": <a number between 1 and 5, use decimals like 3.5 , but DO NOT use text, fractions, or ranges>,
              "feedback": <brief feedback text>
            }
            
            Do NOT include markdown, code blocks, or any extra explanation.
            `;


            try {
                await SaveAnswer(
                    {
                        feedback: feedbackPrompt,
                        questionId: selectedQuestionId,
                        userAnswer: transcript
                    },
                    id
                );
            } catch (error) {
                showToast("Failed to save answer.", 'dark', 'error');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className='flex flex-col justify-center items-center gap-4'>
            <button
                onClick={SaveUserAnswer}
                disabled={loading}
                className={`flex items-center gap-2 py-1.5 px-6 rounded-full cursor-pointer transition duration-300 
                    ${loading ? 'bg-gray-500' :
                        isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}
                    ${loading && 'cursor-not-allowed opacity-70'}`}
            >
                <span className={`w-3 h-3 rounded-full ${isRecording ? 'bg-red-300' : 'bg-green-300'}`}></span>
                {loading ? 'Submitting...' : isRecording ? 'Stop Recording' : 'Start Recording'}
            </button>

            {interimResult && (
                <AnimatePresence mode="wait">
                    <motion.div
                        key={interimResult}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.4 }}
                        className="text-white italic text-lg"
                    >
                        <p>{interimResult}</p>
                    </motion.div>
                </AnimatePresence>
            )}
        </div>
    );
}