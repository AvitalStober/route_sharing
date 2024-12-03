import connect from "@/app/lib/DB/connectDB";
import Route from "@/app/lib/models/routeModel";
import User from "@/app/lib/models/userModel";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { ownerId: string } }
) {
  try {
    await connect();
    const { ownerId } = await params;
    console.log(ownerId);

    const user = await User.findById(ownerId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const routes = await Route.find({ ownerId: ownerId });
    return NextResponse.json(routes, { status: 200 });
  } catch (error) {
    console.error("Error fetching routes:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
