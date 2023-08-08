"use client";
import "./style.css";
import { formatReadAbleTime, getUserFromLocalStorage } from "@/models/user";

export default function Message({ message }) {
  const hours = formatReadAbleTime(message?.time || "", "hours");
  const minutes = formatReadAbleTime(message?.time || "", "minutes");
  const username = getUserFromLocalStorage()?.username;
  const classx =
    "Message_ " + `${message.sender == username ? "sender" : "reciver"}`;
  return (
    <div className={classx}>
      <div className="message">{message ? message.message : "..."}</div>
      <div className="send_time">
        {hours} : {minutes}
      </div>
    </div>
  );
}
