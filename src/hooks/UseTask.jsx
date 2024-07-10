import { useState, useEffect, useContext } from "react";
import api from "@/services/api.service";
import { useSearchParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { AuthContext } from "@/contexts/Auth.context";

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [pinnedTasks, setPinnedTasks] = useState([]);
  const [unpinnedTasks, setUnpinnedTasks] = useState([]);
  const [error, setError] = useState(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const { logout } = useContext(AuthContext);

  const fetchTasks = async () => {
    setIsFetching(true);
    try {
      const params = { ...Object.fromEntries([...searchParams]) };
      const response = await api.get("/task", { params });
      console.log(response);
      const pinned = [];
      const unpinned = [];
      response.data.tasks.forEach((task) => {
        if (task.isPinned) {
          pinned.push(task);
        } else {
          unpinned.push(task);
        }
      });

      setTasks(response.data.tasks);
      setPinnedTasks(pinned);
      setUnpinnedTasks(unpinned);
    } catch (error) {
      console.log(error);
      setError(error);
      if (error.message === "Request failed with status code 401") {
        logout();
        toast({
          variant: "destructive",
          title: "Error loading tasks",
          description: "Session times up please log in again",
        });
      }
    } finally {
      setIsInitialLoading(false);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [searchParams]);

  return {
    tasks,
    pinnedTasks,
    unpinnedTasks,
    isInitialLoading,
    isFetching,
    error,
    fetchTasks,
  };
};

export default useTasks;
