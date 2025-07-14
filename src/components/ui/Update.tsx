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
import { MdEdit } from "react-icons/md";
const Update = ({
  id,
  title,
  postuserid,
}: {
  id: string;
  title: string;
  postuserid: string;
}) => {
  const [todo, setTodo] = useState(title);
  const session = useSession();
  const nevgation = useRouter();

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <MdEdit />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Todo</DialogTitle>
            <DialogDescription>
              Don't watch the clock; do what it does. Keep going.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Todo</Label>
              <Input
                onChange={(e) => setTodo(e.target.value)}
                id="title"
                name="title"
                value={todo}
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
                  if (postuserid == session.data?.user.id) {
                    const res = await fetch("/api/todo", {
                      method: "PUT",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        title: todo,
                        userId: session.data?.user.id,
                        postId: id,
                      }),
                    });
                    if (res.ok) {
                      toast.success("Todo Updated  successfully!");
                      setTodo("");
                      nevgation.push("/");
                    } else {
                      toast.error("Failed to create todo");
                    }
                  }else{
                    toast.error("You are not the Owner")
                  }
                }}
              >
                Update
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default Update;
