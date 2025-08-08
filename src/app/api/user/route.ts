import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import User from "@/modules/user.schema";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const { name, email, password, firstName, lastName } = await req.json();

    const session = await auth();

    if (!session || !session.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const user = await User.findById(session.user.id);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const updateFields: any = {};

    if (name) {
      updateFields.name = name;
    }

    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { message: "Invalid email format" },
          { status: 400 }
        );
      }
      updateFields.email = email;
    }

    if (password) {
      if (password.length < 8) {
        return NextResponse.json(
          { message: "Password must be at least 8 characters long" },
          { status: 400 }
        );
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      updateFields.password = hashedPassword;
    }

    if (firstName) updateFields.firstName = firstName;
    if (lastName) updateFields.lastName = lastName;

    const updatedUser = await User.findByIdAndUpdate(
      session.user.id,
      updateFields,
      {
        new: true,
        runValidators: true,
      }
    );

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
