import connect from "@/app/lib/DB/connectDB";
import User from "@/app/lib/models/userModel";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = await params;
    await connect();
    const user = await User.findById(userId);
    return NextResponse.json({ user: user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    await connect();

    const { userId } = params; 
    const { userDetails } = await request.json(); 

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return NextResponse.json(
        { error: "Route not found" },
        { status: 404 }
      );
    }

    user.fullName = userDetails.fullName;
    user.email = userDetails.email;
    user.address = userDetails.address;

    await user.save();

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error updating route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
