import connect from "@/app/lib/DB/connectDB";
import Route from "@/app/lib/models/routeModel";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { ownerId: string } }
) {
  try {
    await connect();
    const { ownerId } = await params;
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
