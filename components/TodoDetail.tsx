"use client";

import { FormEvent } from "react";
import { useTaskById } from "@/hooks/useTodoList";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { ArrowLeft } from "lucide-react";
import Modal from "./Modal";
import { useUpdateTask } from "@/hooks/useTodoList";

interface TodoDetailProps {
  id: string;
}

export function SkeletonLoading() {
  return (
    <main role="main">
      <section className="min-h-screen flex items-center justify-center py-6">
        <Card className="w-full max-w-2xl font-inter">
          <CardContent className="flex flex-col justify-center gap-4 p-6">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-32" />
            <div className="flex justify-between gap-4 items-center">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-24" />
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

function TodoDetail({ id }: TodoDetailProps) {
  const { mutate: updateTask } = useUpdateTask();

  const router = useRouter();
  const { data, isLoading, error } = useTaskById(id);

  if (isLoading) return <SkeletonLoading />;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>Task not found</p>;

  const handleGoBack = () => router.back();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const status = formData.get("status") as string;

    if (!data.id) {
      console.error("Todo ID is missing");
      return;
    }

    console.log("Updating task with:", { name, description, status });

    updateTask({
      id: data.id,
      data: {
        name,
        description,
        status,
      },
    });
  };

  const statusColorMap: Record<string, string> = {
    IN_PROGRESS: "bg-chart-5/50",
    DONE: "bg-green-500/50",
    TODO: "bg-chart-1/50",
  };

  return (
    <main role="main" aria-labelledby="todo-detail-heading">
      <section className="min-h-screen flex items-center justify-center py-6">
        <Card className="w-full max-w-2xl font-inter">
          <CardContent className="flex flex-col justify-center gap-4 p-6">
            <h1
              className="text-3xl font-bold text-blue-600 border-b pb-4"
              id="todo-detail-heading"
            >
              Todo Details
            </h1>
            {!data?.name && (
              <p className="italic text-xl text-center"> No task available</p>
            )}
            <h2 className="font-medium text-xl">Title: {data.name}</h2>
            <p className="text-gray-500 italic">
              {data.description || "No description available"}
            </p>
            {data.status === "DONE" ? (
              <p>
                Task completed at {new Date(data.createdAt).toLocaleString()}
              </p>
            ) : (
              <p>Task added on: {new Date(data.createdAt).toLocaleString()}</p>
            )}
            <p
              className={`${statusColorMap[data.status]} p-2 rounded-lg`}
              aria-live="polite"
            >
              {data.status.replace("_", " ").toUpperCase()}
            </p>

            <div className="flex justify-between gap-4 items-center">
              <Button
                onClick={handleGoBack}
                className="bg-blue-primary hover:bg-blue-secondary/90"
                aria-label="Go Back"
              >
                <ArrowLeft /> Go back
              </Button>
              <Modal task={data} onSubmit={handleSubmit} />
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default TodoDetail;
