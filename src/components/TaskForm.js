import React, { useState } from "react";
import "../App.css";

const TaskForm = ({ addTask }) => {
  const [text, setText] = useState("");
  const [status, setStatus] = useState("to-do");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim()) {
      alert("Please enter a task.");
      return;
    }

    const newTask = {
      id: Date.now(),
      text,
      completed: false,
      status,
    };

    addTask(newTask); // 👈 This must be defined and working
    setText("");
    setStatus("to-do");
  };

  return (
    <form className="task-form-container" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a new task..."
        className="task-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <select
        className="task-select"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="to-do">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      <button type="submit" className="add-task-btn">
        + Add Task
      </button>
    </form>
  );
};

export default TaskForm;
