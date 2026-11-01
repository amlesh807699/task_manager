# Kanban Task Board --- Prompts.md


------------------------------------------------------------------------

## Prompt 1 --- Build the Kanban Task Board

Build a Trello-style Kanban Task Board using React.js and Vite.

### Required features

**Phase 1 --- Mandatory** - Create three columns: To Do, In Progress,
and Done. - Allow users to add tasks. - Allow users to delete tasks. -
Allow users to move tasks between columns.

**Phase 2 --- Recommended** - Support inline task editing. - Add High,
Medium, and Low priority levels. - Use conditional styling for
priorities: - High: red - Medium: yellow - Low: green - Persist tasks in
browser LocalStorage so data survives page refreshes.

**Phase 3 --- Advanced** - Implement drag-and-drop between columns. -
Add global search that filters tasks. - Use native HTML5 Drag and Drop
rather than a drag-and-drop library.

### Technical constraints

-   Use React.js with Vite.
-   Do not use Redux.
-   Do not require a backend, API keys, or external services.
-   Keep the code organized into reusable components and hooks.
-   Include responsive styling.
-   Add a `.gitignore` that excludes `node_modules`, build output, and
    environment files.
-   Include a `Prompts.md` file.
-   Provide commands to install dependencies and run the app.
-   Explain how to test the features locally.
-   Prepare the project for GitHub and Vercel deployment.

------------------------------------------------------------------------

## Prompt 2 --- Use Native HTML5 Drag and Drop

Replace the drag-and-drop library implementation with normal native
HTML5 Drag and Drop.

Requirements: - Remove the dependency on `@dnd-kit/core`. - Use the
browser's native `draggable`, `onDragStart`, `onDragOver`,
`onDragLeave`, `onDrop`, and `onDragEnd` events. - Store the dragged
task ID in `dataTransfer`. - Allow a task card to be dropped into any of
the three Kanban columns. - Show a visual highlight on the column
currently being dragged over. - Ensure drag-and-drop works when dropping
into an empty column as well as a column containing cards. - Preserve
task editing, deleting, priority, search, and LocalStorage
functionality. - Keep the implementation simple and compatible with
React + Vite.

------------------------------------------------------------------------

## Prompt 3 --- Advanced QA Test Plan

Act as a senior QA engineer. Test the Kanban Task Board using difficult,
realistic edge cases.

For every scenario: 1. Explain the objective. 2. Give exact steps to
reproduce the test. 3. State the expected result. 4. Ask the tester to
report Pass, Fail, or Not Tested. 5. If a test fails, help identify the
root cause before changing code. 6. Do not assume a test passed if it
has not been verified.

------------------------------------------------------------------------

## QA Scenario 1 --- Duplicate Tasks and Input Validation

**Objective:** Verify task creation validation and duplicate-title
behavior.

### Steps

1.  Leave both title and description empty and click Add Task.
2.  Enter only spaces in the title field and click Add Task.
3.  Create two tasks with exactly the same title.
4.  Give the two tasks different priorities.
5.  Refresh the browser.

### Expected results

-   A task with an empty title must not be created.
-   A title containing only whitespace must be rejected.
-   Two tasks with the same title should both be allowed.
-   Each task must retain its own priority.
-   Both tasks must remain after refresh.

### Record

-   Empty title rejected: Pass / Fail / Not Tested
-   Spaces-only title rejected: Pass / Fail / Not Tested
-   Duplicate titles handled correctly: Pass / Fail / Not Tested
-   Data preserved after refresh: Pass / Fail / Not Tested

------------------------------------------------------------------------

## QA Scenario 2 --- Rapid Drag-and-Drop Stress Test

**Objective:** Check whether rapid task movement causes missing tasks,
duplicate tasks, incorrect statuses, or console errors.

### Test setup

Create these six tasks:

  Task     Priority   Initial column
  -------- ---------- ----------------
  Task A   High       To Do
  Task B   Medium     To Do
  Task C   Low        To Do
  Task D   High       In Progress
  Task E   Medium     In Progress
  Task F   Low        Done

### Execute these operations in order

1.  Task A → In Progress
2.  Task B → Done
3.  Task D → Done
4.  Task F → To Do
5.  Task C → Done
6.  Task E → To Do
7.  Task A → Done
8.  Task B → In Progress
9.  Task F → In Progress
10. Task D → To Do

Perform the moves quickly, without refreshing between moves.

### Expected final board

  Column        Expected tasks
  ------------- ----------------
  To Do         Task D, Task E
  In Progress   Task B, Task F
  Done          Task A, Task C

### Verify

-   All ten drag-and-drop operations completed.
-   No task disappeared.
-   No task was duplicated.
-   Every task is in the correct column.
-   The total task count is exactly six.
-   The browser console has no red errors.

Record each check as Pass / Fail / Not Tested.

------------------------------------------------------------------------

## QA Scenario 3 --- LocalStorage Persistence and Recovery

**Objective:** Check normal persistence, corrupted storage behavior, and
empty-storage behavior.

### Test A --- Refresh persistence

1.  Create three tasks.
2.  Move one task from To Do to Done.
3.  Refresh the page.
4.  Verify that all three tasks and their statuses are preserved.

Expected: All task data remains unchanged after refresh.

### Test B --- Corrupted LocalStorage

**Warning: This test intentionally changes stored task data. Take a
screenshot or backup first.**

1.  Open browser Developer Tools with F12.
2.  Select the Console tab.
3.  Run this exact command:

``` js
localStorage.setItem("kanban-tasks", "{invalid-json");
```

4.  Refresh the page.

Expected: The application should handle invalid stored JSON gracefully
instead of becoming unusable. If it crashes, record the error as a bug.

### Test C --- Empty LocalStorage

After Test B, run:

``` js
localStorage.removeItem("kanban-tasks");
```

Refresh the page.

Expected: The application should open normally with an empty board.

### Record

-   Test A: Pass / Fail / Not Tested
-   Test B: Pass / Fail / Not Tested
-   Test C: Pass / Fail / Not Tested
