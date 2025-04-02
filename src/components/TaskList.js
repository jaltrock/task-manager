import React from "react";
import TaskItem from "./TaskItem";
import { ListGroup } from "react-bootstrap";

const TaskList = ({ tasks, deleteTask, toggleComplete }) => {
  return (
    <ListGroup>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleComplete={toggleComplete}
        />
      ))}
    </ListGroup>
  );
};

export default TaskList;