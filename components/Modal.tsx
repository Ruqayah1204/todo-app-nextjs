import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  // DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { Plus } from 'lucide-react'
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea"

import { Task } from "@/lib/todoApi";
import { FormEvent } from "react";

interface ModalProps {
  task: Task;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

function Modal({ task, onSubmit }: ModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-600/90">
          Edit Task
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle className="">Edit Task</DialogTitle>
          </DialogHeader>
          {/* <DialogDescription>dfdfdfdf</DialogDescription> */}

          <div className="grid gap-4 py-4">
            <div className="grid gap-3">
              <Input
                id="name-1"
                name="name"
                defaultValue={task.name}
                aria-label="Edit task title"
              />
              <Input
                id="name-1"
                name="description"
                defaultValue={task.description}
                aria-label="Edit todo description"
                placeholder="Enter description"
              />
            </div>

            <RadioGroup
              name="status"
              defaultValue={task.status}
              className="flex flex-col gap-4"
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem id="todo" value="TODO" />
                <Label htmlFor="todo">Not Completed</Label>
              </div>

              <div className="flex items-center gap-2">
                <RadioGroupItem id="in-progress" value="IN_PROGRESS" />
                <Label htmlFor="in-progress">In Progress</Label>
              </div>

              <div className="flex items-center gap-2">
                <RadioGroupItem id="done" value="DONE" />
                <Label htmlFor="done">Completed</Label>
              </div>
            </RadioGroup>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                type="submit"
                className="bg-blue-primary hover:bg-blue-primary/90"
              >
                Save changes
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default Modal;


interface ConfirmModalProps {
  handleClick: () => void;
}

export function ConfirmModal({ handleClick }: ConfirmModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="">
          <Trash2 className="text-destructive" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this task?</DialogTitle>
        </DialogHeader>
        <DialogFooter className="sm:justify-between ">
          <DialogClose asChild>
            <Button type="button" className="" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <div aria-label="Delete Button">
          <Button
            variant="secondary"
            onClick={handleClick}
            className="self-center w-full"
          >
            <Trash2 className="text-destructive" />
            Delete
          </Button></div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

interface CreateTaskModalProps {
  open: boolean;
  onOpen: (open: boolean) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export function CreateTaskModal({ onOpen, open, onSubmit }: CreateTaskModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-primary hover:bg-blue-primary/90 self-end" type="submit">
          <Plus/>Add Task
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle className="text-2xl text-blue-primary">Add Task</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-3">
              <Input
                id="name-1"
                name="name"
                placeholder="Enter new task"
                aria-label="Add task title"
                required
              />
            <Textarea name="description" placeholder="Enter description"/>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
              <Button
                type="submit"
                className="bg-blue-primary hover:bg-blue-primary/90"
              >
                Submit
              </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
