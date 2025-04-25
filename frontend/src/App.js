import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const PRIORITY_LABELS = ["High", "Medium", "Low"];
const PRIORITY_COLORS = ["#e57373", "#fff176", "#81c784"];

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState(1);
  const [sortedTasks, setSortedTasks] = useState(null);

  // Innovation: Drag-and-drop reordering before sorting
  const [draggedIdx, setDraggedIdx] = useState(null);

  const addTask = () => {
    if (title.trim() === "") return;
    setTasks([...tasks, { id: uuidv4(), title, priority: Number(priority) }]);
    setTitle("");
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleSort = async () => {
    try {
      const res = await axios.post("http://localhost:8000/sort-tasks", {
        tasks: tasks.map(({ title, priority }) => ({ title, priority })),
      });
      setSortedTasks(res.data.sorted_tasks);
    } catch (err) {
      alert("Error: " + err.response?.data?.detail || err.message);
    }
  };

  // Drag-and-drop handlers
  const handleDragStart = (idx) => setDraggedIdx(idx);
  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (idx) => {
    if (draggedIdx === null) return;
    const newTasks = [...tasks];
    const [removed] = newTasks.splice(draggedIdx, 1);
    newTasks.splice(idx, 0, removed);
    setTasks(newTasks);
    setDraggedIdx(null);
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>📝 Task Prioritizer</h1>
      <div style={{ marginBottom: 20 }}>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Task description"
          style={{ padding: 8, width: 220 }}
        />
        <select
          value={priority}
          onChange={e => setPriority(e.target.value)}
          style={{ padding: 8, margin: "0 10px" }}
        >
          <option value={0}>High</option>
          <option value={1}>Medium</option>
          <option value={2}>Low</option>
        </select>
        <button onClick={addTask} style={{ padding: 8 }}>Add Task</button>
      </div>

      <h2>Current Tasks</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((task, idx) => (
          <li
            key={task.id}
            draggable
            onDragStart={() => handleDragStart(idx)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(idx)}
            style={{
              background: PRIORITY_COLORS[task.priority],
              margin: "8px 0",
              padding: "10px 15px",
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              cursor: "grab",
              justifyContent: "space-between",
              boxShadow: "0 2px 4px #ddd"
            }}
          >
            <span>
              <b>{task.title}</b> <span style={{ fontSize: 13, color: "#555" }}>({PRIORITY_LABELS[task.priority]})</span>
            </span>
            <button onClick={() => removeTask(task.id)} style={{ background: "none", border: "none", color: "#c00", fontSize: 18, cursor: "pointer" }}>✖</button>
          </li>
        ))}
      </ul>

      <button
        onClick={handleSort}
        style={{ marginTop: 20, padding: "10px 20px", fontSize: 16, background: "#1976d2", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}
        disabled={tasks.length === 0}
      >
        Sort by Priority
      </button>

      {sortedTasks && (
        <div style={{ marginTop: 40 }}>
          <h2>Sorted Tasks</h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {sortedTasks.map((task, idx) => (
              <li
                key={idx}
                style={{
                  background: PRIORITY_COLORS[task.priority],
                  margin: "8px 0",
                  padding: "10px 15px",
                  borderRadius: 6,
                  boxShadow: "0 2px 4px #ddd"
                }}
              >
                <b>{task.title}</b> <span style={{ fontSize: 13, color: "#555" }}>({PRIORITY_LABELS[task.priority]})</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
