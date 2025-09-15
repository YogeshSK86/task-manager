import React, { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="New task"
      />
      <button type="submit">Add</button>
    </form>
  );
}
