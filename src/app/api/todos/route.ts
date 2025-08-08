// Dependencies.
import { NextResponse } from "next/server";

// Models.
import Todo from "@/modules/todo.schema";

// Lib.
import dbConnect from "@/lib/dbConnect";

// Auth
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();

    if (!session || !session.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const todos = await Todo.find({ user: session.user.id }).sort({
      createdAt: -1,
    });

    return NextResponse.json(todos);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session || !session.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const { title, description } = await req.json();

    if (!title) {
      return NextResponse.json(
        { message: "Title and description are required" },
        { status: 400 }
      );
    }

    const todo = await Todo.create({
      title,
      description,
      user: session.user.id,
    });

    return NextResponse.json(todo, { status: 201 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
