'use client';

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  
  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    const publicPaths = ["/pages/login", "/pages/signup", "/pages/forgetPassword", "/pages/noAccess"];
    
    if (userToken && pathname === "/pages/login") {
      console.log("token deleted");
      localStorage.removeItem("userToken");
    }

    if (!userToken && !publicPaths.includes(pathname)) {
      router.push("/pages/noAccess");
    }
  }, [pathname, router]);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}