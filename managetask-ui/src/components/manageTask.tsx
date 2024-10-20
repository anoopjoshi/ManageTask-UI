import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { ITask } from '../core/models';
import '../index.css';
import AddTask from './addTask';
import { Api } from '../core/api';

interface TaskListProps {
    tasks: ITask[];
    onDeleteTask: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDeleteTask }) => {
    const handleDeleteClick = (id: number) => {
        const confirmed = window.confirm('Are you sure you want to delete this task?');
        if (confirmed) {
            onDeleteTask(id);
        }
    };

    return (
        <div className="container mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-left text-2xl font-bold mb-4">Task List</h2>
            <div className="grid grid-cols-4 gap-4 bg-blue-500 text-white font-bold p-2 rounded-t-lg">
                <div>Title</div>
                <div>Description</div>
                <div>Created Date</div>
                <div>Action</div>
            </div>
            {tasks.map((task) => (
                <div className="grid grid-cols-4 gap-4 p-2 border-b border-gray-200 hover:bg-gray-200" key={task.id}>
                    <div>{task.title}</div>
                    <div>{task.description}</div>
                    <div>{new Date(task.createdDate).toDateString()}</div>
                    <div>
                        <button
                            className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                            onClick={() => handleDeleteClick(task.id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

const ManageTaskPage: React.FC = () => {
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const tasks = await Api.getTasks();
                setTasks(tasks);
            } catch (error) {
                setError('Failed to fetch tasks. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    const handleAddTask = useCallback((newTask: ITask) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);
    }, []);

    const handleDeleteTask = useCallback(async (id: number) => {
        try {
            await Api.deleteTask(id);
            // Fetch the updated list of tasks from the API
            const updatedTasks = await Api.getTasks();
            setTasks(updatedTasks);
        } catch (error) {
            setError('Failed to delete task. Please try again.');
        }
    }, []);

    const taskList = useMemo(() => (
        <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} />
    ), [tasks, handleDeleteTask]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <div className="text-center mb-4">
                <AddTask onAddTask={handleAddTask} />
            </div>
            {taskList}
        </div>
    );
};

export default ManageTaskPage;