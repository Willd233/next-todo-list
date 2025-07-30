import dbConnect from "@/lib/dbConnect";
import User from "@/modules/user.schema";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

type TUser = {
  name: string;
  email: string;
  password: string;
};

export async function POST(req: Request) {
  await dbConnect();

  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({
      message: "All fields are required",
    });
  }

  const userExists: TUser | null = await User.findOne({ email });

  console.log(userExists);

  if (userExists?.name || userExists?.email) {
    return NextResponse.json({
      message: "User already exists",
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
    return NextResponse.json({
      message: error.message,
    });
  }
}
