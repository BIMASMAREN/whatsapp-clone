"use client";
import { useRouter } from "next/navigation";
import { getUserFromLocalStorage } from "@/models/user";
import Loading from "@/components/Loading/Loading";
import {useEffect} from 'react'
export default function Home() {
  const router = useRouter();
  const user = getUserFromLocalStorage();
  useEffect(()=>{
    if (!user) {
      router.push("/SignIn");
    } else {
      router.push("/dashboard");
    }
  })
  return <Loading />;
}
