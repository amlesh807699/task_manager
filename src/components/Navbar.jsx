function Navbar({ tasks, search, setSearch }) {
  const completed = tasks.filter(
    task => task.status === 'done'
  ).length;

  const pending = tasks.filter(
    task => task.status === 'todo'
  ).length;

  return (
    <header className="navbar">
      <div className="brand">
        <div className="brand-icon">K</div>

        <div>
          <h2>KanbanFlow</h2>
          <p>Task Management Workspace</p>
        </div>
      </div>

      <div className="navbar-right">
        <div className="stats">
          <div>
            <strong>{tasks.length}</strong>
            <span>Total Tasks</span>
          </div>

          <div>
            <strong>{pending}</strong>
            <span>Pending</span>
          </div>

          <div>
            <strong>{completed}</strong>
            <span>Completed</span>
          </div>
        </div>

        <input
          type="search"
          className="search-input"
          placeholder="Search tasks..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
    </header>
  );
}

export default Navbar;