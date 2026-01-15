import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice'

const store = configureStore({
    reducer: {
        auth: authSlice,
        //we'll add more slices here as we create them
    },
});

export default store;