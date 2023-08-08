"use client";
import "./style.scss";
import UserCard from "../../components/UserCard/UserCard";
import { getUserFromLocalStorage } from "@/models/user";
import { AiOutlineSearch } from "react-icons/ai";
import { BsArrowLeftShort } from "react-icons/bs";
import { app } from "@/firebase/firebase";
import { useEffect, useState } from "react";
import { getDatabase, onValue, ref } from "firebase/database";

const db = getDatabase(app);
export default function page() {
  const [clicked, setClicked] = useState(false);
  const [usersList, setUsersList] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const id = getUserFromLocalStorage().id;
  const sorter = (data) => {
    if (!data) return null;

    const dataArray = Object.entries(data);
    dataArray.sort((a, b) => new Date(b[1].time) - new Date(a[1].time));
    const sortedData = Object.fromEntries(dataArray);
    return sortedData;
  };
  
  useEffect(() => {
    const fetchUsers = async () => {
      if (searchTerm.trim() === "") {
        onValue(ref(db, `RecenetChat/${id}`), (snapshot) => {
          const data = snapshot.val();
          setUsersList(sorter(data));
        });
      } else {
        onValue(ref(db, `RecenetChat/${id}`), (snapshot) => {
          const data = snapshot.val();
          const userList = Object.values(data);
          const filteredUsers = userList.filter((user) =>
            user.username.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setUsersList(filteredUsers);
        });
      }
    };

    fetchUsers();
  }, [searchTerm, id]);
  return (
    <div className="Recent_Chat">
      <div className="bar">
        <div className="search_bar">
          <div className="icon">
            {clicked ? (
              <AiOutlineSearch size={20} />
            ) : (
              <BsArrowLeftShort size={25} className="arrow" />
            )}
          </div>
          <input
            type="text"
            alt="search input"
            onClick={() => setClicked(true)}
            placeholder="Search . . . "
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="user_list">
        {usersList ? (
          Object.values(usersList).map((user) => (
            <UserCard user={user} key={user.id} />
          ))
        ) : (
          <div className="no_recent_chat">Start new converastion now</div>
        )}
      </div>
    </div>
  );
}
