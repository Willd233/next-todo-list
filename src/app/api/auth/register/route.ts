import dbConnect from "@/lib/dbConnect";
import User from "@/modules/user.schema";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await dbConnect();

  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({
      message: "All fields are required",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const userResponse = newUser.toObject();
    delete userResponse.password;

    return NextResponse.json({
      status: 201,
      message: "User created successfully",
      user: newUser,
    });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json(
        {
          message: "User already exists",
        },
        { status: 409 }
      );
    }
    return NextResponse.json(
      {
        message: "Something went wrong",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
