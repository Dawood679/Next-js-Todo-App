// app/api/todo/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";


export async function POST(req: Request) {
  const { title, userId } = await req.json();
    console.log(title,userId)
  if (!title || !userId) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const todo = await prisma.todo.create({
    data: {
      title,
      userId,
    },
  });
  revalidatePath("/")

  return NextResponse.json(todo);
}
export async function PUT(req: Request) {
  const { title, userId,postId } = await req.json();
    console.log(title,userId)
  if (!title || !userId) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const todo = await prisma.todo.update({
    where:{
      id:postId
    },data:{
      title
    }
  });
  revalidatePath("/")

  return NextResponse.json(todo);
}

export async function GET(req: Request) {
  const { title, userId,postId } = await req.json();
    console.log(title,userId)
  if (!title || !userId) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const todo = await prisma.todo.findFirst({
    where:{
      id:postId
    }
  });
  revalidatePath("/")

  return NextResponse.json(todo);
}

