import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connect from "@/app/lib/DB/connectDB";
import User from "@/app/lib/models/userModel";
import { generateToken } from "@/app/functions/tokenFunction";

// מגדירים את הסוד עבור NextAuth
const SECRET_KEY = process.env.NEXTAUTH_SECRET || "";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "select_account", // מאפשר בחירת חשבון Google כל פעם
        },
      },
    }),
  ],
  secret: SECRET_KEY,

  callbacks: {
    // יצירת טוקן חדש או עדכון טוקן קיים
    async jwt({ token, user }) {
      await connect();

      if (user) {
        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          const newUser = await User.create({
            fullName: user.name,
            email: user.email,
            password: "",
            googleUser: true,
          });

          token.id = newUser._id.toString();
          token.email = newUser.email;
          token.name = newUser.fullName;
          token.token = generateToken(newUser._id.toString(), newUser.email, newUser.fullName, newUser.googleUser);
        } else {
          token.id = existingUser._id.toString();
          token.email = existingUser.email;
          token.name = existingUser.fullName;
          token.token = generateToken(existingUser._id.toString(),existingUser.email,existingUser.fullName,existingUser.googleUser);
        }
      }
      return token;
    },

    // עדכון ה-session עם ה-token
    async session({ session, token }) {
      // הוספת הטוקן ל-session.user
      session.user.token = token.token as string | null; // הוספנו את ההמרה כאן
      return session;
    },

    // טיפול בהפניות לאחר ההתחברות
    async redirect({baseUrl}) {
      return `${baseUrl}/pages/signup`;
    },
  },
});

export { handler as GET, handler as POST };
