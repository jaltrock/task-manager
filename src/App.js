import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import { Container, Row, Col, Card } from "react-bootstrap";

const App = () => {
  const [tasks, setTasks] = useState([]);

  // Load tasks from local storage or initialize to an empty array
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  // Add a task
  const addTask = (task) => {
    const newTasks = [...tasks, task];
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  // Delete a task
  const deleteTask = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  // Toggle completion status
  const toggleComplete = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <Container>
      <Card className="text-center">
        <Card.Body>
          <Card.Title>Task Manager</Card.Title>
        </Card.Body>
      </Card>

      <TaskForm addTask={addTask} />

      <Row>
        <Col>
          <TaskList tasks={tasks} deleteTask={deleteTask} toggleComplete={toggleComplete} />
        </Col>
      </Row>
    </Container>
  );
};

export default App;