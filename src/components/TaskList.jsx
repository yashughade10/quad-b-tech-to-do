// src/components/TaskList.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, setTaskPriority } from '../features/tasks/tasksSlice';

const TaskList = () => {
    const tasks = useSelector((state) => state.tasks.tasks);
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    return (
        <ul className="space-y-4 p-4 w-full max-w-2xl mx-auto">
            {tasks.map((task) => (
                <li key={task.id} className="bg-white p-4 rounded shadow flex flex-col sm:flex-row items-center justify-between">
                    <div className="flex-1 mb-2 sm:mb-0">
                        <span className="block">{task.task}</span>
                        {task.activityType === 'Outdoor' && (
                            <span className="text-gray-600 text-sm">Temperature: {task.weather}°C</span>
                        )}
                    </div>
                    <select
                        value={task.priority}
                        onChange={(e) =>
                            dispatch(setTaskPriority({ id: task.id, priority: e.target.value, user }))
                        }
                        className="border p-2 rounded mb-2 sm:mb-0 sm:mr-4"
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                    <button
                        onClick={() => dispatch(deleteTask({ id: task.id, user }))}
                        className="bg-red-500 text-white p-2 rounded w-full sm:w-auto"
                    >
                        Delete
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default TaskList;
