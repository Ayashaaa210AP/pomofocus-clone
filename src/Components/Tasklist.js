// components/TaskList.js

import React, { useState } from 'react';
import './Tasklist.css';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [newTaskText, setNewTaskText] = useState('');
  const [taskEstimate, setTaskEstimate] = useState(1);
  const [note, setNote] = useState('');
  const [showNoteInput, setShowNoteInput] = useState(false); // State untuk menampilkan/hide note input

  const openAddModal = () => {
    setIsEditing(null);
    setNewTaskText('');
    setTaskEstimate(1);
    setNote('');
    setShowNoteInput(false); // Reset: sembunyikan note input saat buka modal baru
    setIsModalOpen(true);
  };

  const openEditModal = (task) => {
    setIsEditing(task.id);
    setNewTaskText(task.text);
    setTaskEstimate(task.estimate);
    setNote(task.note || '');
    setShowNoteInput(!!task.note); // Jika ada note, tampilkan inputnya
    setIsModalOpen(true);
  };

  const handleSaveTask = () => {
    if (newTaskText.trim() === '') return;

    if (isEditing) {
      setTasks(tasks.map(task =>
        task.id === isEditing
          ? { ...task, text: newTaskText, estimate: taskEstimate, note: note }
          : task
      ));
    } else {
      setTasks([...tasks, {
        id: Date.now(),
        text: newTaskText,
        completed: false,
        estimate: taskEstimate,
        progress: 0,
        note: note
      }]);
    }

    setIsModalOpen(false);
    setIsEditing(null);
    setNewTaskText('');
    setTaskEstimate(1);
    setNote('');
    setShowNoteInput(false);
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTasks(tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Fungsi untuk toggle tampilan input note
  const toggleNoteInput = () => {
    setShowNoteInput(!showNoteInput);
    if (!showNoteInput && note === '') {
      // Jika sebelumnya tidak tampil dan note kosong, fokus ke input
      setTimeout(() => {
        document.querySelector('.note-input')?.focus();
      }, 100);
    }
  };

  // Perbaikan: Tombol ▲ menambah, ▼ mengurangi
  const incrementEstimate = () => {
    setTaskEstimate(taskEstimate + 1);
  };

  const decrementEstimate = () => {
    setTaskEstimate(Math.max(1, taskEstimate - 1)); // Minimal 1
  };

  return (
    <div className="task-list-container">
      <div className="task-header">
        <h2 className="task-title">Tasks</h2>
        <button className="task-menu-button">⋮</button>
      </div>

      <button className="add-task-button" onClick={openAddModal}>
        <span>➕ Add Task</span>
      </button>

      {isModalOpen && (
        <div className="task-modal">
          <div className="modal-content">
            <input
              type="text"
              className="task-input"
              placeholder="What are you working on?"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              autoFocus
            />
            <div className="task-number-section">
              <span className="task-number-label">Est Pomodoros</span>
              <div className="number-selector">
                {/* Perbaikan: ▲ untuk tambah, ▼ untuk kurang */}
                <button
                  className="number-btn"
                  onClick={incrementEstimate} // Menambah
                >
                  ▲
                </button>
                <span className="number-display">{taskEstimate}</span>
                <button
                  className="number-btn"
                  onClick={decrementEstimate} // Mengurangi
                >
                  ▼
                </button>
              </div>
            </div>

            {/* Tombol "+ Add Note" */}
            <div className="modal-options">
              <button
                className="add-note-btn"
                onClick={toggleNoteInput}
              >
                {showNoteInput ? '– Hide Note' : '+ Add Note'}
              </button>
              <span className="lock-icon">🔒</span>
            </div>

            {/* Input Note (hanya muncul jika showNoteInput true) */}
            {showNoteInput && (
              <div className="note-section">
                <label className="note-label">Note</label>
                <textarea
                  className="note-input"
                  placeholder="Add a note about this task..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows="3"
                ></textarea>
              </div>
            )}

            <div className="modal-actions">
              {isEditing && (
                <button
                  className="delete-btn"
                  onClick={() => {
                    handleDeleteTask(isEditing);
                    setIsModalOpen(false);
                    setIsEditing(null);
                  }}
                >
                  🗑️
                </button>
              )}
              <button className="cancel-btn" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button className="save-btn" onClick={handleSaveTask}>
                {isEditing ? 'Update' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      <ul className="tasks-ul">
        {tasks.map(task => (
          <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <div className="task-checkbox-wrapper">
              <input
                type="checkbox"
                className="task-checkbox"
                checked={task.completed}
                onChange={() => handleToggleComplete(task.id)}
              />
            </div>
            <span
              className="task-text"
              onClick={() => handleToggleComplete(task.id)}
            >
              {task.text}
            </span>
            <span className="task-progress">
              {task.progress}/{task.estimate}
            </span>
            <button
              className="delete-task-button"
              onClick={() => openEditModal(task)}
            >
              ⋮
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;