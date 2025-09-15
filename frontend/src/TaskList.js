import React from "react";

export default function TaskList({ tasks, onToggle, onDelete }) {
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <input
            type="checkbox"
            checked={task.done}
            onChange={(e) => onToggle(task.id, e.target.checked)}
          />
          <span style={{ textDecoration: task.done ? "line-through" : "" }}>
            {task.text}
          </span>
          <button onClick={() => onDelete(task.id)}>❌</button>
        </li>
      ))}
    </ul>
  );
}
