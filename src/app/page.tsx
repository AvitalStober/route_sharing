"use client";
import useStore from "@/app/store/store";
import Link from "next/link";

export default function Home() {
  const token = useStore((state) => state.token);
  console.log(token);
  

  return <Link href={"/pages/AllHistoryRoutes"}>link</Link>;
}
