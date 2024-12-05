"use client";
import useStore from "@/app/store/store";
import Link from "next/link";
import './globals.css'

export default function Home() {
  const token = useStore((state) => state.token);
  console.log(token);
  

  return <Link href={"/pages/home"}>link</Link>;
}
