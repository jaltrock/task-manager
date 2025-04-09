import React from "react";
import "../App.css"; 

import { FaCheckCircle, FaTrashAlt } from "react-icons/fa";

const TaskItem = ({ task, deleteTask, toggleComplete, column }) => {
  return (
    <div className={`task-card ${column}`}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p style={{ textDecoration: task.completed ? "line-through" : "none" }}>
          {task.text}
        </p>
        <div>
          <FaCheckCircle
            onClick={() => toggleComplete(task.id)}
            style={{ color: "#28a745", marginRight: "0.5rem", cursor: "pointer" }}
          />
          <FaTrashAlt
            onClick={() => deleteTask(task.id)}
            style={{ color: "#dc3545", cursor: "pointer" }}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
