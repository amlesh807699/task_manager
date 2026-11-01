import { useState } from 'react';

function TaskCard({
  task,
  onDelete,
  onUpdate,
  onMove
}) {
  const [isEditing, setIsEditing] = useState(false);

  const [editTitle, setEditTitle] = useState(task.title);

  const [editDescription, setEditDescription] = useState(
    task.description || ''
  );

  function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', task.id);
    e.dataTransfer.effectAllowed = 'move';

    e.currentTarget.classList.add('dragging');
  }

  function handleDragEnd(e) {
    e.currentTarget.classList.remove('dragging');
  }

  function saveEdit() {
    if (!editTitle.trim()) return;

    onUpdate(task.id, {
      title: editTitle.trim(),
      description: editDescription.trim()
    });

    setIsEditing(false);
  }

  function cancelEdit() {
    setEditTitle(task.title);
    setEditDescription(task.description || '');
    setIsEditing(false);
  }

  function moveBackward() {
    if (task.status === 'progress') {
      onMove(task.id, 'todo');
    } else if (task.status === 'done') {
      onMove(task.id, 'progress');
    }
  }

  function moveForward() {
    if (task.status === 'todo') {
      onMove(task.id, 'progress');
    } else if (task.status === 'progress') {
      onMove(task.id, 'done');
    }
  }

  return (
    <article
      className={`task-card priority-${task.priority}`}
      draggable={!isEditing}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="task-card-top">
        <span className={`priority-label ${task.priority}`}>
          {task.priority.toUpperCase()}
        </span>

        <button
          className="delete-button"
          onClick={() => onDelete(task.id)}
          aria-label="Delete task"
          type="button"
        >
          ×
        </button>
      </div>

      {isEditing ? (
        <div className="edit-fields">
          <input
            type="text"
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            maxLength={100}
            autoFocus
          />

          <textarea
            value={editDescription}
            onChange={e => setEditDescription(e.target.value)}
            maxLength={250}
            placeholder="Description"
          />

          <div className="edit-actions">
            <button type="button" onClick={saveEdit}>
              Save
            </button>

            <button type="button" onClick={cancelEdit}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="drag-handle">
            ⠿ Drag task
          </div>

          <h4>{task.title}</h4>

          {task.description && (
            <p>{task.description}</p>
          )}

          <div className="task-footer">
            <button
              type="button"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>

            <div className="move-actions">
              {task.status !== 'todo' && (
                <button
                  type="button"
                  onClick={moveBackward}
                  aria-label="Move backward"
                >
                  ←
                </button>
              )}

              {task.status !== 'done' && (
                <button
                  type="button"
                  onClick={moveForward}
                  aria-label="Move forward"
                >
                  →
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </article>
  );
}

export default TaskCard;