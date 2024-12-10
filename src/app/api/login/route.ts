import { NextResponse } from "next/server";
import connect from "@/app/lib/DB/connectDB";
import User from "@/app/lib/models/userModel";
import bcrypt from "bcrypt";
import { generateToken } from "@/app/functions/tokenFunction";
import dotenv from "dotenv";
dotenv.config();

export async function POST(request: Request) {
//   console.log("env file", process.env);

  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: true, message: "Email and password are required" },
        { status: 400 }
      );
    }

    await connect();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: true, message: "User not found" },
        { status: 404 }
      );
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    console.log(isPasswordCorrect, "pass");

    if (!isPasswordCorrect) {
      return NextResponse.json(
        { error: true, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = generateToken(
      user._id.toString(),
      user.email,
      user.fullName,
      user.address,
      user.googleUser
    );

    return NextResponse.json(
      { error: false, message: "Login successful", token },
      { status: 200 }
    );
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      { error: true, message: "Internal server error", details: err.message },
      { status: 500 }
    );
  }
}
