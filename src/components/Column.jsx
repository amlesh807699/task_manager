import { useState } from 'react';
import TaskCard from './TaskCard';

function Column({
  title,
  status,
  tasks,
  onDelete,
  onUpdate,
  onMove
}) {
  const [isDragOver, setIsDragOver] = useState(false);

  function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }

  function handleDragEnter(e) {
    e.preventDefault();
    setIsDragOver(true);
  }

  function handleDragLeave(e) {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragOver(false);
    }
  }

  function handleDrop(e) {
    e.preventDefault();

    setIsDragOver(false);

    const taskId = e.dataTransfer.getData('text/plain');

    if (!taskId) return;

    onMove(taskId, status);
  }

  return (
    <section className="column">
      <div className="column-header">
        <div>
          <h3>{title}</h3>
          <span>{tasks.length} Tasks</span>
        </div>

        <span className={`column-dot ${status}`} />
      </div>

      <div
        className={`column-content ${
          isDragOver ? 'drag-over' : ''
        }`}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {tasks.length === 0 ? (
          <div className="empty-state">
            <span>☰</span>
            <p>Drop tasks here</p>
          </div>
        ) : (
          tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={onDelete}
              onUpdate={onUpdate}
              onMove={onMove}
            />
          ))
        )}
      </div>
    </section>
  );
}

export default Column;