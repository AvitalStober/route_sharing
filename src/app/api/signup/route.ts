import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/app/lib/models/userModel";
import connect from "@/app/lib/DB/connectDB";
import { generateToken, verifyToken } from "@/app/functions/tokenFunction";
import IUser from "@/app/types/users";


export async function POST(request: Request) {
  try {
    console.log('Receiving signup request...');
    // קבלת הנתונים מהבקשה
    const { fullName, email, password, address, age, historyRoutes } = await request.json();
    console.log(fullName, email, password, address, age);


    if (!fullName || !email || !password || !address || !age) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    await connect(); // התחברות ל-MongoDB

    // בדיקה אם האימייל כבר קיים במערכת
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email is already registered" },
        { status: 409 }
      );
    }

    // הצפנת הסיסמה
    const hashedPassword = await bcrypt.hash(password, 10);

    // יצירת משתמש חדש ושמירתו ב-DB
    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      age,
      address,
      googleUser: false,
      historyRoutes,
    });

    //יצירת טוקן
    const token = generateToken(newUser._id.toString(), newUser.email, newUser.fullName, newUser.googleUser);

    return NextResponse.json(
      { message: "User created successfully", token },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in signUp:", error);
    const err = error as Error;
    return NextResponse.json(
      { error: "Internal server error", details: err.message },
      { status: 500 }
    );
  }
};



export async function PUT(request: Request) {
  try {
    console.log('Receiving update request...');

    // קבלת הטוקן מה-Headers
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Authorization token is missing or invalid" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1]; // שליפת הטוקן
    const decodedToken = verifyToken(token);;

    // שליפת אימייל מהטוקן
    const tokenEmail = decodedToken.email;
    if (!tokenEmail) {
      return NextResponse.json(
        { error: "Token is missing required information" },
        { status: 403 }
      );
    }

    // קריאת נתוני הבקשה
    const { fullName, age, address, password, historyRoutes } = await request.json();

    // // בדיקת בעלות על הבקשה
    // if (email !== tokenEmail) {
    //   return NextResponse.json(
    //     { error: "You are not authorized to update this user" },
    //     { status: 403 }
    //   );
    // }

    await connect(); // התחברות ל-MongoDB

    // מציאת המשתמש לפי האימייל
    const existingUser = await User.findById(decodedToken.userId);
    if (!existingUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // עדכון השדות שסופקו
    const updatedFields: Partial<IUser> = {};
    if (fullName) updatedFields.fullName = fullName;
    if (age) updatedFields.age = age;
    if (address) updatedFields.address = address;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedFields.password = hashedPassword;
    }
    if (historyRoutes) updatedFields.historyRoutes = historyRoutes;

    // עדכון המשתמש ב-DB
    const updatedUser = await User.findOneAndUpdate(
      { tokenEmail },
      { $set: updatedFields },
      { new: true } // מחזיר את הערך המעודכן
    );

    return NextResponse.json(
      { message: "User updated successfully", updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in update:", error);
    const err = error as Error;
    return NextResponse.json(
      { error: "Internal server error", details: err.message },
      { status: 500 }
    );
  }
}
