import connect from "@/app/lib/DB/connectDB";
import Route from "@/app/lib/models/routeModel";
import User from "@/app/lib/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  params: { params: { ownerId: string } } // הגדרה נכונה של טיפוס params
) {
  try {
    // התחברות למסד הנתונים
    await connect();

    // שליפת ownerId מתוך context.params
    const { ownerId } = await params.params;
    console.log("ownerId",ownerId);

    if (!ownerId) {
      return NextResponse.json(
        { message: "Owner ID is required" },
        { status: 400 }
      );
    }

    // בדיקה אם המשתמש קיים
    const user = await User.findById(ownerId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // שליפת המסלולים הקשורים למשתמש
    const routes = await Route.find({ ownerId });
    return NextResponse.json(routes, { status: 200 });
  } catch (error) {
    console.error("Error fetching routes:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// import connect from "@/app/lib/DB/connectDB";
// import Route from "@/app/lib/models/routeModel";
// import User from "@/app/lib/models/userModel";
// // import { Types } from "mongoose";
// import { NextRequest, NextResponse } from "next/server";

// // מסלול GET
// export async function GET(
//   request: NextRequest,
//   { params }: { params: { ownerId: string | undefined } }
// ) {
//   try {
//     // התחברות למסד הנתונים
//     await connect();

//     // שליפת ownerId מתוך params
//     const { ownerId } = await params;
//     console.log("Owner ID:", ownerId);

//     // בדיקה אם המשתמש קיים
//     const user = await User.findById(ownerId);
//     if (!user) {
//       return NextResponse.json({ message: "User not found" }, { status: 404 });
//     }

//     // שליפת המסלולים הקשורים למשתמש
//     const routes = await Route.find({ ownerId });
//     return NextResponse.json(routes, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching routes:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
