import React from "react";
import TaskItem from "./TaskItem";
import { Draggable } from "@hello-pangea/dnd";

const TaskList = ({
  tasks,
  deleteTask,
  toggleComplete,
  column,
  droppableProvided,
}) => {
  return (
    <div ref={droppableProvided.innerRef} {...droppableProvided.droppableProps}>
      {tasks.map((task, index) => (
        <Draggable
          key={task.id.toString()}
          draggableId={task.id.toString()}
          index={index}
        >
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <TaskItem
                task={task}
                deleteTask={deleteTask}
                toggleComplete={toggleComplete}
                column={column}
              />
            </div>
          )}
        </Draggable>
      ))}
      {droppableProvided.placeholder}
    </div>
  );
};

export default TaskList;
