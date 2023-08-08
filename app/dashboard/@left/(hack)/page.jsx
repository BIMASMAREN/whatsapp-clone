"use client";
import Nav from "@/components/Nav/Nav";
import RecentChat from "@/components/Recent_Chat/page";
import Profile from "@/components/Profile/Profile";
import NewChat from "@/components/newChat/newChat";
import { useSelector } from "react-redux";
export default function page() {
  const ProfileSlide = useSelector((state) => state.user.ProfileSlide);
  const newChat = useSelector((state) => state.user.newChat);
  const ConversationState = useSelector((state) => state.user.isTalking);

  return (
    <div className="left" id={`${ConversationState ? "hidden" : ""}`}>
      <Nav />
      {ProfileSlide && <Profile flag={ProfileSlide} />}
      {newChat && <NewChat />}
      <RecentChat />
    </div>
  );
}
