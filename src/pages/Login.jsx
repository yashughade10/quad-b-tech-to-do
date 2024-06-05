// src/pages/Login.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { setTasks } from '../features/tasks/tasksSlice';
import { useNavigate } from 'react-router-dom';

const getTasksFromLocalStorage = (username) => {
    const tasks = localStorage.getItem(`tasks-${username}`);
    return tasks ? JSON.parse(tasks) : [];
};

const Login = () => {
    const [username, setUsername] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = () => {
        const user = { username };
        dispatch(login(user));
        const userTasks = getTasksFromLocalStorage(username);
        dispatch(setTasks(userTasks));
        navigate('/');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="border p-2 w-full mb-4 rounded"
                />
                <button
                    onClick={handleLogin}
                    className="bg-blue-500 text-white p-2 w-full rounded"
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default Login;
