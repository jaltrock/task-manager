import React from "react";
import { ListGroup, Button, FormCheck } from "react-bootstrap";

const TaskItem = ({ task, deleteTask, toggleComplete }) => {
  return (
    <ListGroup.Item>
      <FormCheck
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleComplete(task.id)}
        label={task.text}
        style={{
          textDecoration: task.completed ? "line-through" : "none",
        }}
      />
      <span className="ml-3">{task.category}</span>
      <Button
        variant="danger"
        size="sm"
        className="float-right"
        onClick={() => deleteTask(task.id)}
      >
        Delete
      </Button>
    </ListGroup.Item>
  );
};

export default TaskItem;