// 'use client'
// import { usePathname, useRouter } from "next/navigation";
// import "./globals.css";

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   const router = useRouter();
//   const pathname = usePathname(); // גישה לנתיב הנוכחי
//   if (typeof window === "undefined") {
//     return null;
//   }
//   const userTokenFromStorage = localStorage.getItem("userToken");
  
//   // בדיקה אם המשתמש לא מחובר ומנסה לגשת לדפים לא מורשים
//   const publicPaths = ["/login", "/signup", "/forgot-password", "/noAccess"];
//   if (!userTokenFromStorage && !publicPaths.some(path => pathname.includes(path))) {
//     router.push("/pages/noAccess");
//   }

//   return <>{children}</>;
// }
