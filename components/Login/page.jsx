"use client";

import Image from "next/image";
import { useSession, signIn } from "next-auth/react";
import Logo from "../../public/WhatsApp-Logo.svg";
import { useRouter } from "next/navigation";
import { insertUser } from "@/models/user";
import { useEffect } from "react";

export default function page() {
  const user = useSession();
  const navigate = useRouter();
  const HandleLogin = async () => {
    if (user.status == "authenticated") {
      await insertUser(user.data.user);
      navigate.push("/dashboard");
    }
  };
  useEffect(() => {
    HandleLogin();
  }, [user.status]);

  return (
    <div className="self-center text-center">
      <Image src={Logo} width={300} height={300} alt="Whatssap Logo" />
      <button
        onClick={signIn}
        className="bg-midnight hover:bg-blue-600 text-white font-semibold px-10 py-2 rounded"
      >
        Sign In
      </button>
    </div>
  );
}
