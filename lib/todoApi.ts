import { AxiosError } from "axios";
import axios from "./axiosInstance";

export interface Task {
  id: string;
  name: string;
  description?: string;
  completed: boolean;
  priority?: "low" | "medium" | "high";
  createdAt: string;
  updatedAt: string;
  status: string
}

export interface CreateTaskData {
  name: string;
  description?: string;
  status: string;
  priority?: "low" | "medium" | "high";
}

export interface UpdateTaskData {
  name?: string;
  description?: string;
  status?: string;
  priority?: "low" | "medium" | "high";
}


export const getAllTask = async (): Promise<Task[]> => {
  try {
    const response = await axios.get<Task[]>(`/tasks?all=true`);
    const tasks = response.data ?? [];
    return tasks.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (error) {
    console.error("Error fetching task list:", error);
    const axiosError = error as AxiosError<{ message?: string }>;
    throw new Error(axiosError.response?.data?.message || "Failed to fetch data");
  }
};

export const getTaskById = async (id: string): Promise<Task> => {
  try {
    const response = await axios.get<Task>(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching task by ID:", error);
    const axiosError = error as AxiosError<{ message?: string }>;
    throw new Error(axiosError.response?.data?.message || "Failed to fetch task");
  }
};

export const updateTask = async (id: string, data: UpdateTaskData): Promise<Task> => {
  try {
    const response = await axios.patch<Task>(`/tasks/${id}`, data);
    return response.data;
  } catch (error) {
    console.log("Error updating data", error);
    const axiosError = error as AxiosError<{ message?: string }>;
    throw new Error(axiosError.response?.data?.message || "Failed to update data");
  }
};

export const deleteTaskById = async (id: string): Promise<{ message: string }> => {
  try {
    const response = await axios.delete<{ message: string }>(`/tasks/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Error deleting data", error);
    const axiosError = error as AxiosError<{ message?: string }>;
    throw new Error(axiosError.response?.data?.message || "Failed to delete data");
  }
};

export const createTask = async (data: CreateTaskData): Promise<Task> => {
  try {
    const response = await axios.post<Task>("/tasks", data);
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    const axiosError = error as AxiosError<{ message?: string }>;
    throw new Error(axiosError.response?.data?.message || "Failed to add task");
  }
};
