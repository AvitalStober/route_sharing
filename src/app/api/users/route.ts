import connect from "@/app/lib/DB/connectDB";
import User from "@/app/lib/models/userModel";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    await connect();
    const { userId, routeId } = await request.json();

    if (!userId || !routeId) {
      return NextResponse.json(
        { message: "Missing userId or routeId" },
        { status: 400 }
      );
    }

    // בדיקה אם routeId קיים כבר ב-historyRoutes
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const alreadyExists = existingUser.historyRoutes.some(
      (historyRoute: { routeId: Types.ObjectId; rateRoute: number }) =>
        historyRoute.routeId.toString() === routeId
    );

    if (alreadyExists) {
      return NextResponse.json(
        { message: "Route already exists in history" },
        { status: 201 }
      );
    }

    // עדכון המשתמש והוספת routeId ייחודי
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: {
          historyRoutes: {
            routeId: routeId,
            rateRoute: 0,
          },
        },
      },
      { new: true } // מחזיר את המסמך המעודכן
    );

    // החזרת תגובה עם המשתמש המעודכן
    return NextResponse.json(
      { message: "Route added to history successfully", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error: failed to add history route" },
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
