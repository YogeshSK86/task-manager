import React, { useEffect, useState } from "react";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";

const API_URL = "http://localhost:5000/tasks";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(API_URL).then(res => res.json()).then(setTasks);
  }, []);

  const addTask = async (text) => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });
    const newTask = await res.json();
    setTasks([...tasks, newTask]);
  };

  const toggleTask = async (id, done) => {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done })
    });
    setTasks(tasks.map(t => t.id === id ? { ...t, done } : t));
  };

  const deleteTask = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div style={{ margin: "2rem" }}>
      <h1>Task Manager</h1>
      <TaskForm onAdd={addTask} />
      <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
    </div>
  );
}

export default App;
