"use client";

import { useState, FormEvent } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TodoList from "@/components/TodoList";
import { useCreateTask } from "@/hooks/useTodoList";
import { CreateTaskModal } from "@/components/Modal";
import Link from "next/link";
import { Bot } from "lucide-react";

export default function Home() {
  const [open, setOpen] = useState(false);

  const { mutate: createTodo } = useCreateTask();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    const newTask = formData.get("name") as string;
    const description = formData.get("description") as string;

    const taskData = {
      name: newTask,
      description,
      status: "TODO",
    };

    createTodo({
      data: taskData,
    });

    setOpen(false);
  };

  return (
    <main role="main" aria-labelledby="main-heading">
      <section className="min-h-screen flex items-center justify-center py-6">
        <Card className="w-full max-w-2xl font-inter bg-transparent">
          <CardContent className="flex flex-col justify-center gap-4 p-6">
            <div className="flex items-center justify-between border-b pb-4">
              <h1
                id="main-heading"
                aria-label="Todo App Heading"
                className="text-3xl font-bold text-blue-primary"
              >
                Todo App
              </h1>
              <Link href="/agent">
                <Button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white">
                  <Bot className="w-4 h-4" />
                  AI Assistant
                </Button>
              </Link>
            </div>
            <CreateTaskModal
              onSubmit={handleSubmit}
              onOpen={setOpen}
              open={open}
            />
            <TodoList />
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
