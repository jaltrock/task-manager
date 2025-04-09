import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import "./App.css";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";


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
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const toggleComplete = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        const isNowComplete = !task.completed;
        return {
          ...task,
          completed: isNowComplete,
          status: isNowComplete ? "done" : "to-do", // or "in-progress" if you prefer to track it differently
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
  
    // Get tasks grouped by status
    const tasksByStatus = {
      "to-do": tasks.filter((t) => t.status === "to-do"),
      "in-progress": tasks.filter((t) => t.status === "in-progress"),
      done: tasks.filter((t) => t.status === "done"),
    };
  
    // Remove the dragged task from the source list
    const draggedTaskIndex = source.index;
    const [movedTask] = tasksByStatus[sourceCol].splice(draggedTaskIndex, 1);
  
    // Update the status if dropped into a new column
    movedTask.status = destCol;
  
    // Insert into new position
    tasksByStatus[destCol].splice(destination.index, 0, movedTask);
  
    // Flatten the updated grouped tasks into a single array
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

      {/* Main Board */}
      <div style={{ flex: 1 }}>
        <TaskForm addTask={addTask} />

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="task-board">
            {["to-do", "in-progress", "done"].map((status) => (
              <Droppable droppableId={status} key={status}>
                {(provided) => (
                  <div
                    className="task-column"
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
    </div>
  );
};

export default App;