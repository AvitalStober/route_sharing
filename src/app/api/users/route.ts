import connect from "@/app/lib/DB/connectDB";
import User from "@/app/lib/models/userModel";
import { NextResponse } from "next/server";

// export async function POST(request: Request) {
//   try {
//     await connect();

//     const {
//       fullName,
//       password,
//       email,
//       age,
//       address,
//       historyRoutes
//     } = await request.json();

//     const newUser = new User({
//       fullName: fullName,
//       password: password,
//       email: email,
//       age: age,
//       address: address,
//       historyRoutes: historyRoutes
//     });

//     await newUser.save();

//     return NextResponse.json({ users: newUser }, { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { massage: "Error: failed to create user" },
//       { status: 500 }
//     );
//   }
// }

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


export async function DELETE(request: Request) {
  try {
    console.log('Deleting all users...');

    // מחיקת כל המשתמשים
    await User.deleteMany({});

    return NextResponse.json(
      { message: "All users deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting all users:", error);
    const err = error as Error;
    return NextResponse.json(
      { error: "Internal server error", details: err.message },
      { status: 500 }
    );
  }
}
