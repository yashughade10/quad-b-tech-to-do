// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const getUserFromLocalStorage = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

const initialState = {
    isAuthenticated: !!getUserFromLocalStorage(),
    user: getUserFromLocalStorage()
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            localStorage.removeItem('user');
        }
    }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
