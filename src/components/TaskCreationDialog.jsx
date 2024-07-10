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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/services/api.service";
import { useToast } from "@/components/ui/use-toast";
import { DatePickerDemo } from "@/components/DatePicker"; // Ensure the path is correct
import { Trash2 } from "lucide-react";

const TaskCreationDialog = ({ isOpen, onClose, onTaskCreated }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    todoList: [{ title: "", isComplete: false, dueDate: null }],
  });

  const { toast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTodoChange = (index, e) => {
    const { name, value } = e.target;
    const newTodoList = [...formData.todoList];
    newTodoList[index][name] = value;
    setFormData({ ...formData, todoList: newTodoList });
  };

  const handleDateChange = (index, date) => {
    const newTodoList = [...formData.todoList];
    newTodoList[index].dueDate = date;
    setFormData({ ...formData, todoList: newTodoList });
  };

  const handleAddTodo = () => {
    setFormData({
      ...formData,
      todoList: [
        ...formData.todoList,
        { title: "", isComplete: false, dueDate: null },
      ],
    });
  };

  const handleRemoveTodo = (index) => {
    const newTodoList = formData.todoList.filter((_, i) => i !== index);
    setFormData({ ...formData, todoList: newTodoList });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/task/create", formData);
      onTaskCreated(response.data);
      toast({
        title: "Task Created",
        description: "Your task has been created successfully.",
      });
      onClose();
    } catch (error) {
      console.error("Error creating task:", error);
      toast({
        title: "Error",
        description: "Failed to create task.",
        status: "error",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-3xl">
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <DialogDescription>
            Fill in the details below to create a new task.
          </DialogDescription>
          <div className="flex flex-col gap-6 py-4">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <Label htmlFor="title" className="w-full md:w-auto text-left">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                type="text"
                placeholder="Task title"
                value={formData.title}
                onChange={handleChange}
                className="flex-grow"
              />
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <Label
                htmlFor="description"
                className="w-full md:w-auto text-left"
              >
                Description
              </Label>
              <Input
                id="description"
                name="description"
                type="text"
                placeholder="Task description"
                value={formData.description}
                onChange={handleChange}
                className="flex-grow"
              />
            </div>
            {formData.todoList.map((todo, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
              >
                <div className="flex w-full items-center gap-2">
                  <Label
                    htmlFor={`todo-title-${index}`}
                    className="sm:text-right"
                  >
                    <div className="flex  gap-1">
                      Todo <span>{index + 1}</span>
                    </div>
                  </Label>
                  <Input
                    id={`todo-title-${index}`}
                    name="title"
                    type="text"
                    placeholder="Todo title"
                    value={todo.title}
                    onChange={(e) => handleTodoChange(index, e)}
                    className="flex-grow"
                  />
                </div>
                <div className="flex flex-row justify-between sm:items-center gap-3">
                  <DatePickerDemo
                    selectedDate={todo.dueDate}
                    onDateChange={(date) => handleDateChange(index, date)}
                    placeholder="Select a date"
                    className="flex-grow"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => handleRemoveTodo(index)}
                    className="w-auto p-2"
                  >
                    <Trash2 />
                  </Button>
                </div>
              </div>
            ))}
            <Button type="button" onClick={handleAddTodo}>
              Add Todo
            </Button>
          </div>
          <DialogFooter className="flex-row justify-end sm:space-x-2 flex">
            <Button className="w-36 items-end" type="submit">
              Create Task
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskCreationDialog;
