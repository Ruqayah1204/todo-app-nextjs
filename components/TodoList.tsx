import { useState, useMemo } from "react";
import { useDeleteTaskById, useTaskList } from "@/hooks/useTodoList";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ConfirmModal } from "./Modal";
import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonLoading() {
  return (
    <div className="p-4 space-y-4">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="flex items-center justify-between p-2">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-48" />
          </div>
          <Skeleton className="h-8 w-8" />
        </div>
      ))}
    </div>
  );
}

function TodoList() {
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const ITEMS_PER_PAGE = 10;

  const { data: tasks, isLoading, isError, error } = useTaskList();
  const deleteTask = useDeleteTaskById();

  const handleDeleteTask = (id: string) => {
    deleteTask.mutate(id);
    console.log("deleted items", id);
  };

  const filteredData = useMemo(() => {
    if (!tasks) return [];

    let filterResult = tasks;

    if (filter === "completed") {
      filterResult = filterResult.filter((task) => task.status === "DONE");
    } else if (filter === "not-completed") {
      filterResult = filterResult.filter((task) => task.status === "TODO");
    } else if (filter === "in-progress") {
      filterResult = filterResult.filter(
        (task) => task.status === "IN_PROGRESS"
      );
    }
    if (searchQuery) {
      filterResult = filterResult.filter((task) =>
        task.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return filterResult;
  }, [filter, tasks, searchQuery]);

  const handleFilteredChange = (value: string) => {
    setFilter(value);
    console.log(value);
    setPage(1);
  };

  const handleSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    console.log(e.target.value);
    setPage(1);
  };

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = page * ITEMS_PER_PAGE - ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const paginatedList = useMemo(() => {
    // if(!tasks) return [];
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, startIndex, endIndex]);

  if (isError) return <p>Error: {error.message}</p>;

  return (
    <section aria-labelledby="todo-list-section" className="grid gap-4">
      <h2 id="todo-list-section" className="sr-only">
        Todo List
      </h2>
      <Card className="w-full mx-auto py-0">
        <CardContent className="p-0">
          <div className="flex flex-row items-center justify-between gap-3 bg-grey p-2 rounded-t-xl">
            <Label htmlFor="search" className="sr-only">
              Search Task
            </Label>
            <Input
              type="text"
              id="search"
              placeholder="Search task"
              className="border-none"
              value={searchQuery}
              onChange={handleSearchQuery}
            />
            <Select value={filter} onValueChange={handleFilteredChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue
                  placeholder="Filter"
                  aria-label="Filter task by status"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="not-completed">Not Completed</SelectItem>
                <SelectItem value="in-progress">In Progess</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {isLoading && <SkeletonLoading />}

          <ul role="list" className="px-4">
            {paginatedList.length === 0 && (!isLoading) ? (
              <li className="p-2 text-gray-500">No task found.</li>
            ) : (
              paginatedList.map((task) => (
                <li
                  role="group"
                  key={task.id}
                  className="flex justify-between gap-8 items-center p-2 odd:border-y "
                >
                  <div className="flex gap-4 items-center">
                    <Checkbox
                      checked={task.status === "DONE"}
                      className="data-[state=checked]:bg-green-500 data-[state=checked]:text-white"
                      aria-label={`${task.name} completed`}
                      // readOnly
                    />
                    <Link href={`/task/${task.id}`} className="line-clamp-1">
                      {task.name}
                    </Link>
                  </div>
                  <ConfirmModal handleClick={() => handleDeleteTask(task.id)} />
                </li>
              ))
            )}
          </ul>
        </CardContent>
      </Card>
      <div className="flex gap-2 flex-wrap justify-center">
        {Array.from({ length: totalPages }, (value, index) => index + 1).map((pageNum) => (
          <Button
            key={pageNum}
            variant={page === pageNum ? "default" : "outline"}
            className={`px-3 ${
              page === pageNum
                ? "bg-blue-secondary text-white hover:bg-blue-secondary/90"
                : ""
            }`}
            onClick={() => setPage(pageNum)}
          >
            {pageNum}
          </Button>
        ))}
      </div>

      <div className="flex justify-center items-center gap-4">
        <Button
          className="bg-blue-secondary hover:bg-blue-secondary/90"
          aria-label="Previous Page"
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
        >
          Prev
        </Button>
        <p>
          Page:{page} of {totalPages}
        </p>
        <Button
          className="bg-blue-secondary hover:bg-blue-secondary/90"
          aria-label="Next Page"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === totalPages}
        >
          Next
        </Button>
      </div>
    </section>
  );
};

export default TodoList;
