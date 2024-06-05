// src/components/TaskInput.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../features/tasks/tasksSlice';
import { fetchWeather } from '../api/weatherApi';

const TaskInput = () => {
    const [task, setTask] = useState('');
    const [priority, setPriority] = useState('Low');
    const [activityType, setActivityType] = useState('');
    const [weather, setWeather] = useState(null);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    const handleAddTask = async () => {
        if (task.trim() && activityType) {
            const newTask = { id: Date.now(), task, priority, activityType };
            if (activityType === 'Outdoor') {
                try {
                    const weatherData = await fetchWeather('New York'); // Replace with dynamic location
                    setWeather(weatherData);
                    newTask.weather = weatherData.days[0].temp;
                } catch (error) {
                    console.error('Failed to fetch weather', error);
                }
            }
            dispatch(addTask({ ...newTask, user }));
            setTask('');
            setActivityType('');
        } else if (!activityType) {
            alert('Activity field is mandatory');
        }
    };

    return (
        <div className="p-4 w-full max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row mb-4">
                <input
                    type="text"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="Enter a new task"
                    className="border p-2 flex-1 mb-2 sm:mb-0 sm:mr-2 rounded"
                />
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="border p-2 mb-2 sm:mb-0 sm:mr-2 rounded"
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <select
                    value={activityType}
                    onChange={(e) => setActivityType(e.target.value)}
                    className="border p-2 mb-2 sm:mb-0 sm:mr-2 rounded"
                >
                    <option value="" disabled selected>Activity</option>
                    <option value="Indoor">Indoor</option>
                    <option value="Outdoor">Outdoor</option>
                </select>
                <button
                    onClick={handleAddTask}
                    className="bg-blue-500 text-white p-2 rounded w-full sm:w-auto"
                >
                    Add Task
                </button>
            </div>
        </div>
    );
};

export default TaskInput;
