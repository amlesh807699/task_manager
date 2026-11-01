import Column from './Column';

const columns = [
  { id: 'todo', title: 'To Do' },
  { id: 'progress', title: 'In Progress' },
  { id: 'done', title: 'Done' }
];

function Board({
  tasks,
  onDelete,
  onUpdate,
  onMove,
  search
}) {
  return (
    <div className="board">
      {columns.map(column => {
        const columnTasks = tasks.filter(task => {
          const matchesStatus = task.status === column.id;

          const query = search.trim().toLowerCase();

          const matchesSearch =
            task.title.toLowerCase().includes(query) ||
            (task.description || '').toLowerCase().includes(query);

          return matchesStatus && matchesSearch;
        });

        return (
          <Column
            key={column.id}
            title={column.title}
            status={column.id}
            tasks={columnTasks}
            onDelete={onDelete}
            onUpdate={onUpdate}
            onMove={onMove}
          />
        );
      })}
    </div>
  );
}

export default Board;