'use client'

import { AdminSlice } from '@/app/types/slice';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Initialize state
const initialState: AdminSlice = {
    email: null,
    role: null,

};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setAdmin: (state, action: PayloadAction<AdminSlice>) => {
            const { email, role } = action.payload;
            state.email = email,
                state.role = role


            if (typeof window !== 'undefined') {
                localStorage.setItem('admin', JSON.stringify(state));
            }
        },

        clearAdminDetials: (state) => {
            state.email = null
            state.role = null


            if (typeof window !== 'undefined') {
                localStorage.removeItem('admin');
            }
        }
    }
})

export const { setAdmin, clearAdminDetials } = adminSlice.actions
export default adminSlice.reducer