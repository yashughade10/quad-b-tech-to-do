// src/features/tasks/tasksSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const getTasksFromLocalStorage = (username) => {
    const tasks = localStorage.getItem(`tasks-${username}`);
    return tasks ? JSON.parse(tasks) : [];
};

const saveTasksToLocalStorage = (username, tasks) => {
    localStorage.setItem(`tasks-${username}`, JSON.stringify(tasks));
};

const initialState = {
    tasks: [],
    status: 'idle',
    error: null
};

export const addTask = createAsyncThunk('tasks/addTask', async (task, { getState }) => {
    const { user } = getState().auth;
    const tasks = getTasksFromLocalStorage(user.username);
    tasks.push(task);
    saveTasksToLocalStorage(user.username, tasks);
    return task;
});

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        deleteTask: (state, action) => {
            const { user } = action.payload;
            state.tasks = state.tasks.filter(task => task.id !== action.payload.id);
            saveTasksToLocalStorage(user.username, state.tasks);
        },
        setTasks: (state, action) => {
            state.tasks = action.payload;
        },
        setTaskPriority: (state, action) => {
            const { id, priority, user } = action.payload;
            const task = state.tasks.find(task => task.id === id);
            if (task) {
                task.priority = priority;
            }
            saveTasksToLocalStorage(user.username, state.tasks);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addTask.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tasks.push(action.payload);
            })
            .addCase(addTask.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const { deleteTask, setTasks, setTaskPriority } = tasksSlice.actions;

export default tasksSlice.reducer;
