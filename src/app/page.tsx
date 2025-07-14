import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "@/lib/auth";



import Card from "@/components/ui/Card";
import  Delete  from "@/components/ui/Delete"
import Update from "@/components/ui/Update";
import { redirect } from "next/navigation";


const page = async ({ searchParams }: { searchParams: { search?: string } }) => {
  
  const data1 = await getServerSession(authOptions);
  if (!data1) {
  redirect("/api/auth/signin");
}
const search = searchParams.search ?? "";
  const alltodos = await prisma.todo.findMany({
    where: {
      userId: data1.user.id,
      title: {
        startsWith: search,
        mode: "insensitive",
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  
  
  
  return (
    <div className="flex">
      <div className="flex flex-col justify-between items-center px-[15vw] pt-10 ">
        {alltodos.map((items, index) => (
          <div className="relative" key={index}>
          <div  className="mb-4 border w-[30vw]   rounded-xl shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]">
            <div className="pl-3 pt-2 font-medium">{data1?.user.name}</div>
            <div>
              <h2 className="text-[12px] pl-3 ">
                {items.createdAt.toLocaleString()}
              </h2>
            </div>

            <div className="absolute top-4 right-3">
              <div className="flex gap-3">
                <div className="text-xl cursor-pointer">
                  <Delete id={items.id} postuserid={items.userId}/>
                </div>
                <div className="text-xl cursor-pointer">
                  <Update id={items.id} title={items.title} postuserid={items.userId}></Update>
                </div>
              </div>
            </div>

            <div className="text-sm pl-3 pt-4 pb-2 ">{items.title}</div>
          </div>
          </div>
        ))}
      </div>
      <div className="relative">
        <div className="absolute top-30 -right-[30vw]">
          <div className="cursor-pointer shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]">
            <Card></Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
