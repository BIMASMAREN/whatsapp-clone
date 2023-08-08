"use client";
import { useEffect } from "react";
import "./style.scss";
import { getUsers } from "@/models/user";
import UserCard from "./userCard";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setNewChat } from "@/app/redux/userSlice";
import { BsArrowLeftShort } from "react-icons/bs";

export default function newChat() {
  const dispatch = useDispatch();
  const [users, setUsers] = useState(null);
  const [result, setResult] = useState(null);
  const [term, setTerm] = useState("");

  const close = () => {
    dispatch(setNewChat({ bool: false }));
  };

  useEffect(() => {
    const anony = async () => setUsers(await getUsers());
    anony();
  }, []);

  useEffect(() => {
    if (users) {
      const filteredList = users.filter((user) =>
        user.username.toLowerCase().includes(term.toLowerCase())
      );
      setResult(filteredList);
    } else {
      setResult(users); // Revert to the original list if searchTerm is empty
    }
  }, [users, term]);

  return (
    <div className="newChat">
      <div className="title">
        <BsArrowLeftShort size={25} onClick={close} />
        New Conversation
      </div>
      <div className="search_input">
        <input
          type="text"
          placeholder="search by username"
          onChange={(e) => setTerm(e.target.value)}
        />
      </div>
      <div className="usersLists">
        {result && result.map((user) => <UserCard user={user} key={user.id} />)}
      </div>
    </div>
  );
}
