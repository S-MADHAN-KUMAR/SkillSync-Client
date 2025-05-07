'use client'
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import React from 'react'
import Navbar from "../../../../ui/Navbar";
import { candidateLinks } from "@/app/types/ui";
import { useRouter } from "next/navigation";

const page = () => {
    const router = useRouter()
    const text =
        "Hello, I’m Sync AI — your smart career companion powered by Gemini ✨. I help you prep for interviews 🎤, craft standout resumes 📄 and emails ✉️, and give instant feedback ⚡ to boost your confidence 💪.";
    const speed = 50; // Typing speed in ms
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setDisplayedText((prev) => prev + text[index]);
            index++;
            if (index === text.length - 1) clearInterval(interval);
        }, speed);
        return () => clearInterval(interval);
    }, [text, speed]);

    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });


    const y1 = useTransform(scrollYProgress, [0, 0.5, 1], [180, 100, -1000]);
    const x1 = useTransform(scrollYProgress, [0, 0.5, 1], [-600, 400, 0.5]);
    const scale1 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.4, 0]);
    const blur1 = useTransform(scrollYProgress, [0, 0.5, 1], ['blur(3px)', 'blur(25px)', 'blur(5px)']);

    const y2 = useTransform(scrollYProgress, [0, 0.5, 1], [-200, 250, -1000]);
    const x2 = useTransform(scrollYProgress, [0, 0.5, 1], [600, -600, 0.5]);
    const scale2 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.4, 0]);
    const blur2 = useTransform(scrollYProgress, [0, 0.5, 1], ['blur(4px)', 'blur(30px)', 'blur(3px)']);

    const y3 = useTransform(scrollYProgress, [0, 0.5, 1], [160, -100, -1000]);
    const x3 = useTransform(scrollYProgress, [0, 0.5, 1], [420, -100, 0.5]);
    const scale3 = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0]);
    const blur3 = useTransform(scrollYProgress, [0, 0.5, 1], ['blur(1px)', 'blur(20px)', 'blur(3px)']);

    const y4 = useTransform(scrollYProgress, [0, 0.5, 1], [-140, -180, -1000]);
    const x4 = useTransform(scrollYProgress, [0, 0.5, 1], [-550, 600, 0.5]);
    const scale4 = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 0.5, 0]);
    const blur4 = useTransform(scrollYProgress, [0, 0.5, 1], ['blur(1px)', 'blur(20px)', 'blur(3px)']);

    const y = useTransform(scrollYProgress, [0, 0.5, 1], [160, 50, -1000]);
    const x = useTransform(scrollYProgress, [0, 0.5, 1], [0, -400, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 2, 0]);

    const style1 = {
        x: x1,
        y: y1,
        scale: scale1,
        filter: blur1
    };
    const style2 = {
        x: x2,
        y: y2,
        scale: scale2,
        filter: blur2
    };
    const style3 = {
        x: x3,
        y: y3,
        scale: scale3,
        filter: blur3
    };
    const style4 = {
        x: x4,
        y: y4,
        scale: scale4,
        filter: blur4
    };
    const style = {
        x,
        y,
        scale,
    };
    return (
        <div ref={containerRef} className="w-full h-full dark:bg-[#000000]">
            <Navbar navLinks={candidateLinks} />
            < div
                style={{
                    backgroundImage: "url('/gradient.png')",
                    backgroundRepeat: "repeat",
                    backgroundPosition: "center",
                    backgroundSize: "contain",
                }
                }
                className=' flex flex-col items-center w-[100vw] h-[90vh] bg-[#d2dde9]
                     dark:bg-[#000000] pt-24' >
                <motion.p
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className='m3 text-7xl font-bold w-2/3 text-center leading-24'
                >
                    Upgrade Your Career with<span className='syncAi'> AI-Powered </span> Tools!
                </motion.p>
                <motion.img
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    style={style}
                    src="/robot.gif"
                    className="w-[280px] fixed z-10" />
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    style={style1} className="fixed">
                    <div className="animate-fly ">
                        <img src="/e7.png" className="w-[280px]" />
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    style={style2} className="fixed">
                    <div className="animate-fly ">
                        <img src="/e1.png" className="w-[280px]" />
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 0.6 }}
                    transition={{ duration: 0.8 }}
                    style={style3} className="fixed">
                    <div className="animate-fly ">
                        <img src="/e5.png" className="w-[280px]" />
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 0.5 }}
                    transition={{ duration: 0.8 }}
                    style={style4} className="fixed">
                    <div className="animate-fly ">
                        <img src="/e3.png" className="w-[280px]" />
                    </div>
                </motion.div>

            </div >

            <div className=' w-[100vw] h-[90vh] gap-3 flex justify-between'
            >
                <div className=" min-w-2/5"></div>
                <div className=" w-3/5 px-20 flex flex-col justify-center items-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="min-w-[45vw] z-10  leading-15 text-3xl italic font-semibold my-auto  h-fit text-center   "
                    >
                        {displayedText}
                        <span className="animate-blink">|</span>
                    </motion.div>
                </div>

            </div>
            <div
                style={{
                    backgroundImage: "url('/gradient.png')",
                    backgroundRepeat: "repeat",
                    backgroundPosition: "center",
                    backgroundSize: "contain",
                }
                }
                className='bg-black  z-20 overflow-hidden w-[100vw] h-[90vh] flex items-center gap-3 flex-col justify-evenly ' >
                <motion.h1
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="text-5xl font-semibold">Our AI Services</motion.h1>
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className=" bg-[#121212] justify-between gap-5 flex p-5 w-1/2 rounded-xl cursor-pointer" onClick={() => router.push('/candidate/syncAi/mockInterviewer')}>
                    <img src="/aiMock.jpeg" className="w-1/3 rounded-lg" />
                    <div className="
                    w-2/3 flex flex-col justify-evenly items-center">
                        <h1 className="syncAi text-4xl font-semibold">AI Mock Interviewer</h1>
                        <p className="text-xl text-center ">
                            Ace your next interview with our AI-powered mock interviewer. Get real-time feedback, practice industry-specific questions, and refine your responses for maximum impact.
                        </p>
                    </div>
                </motion.div>

            </div>
        </div >
    )
}

export default page