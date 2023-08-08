import "./style.scss";
import { useDispatch } from "react-redux";
import { setUser } from "@/app/redux/userSlice";
export default function userCard({ user }) {
  const dispatch = useDispatch();
  const onClicked = () => {
    dispatch(setUser(user));
  };
  return (
    <div className="userCard" onClick={onClicked}>
      <img alt="profile picture" className="profile_img" src={user?.image} />
      <div className="name">{user?.username}</div>
    </div>
  );
}
