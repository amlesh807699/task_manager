import { useState } from 'react';

import Navbar from './components/Navbar';
import TaskForm from './components/TaskForm';
import Board from './components/Board';

import useLocalStorage from './hooks/useLocalStorage';

import './App.css';

function App() {
  const [tasks, setTasks] = useLocalStorage(
    'kanban-tasks',
    []
  );

  const [search, setSearch] = useState('');

  // Add task
  function addTask(newTask) {
    setTasks(previousTasks => [
      ...previousTasks,
      newTask
    ]);
  }

  // Delete task
  function deleteTask(taskId) {
    setTasks(previousTasks =>
      previousTasks.filter(task => task.id !== taskId)
    );
  }

  // Update task
  function updateTask(taskId, updates) {
    setTasks(previousTasks =>
      previousTasks.map(task =>
        task.id === taskId
          ? { ...task, ...updates }
          : task
      )
    );
  }

  // Move task
  function moveTask(taskId, newStatus) {
    const validStatuses = ['todo', 'progress', 'done'];

    if (!validStatuses.includes(newStatus)) return;

    setTasks(previousTasks =>
      previousTasks.map(task =>
        task.id === taskId
          ? { ...task, status: newStatus }
          : task
      )
    );
  }

  return (
    <div className="app">
      <Navbar
        tasks={tasks}
        search={search}
        setSearch={setSearch}
      />

      <main className="main-container">
        <div className="page-heading">
          <div>
            <span className="eyebrow">
              WORKSPACE / PROJECTS
            </span>

            <h1>My Kanban Board</h1>

            <p>
              Organize your work and track your progress.
            </p>
          </div>
        </div>

        <TaskForm onAdd={addTask} />

        <div className="board-heading">
          <div>
            <h2>Project Tasks</h2>
            <p>Manage your daily workflow</p>
          </div>

          <span>{tasks.length} Total Tasks</span>
        </div>

        <Board
          tasks={tasks}
          onDelete={deleteTask}
          onUpdate={updateTask}
          onMove={moveTask}
          search={search}
        />
      </main>
    </div>
  );
}

export default App;