"use server"
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";


export async function handleClick(id:string) {
   const data =  await prisma.todo.delete({
        where:{
            id
        }
    })
    revalidatePath("/")
    return data
}
