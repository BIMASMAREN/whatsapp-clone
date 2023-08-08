"use client";
import Whattsapp_Logo from "@/public/WhatsApp-Logo.svg";
import Image from "next/image";
import "./sty.scss";
import Link from "next/link";
import { useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { setIntoLocalStorage, getUserFromFirebase } from "@/models/user";
import ErrorComponent from "@/components/error/Error";
import SucessComponent from "@/components/sucess/Sucess";
import { errorSimplify } from "@/models/user";
export default function page() {
  const [Error, setError] = useState(null);
  const [Success, setSuccess] = useState(null);
  const email = useRef();
  const password = useRef();
  const router = useRouter();

  const submitForm = async (e) => {
    e.preventDefault();

    const data = {
      email: email.current.value,
      password: password.current.value,
    };
    await axios
      .post("/api/login", data)
      .then((res) => {
        if (res.status == 200) {
          getUserFromFirebase(res.data.uid)
            .then((user) => {
              setIntoLocalStorage(user);
            })
            .finally(() => {
              setSuccess("Sucessfully Loging");
              setTimeout(() => router.push("/dashboard"), 3500);
            });
        }
      })
      .catch((err) => {
        setError(errorSimplify(err.response.data));
        setTimeout(() => {
          setError("");
        }, 3500);
      });
  };

  return (
    <section className="Login_section">
      <div className="left">
        <div className="logo">
          <Image
            src={Whattsapp_Logo}
            className="logo_img"
            width={500}
            alt="Logo"
            priority 
          />
        </div>
        <div className="title">
          <h1>Whattsapp Web</h1>
        </div>
      </div>
      <div className="right">
        {Error && <ErrorComponent error={Error} />}
        {Success && <SucessComponent sucess={Success} />}
        <div className="title">
          <h3>
            Experience Seamless Communication – Enter WhatsApp Clone and Connect
            !.
          </h3>
        </div>
        <form onSubmit={submitForm} method="post">
          <div>
            <label htmlFor="email">Email </label>
            <input
              type="text"
              name="email"
              placeholder="email@exampl.com"
              ref={email}
              required
            />
          </div>

          <div>
            <label htmlFor="password">Password </label>
            <input
              type="password"
              name="password"
              placeholder="password"
              ref={password}
              required
            />
          </div>
          <br />
          <div className="btn">
            <button type="submit">Login</button>
            <Link href="/SignUp">Signup</Link>
          </div>
        </form>
        <div className="separator"></div>
      </div>
    </section>
  );
}
