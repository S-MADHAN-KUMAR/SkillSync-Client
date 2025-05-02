'use client';

import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import userReducer from './slices/userSlice';
import adminReducer from './slices/adminSlice'

// Configure persistence
const userPersistConfig = {
    key: 'user',
    storage,
};

const adminPersistConfig = {
    key: 'admin',
    storage,
};

// Combine reducers (for scalability)
const rootReducer = combineReducers({
    user: persistReducer(userPersistConfig, userReducer),
    admin: persistReducer(adminPersistConfig, adminReducer),
});


// Create store
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Required for redux-persist to work properly
        }),
});

// Types for store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;