import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "@/contexts/Auth.context";
import { Button } from "@/components/ui/button";
import TaskCreationDialog from "@/components/TaskCreationDialog";
import TaskDetailDialog from "@/components/TaskDetailDialog";
import Loader from "@/components/ui/Loader";
import SearchForm from "@/components/SearchForm";
import TaskList from "@/components/TaskList"; // Ensure the path is correct
import TaskTable from "@/components/TaskTable"; // Ensure the path is correct
import useTasks from "@/hooks/UseTask"; // Ensure the path is correct
import api from "@/services/api.service";
import { TableIcon } from "lucide-react";
import { Grid2X2 } from "lucide-react";

function TasksPage() {
  const { loggedInUser } = useContext(AuthContext);
  const [isCreationDialogOpen, setIsCreationDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isTableView, setIsTableView] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    tasks,
    pinnedTasks,
    unpinnedTasks,
    isInitialLoading,
    error,
    fetchTasks,
  } = useTasks();

  const handleOpenCreationDialog = () => setIsCreationDialogOpen(true);
  const handleCloseCreationDialog = () => setIsCreationDialogOpen(false);

  const handleTaskCreated = (newTask) => {
    fetchTasks(); // Refetch tasks to update the state after creation
    setIsCreationDialogOpen(false); // Close the creation dialog
  };

  const handleOpenDetailDialog = (task) => {
    setSelectedTask(task);
    setIsDetailDialogOpen(true);
    navigate(`?taskId=${task._id}`, { replace: true });
  };

  const handleCloseDetailDialog = () => {
    setIsDetailDialogOpen(false);
    setSelectedTask(null);
    navigate(location.pathname, { replace: true });
  };

  const handleTaskDeleted = async (taskId) => {
    try {
      await api.delete(`/task/${taskId}`);
      fetchTasks(); // Refetch tasks to update the state after deletion
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleTaskUpdated = (taskId, updatedTask) => {
    fetchTasks(); // Refetch tasks to update the state after update
    setSelectedTask(updatedTask);
  };

  const toggleView = () => {
    setIsTableView((prev) => !prev);
  };

  if (isInitialLoading) return <Loader />;

  return (
    <div className="sm:w-4/5 sm:mx-28 mx-4 mb-8">
      <SearchForm />
      {loggedInUser && (
        <div className="flex justify-between items-center mb-4">
          <Button onClick={handleOpenCreationDialog}>Add Task</Button>
          <Button variant="ghost" onClick={toggleView}>
            {isTableView ? <Grid2X2 /> : <TableIcon />}
          </Button>
        </div>
      )}

      {isTableView ? (
        <div>
          {pinnedTasks.length > 0 && (
            <div>
              <h2 className="text-xl font-bold my-8">Pinned Tasks</h2>
              <TaskTable
                tasks={pinnedTasks}
                onTaskClick={handleOpenDetailDialog}
                onUpdate={handleTaskUpdated}
              />
            </div>
          )}
          <h2 className="text-xl font-bold my-8">Unpinned Tasks</h2>
          <TaskTable
            tasks={unpinnedTasks}
            onTaskClick={handleOpenDetailDialog}
            onUpdate={handleTaskUpdated}
          />
        </div>
      ) : (
        <div>
          {pinnedTasks.length > 0 && (
            <div>
              <h2 className="text-xl font-bold my-8">Pinned Tasks</h2>
              <TaskList
                tasks={pinnedTasks}
                onTaskClick={handleOpenDetailDialog}
                onUpdate={handleTaskUpdated}
              />
            </div>
          )}
          <h2 className="text-xl font-bold my-8">Unpinned Tasks</h2>
          <TaskList
            tasks={unpinnedTasks}
            onTaskClick={handleOpenDetailDialog}
            onUpdate={handleTaskUpdated}
          />
        </div>
      )}

      <TaskCreationDialog
        isOpen={isCreationDialogOpen}
        onClose={handleCloseCreationDialog}
        onTaskCreated={handleTaskCreated}
      />

      {selectedTask && (
        <TaskDetailDialog
          isOpen={isDetailDialogOpen}
          onClose={handleCloseDetailDialog}
          task={selectedTask}
          onDelete={handleTaskDeleted}
          onUpdate={handleTaskUpdated}
        />
      )}
    </div>
  );
}

export default TasksPage;
