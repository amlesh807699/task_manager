import { useState } from 'react';

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) return;

    const newTask = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      priority,
      status: 'todo',
      createdAt: new Date().toISOString()
    };

    onAdd(newTask);

    setTitle('');
    setDescription('');
    setPriority('medium');
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <h3>Create New Task</h3>
        <p>Add a task to your workspace</p>
      </div>

      <div className="form-fields">
        <input
          type="text"
          placeholder="Enter task title..."
          value={title}
          onChange={e => setTitle(e.target.value)}
          maxLength={100}
          required
        />

        <input
          type="text"
          placeholder="Enter description..."
          value={description}
          onChange={e => setDescription(e.target.value)}
          maxLength={250}
        />

        <select
          value={priority}
          onChange={e => setPriority(e.target.value)}
        >
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>

        <button type="submit" className="add-button">
          + Add Task
        </button>
      </div>
    </form>
  );
}

export default TaskForm;