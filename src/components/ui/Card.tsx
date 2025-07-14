"use client";
import { Label } from "./label";
import { Input } from "./input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./button";
import { DialogClose } from "@radix-ui/react-dialog";

import toast from "react-hot-toast";
import {  useRouter } from "next/navigation";
import {  useState } from "react";
import { useSession } from "next-auth/react";
const Card = () => {
  const [todo, setTodo] = useState("");
  const session = useSession();
  const nevgation = useRouter();

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button>New Todo</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Todo</DialogTitle>
            <DialogDescription>
              Dont watch the clock; do what it does. Keep going.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Todo</Label>
              <Input
                onChange={(e) => setTodo(e.target.value)}
                id="title"
                name="title"
                placeholder="Enter Something"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                onClick={async () => {
                  const res = await fetch("/api/todo", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      title: todo,
                      userId: session.data?.user.id,
                    }),
                  });

                  if (res.ok) {
                    toast.success("Todo created successfully!");
                    setTodo("");
                    nevgation.push("/");
                    
                  } else {
                    toast.error("Failed to create todo");
                  }
                }}
              >
                Create
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default Card;
