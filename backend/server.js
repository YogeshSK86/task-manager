const express = require("express");
const cors = require("cors");
const fs = require("fs-extra");

const app = express();
const PORT = 5000;
const DATA_FILE = "./tasks.json";

app.use(cors());
app.use(express.json());

app.get("/tasks", async (req, res) => {
  const tasks = await fs.readJson(DATA_FILE).catch(() => []);
  res.json(tasks);
});

app.post("/tasks", async (req, res) => {
  const tasks = await fs.readJson(DATA_FILE).catch(() => []);
  const newTask = { id: Date.now(), text: req.body.text, done: false };
  tasks.push(newTask);
  await fs.writeJson(DATA_FILE, tasks);
  res.json(newTask);
});

app.put("/tasks/:id", async (req, res) => {
  let tasks = await fs.readJson(DATA_FILE).catch(() => []);
  tasks = tasks.map(task =>
    task.id == req.params.id ? { ...task, done: req.body.done } : task
  );
  await fs.writeJson(DATA_FILE, tasks);
  res.json({ success: true });
});

app.delete("/tasks/:id", async (req, res) => {
  let tasks = await fs.readJson(DATA_FILE).catch(() => []);
  tasks = tasks.filter(task => task.id != req.params.id);
  await fs.writeJson(DATA_FILE, tasks);
  res.json({ success: true });
});

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
