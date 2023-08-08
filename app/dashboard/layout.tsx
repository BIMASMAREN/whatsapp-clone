"use client";
import { getUserFromLocalStorage, UpdateLastSeen } from "@/models/user";
import "./style.css";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading/Loading";
import { getDatabase, ref, set, onDisconnect } from "firebase/database";
import { app } from "@/firebase/firebase";
const db = getDatabase(app);

export default function RootLayout(props: {
  children: React.ReactNode;
  right: React.ReactNode;
  left: React.ReactNode;
}) {
  const user = getUserFromLocalStorage();
  const router = useRouter();
  useEffect(() => {
    const path = ref(db, `users/${user.id}`);
    set(path, {
      lastSeen: "online",
    });
    onDisconnect(path).set({
      lastSeen: new Date().toISOString(),
    });
  });
  useEffect(() => {
    if (!user) {
      router.push("/SignIn");
    } else {
      router.push("/dashboard");
    }
  }, [user, router]);

  if (!user) {
    return <Loading />;
  }

  return (
    <section className="dashboard">
      {props.left}
      {props.right}
    </section>
  );
}
