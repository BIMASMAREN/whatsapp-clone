"use client";
import Whattsapp_Logo from "@/public/WhatsApp-Logo.svg";
import "./style.scss";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import axios from "axios";
import { insertUser, setIntoLocalStorage } from "@/models/user";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SucessComponent from "@/components/sucess/Sucess";
import ErrorComponent from "@/components/error/Error";
import { errorSimplify } from "@/models/user";

export default function page() {
  const email = useRef();
  const password = useRef();
  const name = useRef();
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);
  const [Sucess, setSucess] = useState(null);
  const [error, setError] = useState(null);

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      username: name.current.value,
      email: email.current.value,
      password: password.current.value,
      image:
        "https://www.orthocure.co.in/wp-content/uploads/2020/10/testimonial-480x480.jpg",
    };

    try {
      const res = await axios.post("/api/register", data);

      if (res?.data?.user?.uid) {
        const id = res?.data?.user?.uid;
        setIntoLocalStorage({ username: data.username, id: id });

        const response = await insertUser({
          ...data,
          id: id || "",
          lastSeen: "online",
        });

        if (response.status === 200) {
          setSucess("Successfully Registered");
          setTimeout(() => router.push("/dashboard"), 3500);
        }
      } else {
        setError(errorSimplify(res.data));
        setTimeout(() => setError(""), 3500);
      }
    } catch (error) {
      setError(errorSimplify(error.data));
      setTimeout(() => setError(""), 3500);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <section className="SignUp_Section">
      <div className="left">
        {Sucess && <SucessComponent sucess={Sucess} />}
        {error && <ErrorComponent error={error} />}
        <div className="title">
          <h3>
            Join the WhatsApp Revolution – Instant Chat and Unstoppable
            Connections !.
          </h3>
        </div>
        <form onSubmit={submitForm} method="post">
          <div>
            <label htmlFor="email">Full Name </label>
            <input
              type="text"
              name="email"
              placeholder="Full name"
              ref={name}
              required
            />
          </div>
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
            <button type="submit" onSubmit={submitForm}>
              Sign Up
            </button>
            <Link href="/SignIn">SignIn</Link>
          </div>
        </form>
      </div>
      <div className="right">
        <div className="logo">
          <Image
            src={Whattsapp_Logo}
            className="logo_img"
            width={500}
            alt="logo"
            priority
          />
        </div>
        <div className="title">
          <h1>Whattsapp Web</h1>
        </div>
      </div>
    </section>
  );
}
