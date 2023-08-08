"use client";
import "../style.scss";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { updateTalkState } from "../../../app/redux/userSlice";
import { useDispatch } from "react-redux";
import { app } from "@/firebase/firebase";
import { BsArrowLeftShort ,BsThreeDotsVertical} from "react-icons/bs";

const db = getDatabase(app);
import { formatReadAbleTime } from "@/models/user";
export default function Nav() {
  const user = useSelector((state) => state.user.user);
  const [lastSeen, setLastSeen] = useState("offline");
  const dispatch = useDispatch();
  useEffect(() => {
    onValue(ref(db, `users/${user.id}`), (data) => {
      const res = data.val();
      if (res.lastSeen == "online") {
        setLastSeen("online");
      } else {
        const time =
          formatReadAbleTime(res.lastSeen, "hours") +
          ":" +
          formatReadAbleTime(res.lastSeen, "minutes");
        setLastSeen(time);
      }
    });
  });
  const getBack = () => {
    dispatch(updateTalkState({ bool: false }));
  };
  return (
    <div className="Status_bar">
      <div className="profile_picture">
        <BsArrowLeftShort
          size={25}
          onClick={getBack}
          style={{ color: "white" }}
        />
        <img src={user?.image} alt="profile_img" />
      </div>
      <div className="name_date">
        <div className="name">{user?.username}</div>
        <div className="last_seen text-sm">{lastSeen}</div>
      </div>
      <div className="options">
        <BsThreeDotsVertical width={27} style={{ color: "white" }} />
      </div>
    </div>
  );
}
