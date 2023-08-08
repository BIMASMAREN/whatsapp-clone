"use client";
import "./style.css";
import { getUserFromLocalStorage } from "@/models/user";
import { useDispatch } from "react-redux";
import { setProfileSlide, setNewChat } from "@/app/redux/userSlice";
import { BsFillChatRightTextFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import {
  getFirestore,
  onSnapshot,
  collection,
  query,
  where,
} from "firebase/firestore";
import { app } from "@/firebase/firebase";
const firestore = getFirestore(app);

export default function Nav() {
  const [SynsUser, setSynsUser] = useState(null);
  const user = getUserFromLocalStorage();
  const dispatch = useDispatch();
  const ViewProfile = () => {
    dispatch(setProfileSlide({ bool: true }));
  };
  const newChat = () => {
    dispatch(setNewChat({ bool: true }));
  };
  useEffect(() => {
    const q = query(collection(firestore, "users"), where("id", "==", user.id));
    onSnapshot(q, (doc) => {
      doc.docChanges().forEach((change) => {
        setSynsUser(change.doc.data());
      });
    });
  });
  return (
    <nav>
      <div>
        <img
          className="nav profile_img "
          src={SynsUser?.image}
          alt="user profile"
          onClick={ViewProfile}
        />
      </div>
      <div className="options">
        <BsFillChatRightTextFill
          style={{ marginRight: 8 }}
          size={22}
          onClick={newChat}
        />
      </div>
    </nav>
  );
}
