import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import {
  DragDropContext,
  Droppable,
} from "@hello-pangea/dnd";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  const addTask = (task) => {
    const newTasks = [...tasks, task];
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const deleteTask = (id) => {
    const taskToDelete = tasks.find((task) => task.id === id);
    if (!taskToDelete) return;

    const confirmed = window.confirm(`Are you sure you want to delete "${taskToDelete.text}"?`);
    if (!confirmed) return;

    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));

    toast.success(
      <>
        Task deleted —{" "}
        <span
          style={{ textDecoration: "underline", cursor: "pointer" }}
          onClick={() => undoDelete(taskToDelete)}
        >
          Undo
        </span>
      </>,
      { autoClose: 4000 }
    );
  };

  const undoDelete = (task) => {
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const toggleComplete = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        const isNowComplete = !task.completed;
        return {
          ...task,
          completed: isNowComplete,
          status: isNowComplete ? "done" : "to-do",
        };
      }
      return task;
    });

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    const sourceCol = source.droppableId;
    const destCol = destination.droppableId;

    const tasksByStatus = {
      "to-do": tasks.filter((t) => t.status === "to-do"),
      "in-progress": tasks.filter((t) => t.status === "in-progress"),
      done: tasks.filter((t) => t.status === "done"),
    };

    const [movedTask] = tasksByStatus[sourceCol].splice(source.index, 1);
    movedTask.status = destCol;
    tasksByStatus[destCol].splice(destination.index, 0, movedTask);

    const updatedTasks = [
      ...tasksByStatus["to-do"],
      ...tasksByStatus["in-progress"],
      ...tasksByStatus["done"],
    ];

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h3>Categories</h3>
        <ul className="category-list">
          <li>Work</li>
          <li>Personal</li>
          <li>Family</li>
          <li>Friends</li>
        </ul>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1 }}>
        <TaskForm addTask={addTask} />

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="task-board">
            {["to-do", "in-progress", "done"].map((status) => (
              <Droppable droppableId={status} key={status}>
                {(provided, snapshot) => (
                  <div
                    className={`task-column ${status} ${
                      snapshot.isDraggingOver ? "drag-over" : ""
                    }`}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <h4>{status.replace("-", " ").toUpperCase()}</h4>
                    <TaskList
                      tasks={tasks.filter((t) => t.status === status)}
                      deleteTask={deleteTask}
                      toggleComplete={toggleComplete}
                      column={status}
                      droppableProvided={provided}
                    />
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </div>

      {/* Toast Container */}
      <ToastContainer position="bottom-left" autoClose={4000} />
    </div>
  );
};

export default App;
