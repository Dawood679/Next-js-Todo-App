"use client";
import React, { useState } from "react";
import { Input } from "./input";
import { Button } from "./button";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Separator } from "@/components/ui/separator";
import Link from "next/link";



import Dark from "./Dark";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const session = useSession();
  const router = useRouter();
  const [search, setSearch] = useState("");
  

  if (session.status == "loading") {
    return null;
  }

  return (
    <div className="flex justify-between items-center px-10 py-5 border-b">
      <div>
        <h2 className="font-bold text-gray-800">
          <Link href={"/"}>Todo App</Link>
        </h2>
      </div>
      <div className="w-[50vw] shadow-2xl shadow-blue-500/40">
        <Input
          type="text"
          className="text-center "
          placeholder="Search Todo"
          onChange={(e) => {
            if (search) {
              router.push(`/?search=${encodeURIComponent(search.trim())}`);
              
            } else {
              router.push("/");
            }
            setSearch(e.target.value);
          }}
        ></Input>
      </div>

      {session.data?.user ? (
        <div className="flex gap-5">
          <div>
            <Dark></Dark>
          </div>
          <Popover>
            <PopoverTrigger>
              {" "}
              <Avatar>
                <AvatarImage src={session.data.user.image || ""} />
                <AvatarFallback>
                  {session.data.user.name?.charAt(0) ||
                    "D" + session.data.user.name?.charAt(1).toUpperCase() ||
                    "A"}
                </AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent>
              <form action={() => signOut()}>
                <div>
                  <div className="pb-3 font-bold">
                    <h2 className=""> {session.data.user.name}</h2>
                  </div>
                  <Separator />
                  <div className="pt-2">
                    <Button type="submit">Sign out</Button>
                  </div>
                </div>
              </form>
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <div>
          <div className="flex gap-5">
            <form action={() => signIn()}>
              <Button type="submit" variant={"outline"} color="bg-blue-500">
                Sign In
              </Button>
            </form>
            <form action={() => signIn()}>
              <Button type="submit">Sign Up</Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
