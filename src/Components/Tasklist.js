import React, { useState } from 'react';
import './Tasklist.css';

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    const handleAddTask = () => {
        if (newTask.trim() !== '') {
            setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
            setNewTask('');
        }
    };

    const handleDeleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const handleToggleComplete = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    return (
        <div className="task-list-container">
            <div className="task-input-section">
                <input
                    type="text"
                    className="task-input"
                    placeholder="Tambah tugas baru..."
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleAddTask();
                        }
                    }}
                />
                <button className="add-task-button" onClick={handleAddTask}>
                    Tambah
                </button>
            </div>

            <ul className="tasks-ul">
                {tasks.map(task => (
                    <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                        <span
                            className="task-text"
                            onClick={() => handleToggleComplete(task.id)}
                        >
                            {task.text}
                        </span>
                        <button
                            className="delete-task-button"
                            onClick={() => handleDeleteTask(task.id)}
                        >
                            Hapus
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskList;