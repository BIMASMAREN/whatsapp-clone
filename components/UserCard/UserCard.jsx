"use client";
import "./style.css";
import { useDispatch } from "react-redux";
import { setUser } from "../../app/redux/userSlice";
import { useEffect, useState } from "react";
import Skeleton from "./Skeleton";
import {
  formatReadAbleTime,
  getUserFromLocalStorage,
  ConversationId,
} from "@/models/user";
import { useSelector } from "react-redux";
import {
  getDatabase,
  ref,
  onValue,
  query,
  limitToLast,
  orderByKey,
} from "firebase/database";
import {
  getFirestore,
  onSnapshot,
  collection,
  query as q,
  where,
} from "firebase/firestore";
import { app } from "@/firebase/firebase";
const firestore = getFirestore(app);
const rlm = getDatabase(app);

export default function UserCard({ user }) {
  const dispatch = useDispatch();
  const [LastMessage, setLastMessage] = useState(null);
  const [time, setTime] = useState(null);
  const [updatedUser, setUpdatedUser] = useState(null);
  const Currentuser = getUserFromLocalStorage();
  const getUpdateUsersList = useSelector(
    (state) => state.user.getUpdateUsersList
  );
  const id = ConversationId(user.id);

  useEffect(() => {
    const urlRef = q(
      collection(firestore, "users"),
      where("id", "==", user.id)
    );
    onSnapshot(urlRef, (doc) => {
      doc.docChanges().forEach((change) => {
        setUpdatedUser(change.doc.data());
      });
    });
  });

  useEffect(() => {
    onValue(
      query(ref(rlm, `conversation/${id}`), orderByKey(), limitToLast(1)),
      (snapshot) => {
        const data = snapshot.val();
        if (data)
          Object.values(data).map((message) => {
            setLastMessage(message);
          });
      }
    );
  }, [getUpdateUsersList]);

  useEffect(() => {
    if (LastMessage) {
      setTime(
        formatReadAbleTime(LastMessage.time, "hours") +
          ":" +
          formatReadAbleTime(LastMessage.time, "minutes")
      );
    }
  }, [LastMessage]);

  const handClick = () => {
    dispatch(setUser(updatedUser));
  };
  if (!updatedUser) {
    return <Skeleton />;
  }
  return (
    <div className="UserCard" onClick={handClick}>
      <div className="profile_picture">
        <img
          alt="profile picture"
          className="profile_img"
          src={updatedUser?.image}
        />
      </div>
      <div className="name__message">
        <div className="name">{user?.username}</div>
        <div className="last_message">
          {LastMessage ? LastMessage.message.slice(0, 35) + " .." : ""}
        </div>
      </div>

      <div className="time">
        {time}
        {LastMessage?.sender === Currentuser.username ? (
          ""
        ) : (
          <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
            <circle cx="15" cy="15" r="5" fill="#539165" />
          </svg>
        )}
      </div>
    </div>
  );
}
