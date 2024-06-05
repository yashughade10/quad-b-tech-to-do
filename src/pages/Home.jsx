// src/pages/Home.jsx
import React from 'react';
import TaskInput from '../components/TaskInput';
import TaskList from '../components/TaskList';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';

const Home = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl font-bold">QuadB Tech</h1>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white p-2 rounded"
                    >
                        Logout
                    </button>
                </div>
                <TaskInput />
                <TaskList />
            </div>
        </div>
    );
};

export default Home;
