// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import connect from "@/app/lib/DB/connectDB";
// import User from "@/app/lib/models/userModel"; // מודל המשתמש שלך

// const handler = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!, // שם משתנה תואם ל-.env
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//       authorization: {
//         params: {
//           prompt: 'select_account', // מאפשר בחירת חשבון Google כל פעם
//         },
//       },
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET, // סוד לאימות

//   callbacks: {
//     async signIn({ user }) {
//       await connect(); // חיבור למסד הנתונים
//       try {
//         const existingUser = await User.findOne({ email: user.email });
//         if (!existingUser) {
//           await User.create({
//             fullName: user.name,
//             email: user.email,
//             password: "", // משתמש Google לא צריך סיסמה
//             googleUser: true, // מזהה שמדובר במשתמש Google
//           });
//           console.log("New user created:", user);
//         } else {
//           console.log("User already exists:", user);
//         }
//         return true; // הצלחה בהתחברות
//       } catch (error) {
//         console.error("Error during sign-in:", error);
//         return false; // כשלון בהתחברות
//       }
//     },

//     async session({ session, token }) {
//       return session;
//     },

//     async redirect({ url, baseUrl }) {
//       if (url.startsWith(baseUrl)) {
//         return url;
//       }
//       return baseUrl;
//     },
//   },
// });

// export { handler as GET, handler as POST };
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connect from "@/app/lib/DB/connectDB";
import User from "@/app/lib/models/userModel"; 
// import jwt from "jsonwebtoken"; 

// const SECRET_KEY = process.env.NEXTAUTH_SECRET || ""; 

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!, // שם משתנה תואם ל-.env
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: 'select_account', // מאפשר בחירת חשבון Google כל פעם
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // סוד לאימות

  callbacks: {
    async signIn({ user }) {
      await connect(); // חיבור למסד הנתונים
      try {
        const existingUser = await User.findOne({ email: user.email });
        
        if (!existingUser) {
          await User.create({
            fullName: user.name,
            email: user.email,
            password: "", // משתמש Google לא צריך סיסמה
            googleUser: true, // מזהה שמדובר במשתמש Google
          });
          console.log("New user created:", user);
        } else {
          console.log("User already exists:", user);
        }

        // יצירת טוקן עבור המשתמש החדש או הקיים
        // const token = jwt.sign(
        //   { id: user.id, email: user.email, name: user.name },
        //   SECRET_KEY,
        //   { expiresIn: "1h" }
        // );

        return true; // הצלחה בהתחברות
      } catch (error) {
        console.error("Error during sign-in:", error);
        return false; // כשלון בהתחברות
      }
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) {
        return url;
      }

      // נוודא שהמשתמש ינותב לדף הבית אם הוא קיים
      const user = await User.findOne({ email: url });
      if (user) {
        return `${baseUrl}`; // אם הוא קיים, הפנה לדף הבית
      } else {
        return `${baseUrl}/complete-details`; // אם הוא חדש, הפנה לדף הוספת פרטים
      }
    },
  },
});

export { handler as GET, handler as POST };
