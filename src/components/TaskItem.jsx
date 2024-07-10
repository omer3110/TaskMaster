import React from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import api from "@/services/api.service";
import { format } from "date-fns";

const TaskItem = ({ task, onUpdate }) => {
  const { toast } = useToast();

  const handleUpdate = async (event) => {
    event.stopPropagation();
    try {
      const response = await api.patch(`/task/edit/${task._id}`, {
        isPinned: !task.isPinned,
      });
      console.log(response);
      onUpdate(task._id, response.data.task); // Call onUpdate with the updated task
      toast({
        title: "Task Updated",
        description: "The task has been successfully updated.",
      });
    } catch (error) {
      console.error("Error updating task:", error);
      toast({
        title: "Error",
        description: "Failed to update the task.",
        status: "error",
      });
    }
  };

  // Find the latest due date from the todos
  const latestDueDate = task.todoList
    .filter((todo) => todo.dueDate)
    .map((todo) => new Date(todo.dueDate))
    .sort((a, b) => b - a)[0];

  return (
    <Card className="relative h-full cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="pb-4">{task.title}</CardTitle>
        <CardDescription>{task.description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between items-center">
        {latestDueDate && (
          <div className="text-sm text-gray-500">
            Due Date: {format(latestDueDate, "PPP")}
          </div>
        )}
        <Tooltip>
          <TooltipTrigger className="absolute top-0 right-0">
            <button
              onClick={handleUpdate}
              className="absolute top-0 right-0 group p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition duration-300"
            >
              {task.isPinned ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-pin-off text-red-500 group-hover:text-red-700 transition duration-300"
                >
                  <path d="M12 17v5" />
                  <path d="M15 9.34V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H7.89" />
                  <path d="m2 2 20 20" />
                  <path d="M9 9v1.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h11" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-pin text-blue-500 group-hover:text-blue-700 transition duration-300"
                >
                  <path d="M12 17v5" />
                  <path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z" />
                </svg>
              )}
              <span className="absolute top-0 left-0 h-full w-full rounded-full bg-blue-500 opacity-0 group-hover:opacity-10 transition duration-300"></span>
            </button>
          </TooltipTrigger>
          <TooltipContent>
            {task.isPinned ? "Unpin Task" : "Pin Task"}
          </TooltipContent>
        </Tooltip>
      </CardFooter>
    </Card>
  );
};

export default TaskItem;
