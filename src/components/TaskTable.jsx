import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "../components/ui/table";
import { useToast } from "../components/ui/use-toast";
import api from "@/services/api.service";

const TaskTable = ({ tasks, onTaskClick, onUpdate }) => {
  const { toast } = useToast();

  const handleUpdate = async (event, task) => {
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

  if (tasks.length === 0) return <div>No tasks available</div>;

  return (
    <Table className="min-w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/4">Title</TableHead>
          <TableHead className="w-1/2">Description</TableHead>
          <TableHead className="w-1/8">Pinned</TableHead>
          <TableHead className="w-1/8">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow
            key={task._id}
            onClick={() => onTaskClick(task)}
            className="cursor-pointer"
          >
            <TableCell className="w-1/4">{task.title}</TableCell>
            <TableCell className="w-1/2">{task.description}</TableCell>
            <TableCell className="w-1/8">
              {task.isPinned ? "Yes" : "No"}
            </TableCell>
            <TableCell className="w-1/8">
              <button
                onClick={(event) => handleUpdate(event, task)}
                className="group p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition duration-300"
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
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TaskTable;
