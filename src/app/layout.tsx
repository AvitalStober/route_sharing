// app/layout.tsx
'use client'
import { SessionProvider } from "next-auth/react";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head> 
        <title>My Next.js App</title>
      </head>
      <body> 
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>  );
}
