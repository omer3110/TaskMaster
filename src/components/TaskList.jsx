import React from "react";
import TaskItem from "@/components/TaskItem";

const TaskList = ({ tasks, onTaskClick, onUpdate }) => {
  if (tasks.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {tasks.map((task) => (
        <div key={task._id} onClick={() => onTaskClick(task)}>
          <TaskItem task={task} onUpdate={onUpdate} />
        </div>
      ))}
    </div>
  );
};

export default TaskList;
