import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import AlertDialog from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import api from "@/services/api.service";
import { useToast } from "@/components/ui/use-toast";
import { DatePickerDemo } from "@/components/DatePicker"; // Ensure the path is correct

const TaskDetailDialog = ({
  isOpen,
  onClose,
  task = {},
  onDelete,
  onUpdate,
}) => {
  const { title = "", description = "", todoList = [] } = task;
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title,
    description,
    todoList,
  });

  const { toast } = useToast();

  const handleOpenAlertDialog = () => {
    setIsAlertDialogOpen(true);
  };

  const handleCloseAlertDialog = () => {
    setIsAlertDialogOpen(false);
  };

  const handleDelete = async () => {
    try {
      await onDelete(task._id);
      handleCloseAlertDialog();
      onClose();
      toast({
        title: "Task Deleted",
        description: "The task has been successfully deleted.",
      });
    } catch (error) {
      console.error("Error deleting task:", error);
      toast({
        title: "Error",
        description: "Failed to delete the task.",
        status: "error",
      });
    }
  };

  const handleEditToggle = () => {
    setIsEditMode(!isEditMode);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleTodoChange = (index, newTodo) => {
    const updatedTodoList = editedTask.todoList.map((todo, i) =>
      i === index ? newTodo : todo
    );
    setEditedTask((prevTask) => ({
      ...prevTask,
      todoList: updatedTodoList,
    }));
  };

  const handleCheckboxChange = (index) => {
    const updatedTodoList = task.todoList.map((todo, i) =>
      i === index ? { ...todo, isComplete: !todo.isComplete } : todo
    );

    const updatedTask = { todoList: updatedTodoList };
    handleUpdate(updatedTask);
  };

  const handleUpdate = async (updatedTask) => {
    console.log(updatedTask);
    try {
      const response = await api.patch(`/task/edit/${task._id}`, updatedTask);
      console.log(response);
      onUpdate(task._id, response.data.task);
      if (!isEditMode) {
        setEditedTask(response.data.task);
      } else {
        setIsEditMode(false);
      }
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

  const handleCancelEdit = () => {
    setEditedTask({
      title,
      description,
      todoList,
    });
    setIsEditMode(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="w-full max-w-md sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{isEditMode ? "Edit Task" : title}</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            {isEditMode ? (
              <Input
                name="title"
                value={editedTask.title}
                onChange={handleInputChange}
              />
            ) : (
              description
            )}
          </DialogDescription>
          <CardContent>
            {isEditMode ? (
              <>
                <Input
                  name="description"
                  value={editedTask.description}
                  onChange={handleInputChange}
                />
                <div>
                  <h3 className="font-semibold mt-4">Todo List:</h3>
                  {editedTask.todoList.length > 0 ? (
                    editedTask.todoList.map((todo, index) => (
                      <div
                        key={index}
                        className="flex  sm:flex-row items-center my-2 gap-2"
                      >
                        <input
                          type="checkbox"
                          checked={todo.isComplete}
                          onChange={() =>
                            handleTodoChange(index, {
                              ...todo,
                              isComplete: !todo.isComplete,
                            })
                          }
                          className="mr-2"
                        />
                        <div className="w-70">
                          <Input
                            value={todo.title}
                            onChange={(e) =>
                              handleTodoChange(index, {
                                ...todo,
                                title: e.target.value,
                              })
                            }
                            className="flex-grow mb-2 sm:mb-0"
                          />
                          <DatePickerDemo
                            selectedDate={todo.dueDate}
                            onDateChange={(date) =>
                              handleTodoChange(index, {
                                ...todo,
                                dueDate: date,
                              })
                            }
                            placeholder="Select a date"
                            className="flex-1 mb-2 sm:mb-0"
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No todos available</p>
                  )}
                </div>
              </>
            ) : (
              <>
                <div>
                  <h3 className="font-semibold mt-4">Todo List:</h3>
                  {todoList.length > 0 ? (
                    todoList.map((todo, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between my-2 gap-2"
                      >
                        <div className="flex gap-2">
                          <input
                            type="checkbox"
                            checked={todo.isComplete}
                            onChange={() => handleCheckboxChange(index)}
                            className="mr-2"
                          />
                          <span
                            className={todo.isComplete ? "line-through" : ""}
                          >
                            {todo.title}
                          </span>
                        </div>
                        <span>
                          {todo.dueDate
                            ? new Date(todo.dueDate).toLocaleDateString()
                            : "No due date"}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p>No todos available</p>
                  )}
                </div>
              </>
            )}
          </CardContent>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-end sm:space-x-2">
            {isEditMode ? (
              <>
                <div className=" flex justify-between gap-4">
                  <Button onClick={() => handleUpdate(editedTask)}>Save</Button>
                  <Button variant="ghost" onClick={handleCancelEdit}>
                    Cancel
                  </Button>
                </div>
              </>
            ) : (
              <div className=" flex justify-between gap-4">
                <Button onClick={handleEditToggle}>
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
                    className="lucide lucide-pencil"
                  >
                    <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                    <path d="m15 5 4 4" />
                  </svg>
                </Button>
                <Button variant="destructive" onClick={handleOpenAlertDialog}>
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
                    className="lucide lucide-trash-2"
                  >
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    <line x1="10" x2="10" y1="11" y2="17" />
                    <line x1="14" x2="14" y1="11" y2="17" />
                  </svg>
                </Button>
              </div>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <AlertDialog
        isOpen={isAlertDialogOpen}
        onClose={handleCloseAlertDialog}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default TaskDetailDialog;
