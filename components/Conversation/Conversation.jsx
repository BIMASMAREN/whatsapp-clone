"use client";
import "./style.scss";
import backGroundSvg from "@/public/conversation_background.svg";
import Nav from "./Nav/Nav";
import Input from "./input/Input";
import Message from "@/components/Messag/Message";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "@/firebase/firebase";
const RealTimeDatabase = getDatabase(app);
import { ConversationId } from "@/models/user";
export default function Conversation() {
  const [messages, setMessages] = useState([{}]);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const id = ConversationId();
    onValue(ref(RealTimeDatabase, `conversation/${id}`), (snapshot) => {
      const data = snapshot.val();
      setMessages(data);
    });
  }, [user.id]);

  return (
    <div
      style={{ background: backGroundSvg }}
      className="Conversation text-white"
    >
      <Nav />
      <div className="messages_list">
        {messages ? (
          Object.values(messages).map((message) => (
            <Message message={message} key={message.time + message.message} />
          ))
        ) : (
          <span className="bg-NewStart text-dark rounded-lg my-8 p-3">
            The messages are end-to-end encrypted. No third party, not even
            WhatsApp, can read or listen to them.
          </span>
        )}
      </div>
      <Input />
    </div>
  );
}
