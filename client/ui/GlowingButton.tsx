'use client'
import React from 'react';
import { GlowingButtonProps } from '@/app/types/ui';

const GlowingButton: React.FC<GlowingButtonProps> = ({ children, onClick, className = '', disabled, type }) => {
    return (

        <div className="w-full z-10 relative p-[3px] rounded-full transition-all duration-400 ease-in-out bg-gradient-to-r from-[#03a9f4] to-[#f441a5] group">
            <div className="absolute z-[-10] inset-0 m-auto rounded-full  transition-[filter] duration-400 ease-in-out group-hover:blur-[1.2em] group-active:blur-[0.2em] bg-gradient-to-r from-[#03a9f4] to-[#f441a5]"></div>
            <button onClick={onClick} type={type} disabled={disabled} className={`z-50 text-lg  rounded-full border-none bg-black text-white cursor-pointer shadow-[2px_2px_3px_#000000b4] ${className}`}>
                {children}
            </button>
        </div >
    )
};

export default GlowingButton;
