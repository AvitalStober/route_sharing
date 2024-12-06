import connect from "@/app/lib/DB/connectDB";
import User from "@/app/lib/models/userModel";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    await connect();

    // שליפת נתונים מהבקשה
    const { userId, routeId } = await request.json();

    if (!userId || !routeId) {
      return NextResponse.json(
        { message: "Missing userId or routeId" },
        { status: 400 }
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { historyRoutes: routeId } }, // $addToSet מבטיח שה-id לא יוכפל
      { new: true } // מחזיר את המסמך המעודכן
    );

    if (!updatedUser) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // החזרת תגובה עם המשתמש המעודכן
    return NextResponse.json(
      { message: "Route added to history successfully", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error: failed to add history route"},
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connect();
    const users = await User.find();
    if (users) return NextResponse.json(users, { status: 200 });
    else
      return NextResponse.json({ error: "users not found" }, { status: 500 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
