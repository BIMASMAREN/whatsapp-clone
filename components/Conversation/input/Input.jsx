"use client";
import { pushMessage, ConversationId } from "@/models/user";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserFromLocalStorage } from "@/models/user";
import { VscSend } from "react-icons/vsc";

export default function Input() {
  const [send, setSend] = useState(false);
  const [message, setMessageInput] = useState("");
  const reciver = useSelector((state) => state.user.user);
  const username = getUserFromLocalStorage()?.username;
  console.log(getUserFromLocalStorage())
  const id = ConversationId(reciver.id);

  const sendMessage = () => {
    const input = document.getElementById("inputer");
    input.value = "";

    pushMessage(username, reciver, message, id);
  };

  useEffect(() => {
    setSend(message ? true : false);
  }, [message]);
  return (
    <div className="input">
      <input
        type="text"
        name="textInpût"
        placeholder="Taper un message"
        onChange={(e) => setMessageInput(e.target.value)}
        id="inputer"
      />
      {send && <VscSend onClick={sendMessage} size={24}/>}
    </div>
  );
}
