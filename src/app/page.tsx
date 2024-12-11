"use client";
import "./globals.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  router.push("/pages/login");
}
