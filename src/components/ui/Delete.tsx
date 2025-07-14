"use client";
import { handleClick } from "@/app/actions/Todocreate";
import { useSession } from "next-auth/react";

import React from "react";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";

const Delete = ({ id, postuserid }: { id: string; postuserid: string }) => {
  const session = useSession();

  return (
    <div>
      <MdDelete
        onClick={async () => {
          if (postuserid == session.data?.user.id) {
            await handleClick(id);
            toast.success("Todo is deleted");
          }else{
            toast.error("You are not the Owner")
          }
        }}
      />
    </div>
  );
};

export default Delete;
