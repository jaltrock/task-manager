import React, { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";

const TaskForm = ({ addTask }) => {
  const [taskText, setTaskText] = useState("");
  const [category, setCategory] = useState("work");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim()) {
      const newTask = {
        id: Date.now(),
        text: taskText,
        category: category,
        completed: false,
      };
      addTask(newTask);
      setTaskText("");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group as={Row}>
        <Form.Label column sm={2}>
          Task
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            placeholder="Enter your task"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column sm={2}>
          Category
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            as="select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="work">Work</option>
            <option value="personal">Personal</option>
          </Form.Control>
        </Col>
      </Form.Group>

      <Button variant="primary" type="submit">
        Add Task
      </Button>
    </Form>
  );
};

export default TaskForm;