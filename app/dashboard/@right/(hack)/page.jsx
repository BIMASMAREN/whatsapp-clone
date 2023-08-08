"use client";
import DefaultLogo from "../../../../public/default-whattsapp.svg";
import Image from "next/image";
import Conversation from "@/components/Conversation/Conversation";
import { useSelector } from "react-redux";

export default function page() {
  const ConversationState = useSelector((state) => state.user.isTalking);

  return (
    <div
      className="right hidden md:block"
      id={`${ConversationState ? "visible" : ""}`}
    >
      <div className="self-center text-center  w-4/5 flex flex-col items-center">
        <Image src={DefaultLogo} priority alt="whatssap dashboard logo"/>
        <br />
        <h3 className="text-2xl">Whatssap Web</h3>
        <br />
        <div className="text-left  ">
          <p className="text-m">
            Send and receive messages without having to keep your phone
            connected. Use WhatsApp on a maximum of 4 devices and 1 phone
            simultaneously.
          </p>
        </div>
      </div>
      {ConversationState && <Conversation />}
    </div>
  );
}
