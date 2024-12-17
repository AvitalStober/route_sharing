'use client'
import { usePathname, useRouter } from "next/navigation";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname(); // גישה לנתיב הנוכחי
  const token = localStorage.getItem("userToken");
  console.log("pathname, token", pathname, token);
  
  // בדיקה אם המשתמש לא מחובר ומנסה לגשת לדפים לא מורשים
  const publicPaths = ["/login", "/signup", "/forgot-password", "/noAccess"];
  if (!token && !publicPaths.some(path => pathname.includes(path))) {
    router.push("/pages/noAccess");
  }

  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
