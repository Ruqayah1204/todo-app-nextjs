import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllTask,
  getTaskById,
  deleteTaskById,
  updateTask,
  createTask,
  Task,
  CreateTaskData,
  UpdateTaskData,
} from "../lib/todoApi";

export const useTaskList = () => {
  return useQuery<Task[], Error>({
    queryKey: ["tasks"],
    queryFn: getAllTask,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useTaskById = (id: string | undefined) => {
  return useQuery<Task, Error>({
    queryKey: ["task", id],
    queryFn: () => getTaskById(id!),
    enabled: !!id,
  });
};

interface DeleteTaskContext {
  previousTodos: Task[] | undefined;
}

export const useDeleteTaskById = () => {
  const queryClient = useQueryClient();

  return useMutation<{ message: string }, Error, string, DeleteTaskContext>({
    mutationFn: deleteTaskById,
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });
      const previousTodos = queryClient.getQueryData<Task[]>(["tasks"]);
      queryClient.setQueryData<Task[]>(["tasks"], (old) =>
        old?.filter((task) => task.id !== id) || []
      );

      return { previousTodos };
    },

    onError: (_err, _id, context) => {
      queryClient.setQueryData(["tasks"], context?.previousTodos);
    },
  });
};

interface UpdateTaskVariables {
  id: string;
  data: UpdateTaskData;
}

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation<Task, Error, UpdateTaskVariables>({
    mutationFn: ({ id, data }: UpdateTaskVariables) => updateTask(id, data),
    onSuccess: (updatedTask: Task) => {
      queryClient.setQueryData<Task[]>(["tasks"], (old) =>
        old
          ? old.map((task) => (task.id === updatedTask.id ? updatedTask : task))
          : []
      );
      queryClient.setQueryData(["task", String(updatedTask.id)], updatedTask);
    },
  });
};

interface CreateTaskVariables {
  data: CreateTaskData;
}

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation<Task, Error, CreateTaskVariables>({
    mutationFn: ({ data }: CreateTaskVariables) => createTask(data),
    onSuccess: (newTask: Task) => {
      queryClient.setQueryData<Task[]>(["tasks"], (old = []) => [newTask, ...old]);
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};
