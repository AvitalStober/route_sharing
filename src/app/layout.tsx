"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import "./globals.css";
import Script from "next/script";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    const publicPaths = [
      "/",
      "/pages/login",
      "/pages/signup",
      "/pages/forgetPassword",
      "/pages/noAccess",
      "/pages/homeImage",
    ];
    if (pathname == "/") {
      router.push("/pages/homeImage");
    }
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
      <body>{children}
        <Script
          src="https://cdn.enable.co.il/licenses/enable-L352538x9gw76prm-1224-66858/init.js"
          strategy="afterInteractive"
        >
        </Script>
      </body>
    </html>
  );
}
