"use client";
import "./style.css";
import { motion as m } from "framer-motion";
import { getUserFromLocalStorage, updateProfile } from "@/models/user";
import { useDispatch } from "react-redux";
import { setProfileSlide } from "@/app/redux/userSlice";
import { BsArrowLeftShort } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import { setUser } from "@/app/redux/currentUser";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  getFirestore,
  onSnapshot,
  collection,
  query,
  where,
} from "firebase/firestore";
import { app } from "@/firebase/firebase";

const storage = getStorage(app);
const firestore = getFirestore(app);

export default function Profile(props) {
  const user = getUserFromLocalStorage();
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [SynsUser, setSynsUser] = useState(null);
  const [ProgresStatus, setProgress] = useState(0);

  useEffect(() => {
    const q = query(collection(firestore, "users"), where("id", "==", user.id));
    const unsubscribe = onSnapshot(q, (doc) => {
      doc.docChanges().forEach((change) => {
        setSynsUser(change.doc.data());
      });
    });
  });
  useEffect(() => {
    if (SynsUser) {
      dispatch(setUser({ ...SynsUser }));
    }
  }, [SynsUser]);
  const animation = {
    width: props.flag ? "100%" : 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  };
  const collapse = () => dispatch(setProfileSlide({ bool: false }));

  const openInput = () => inputRef.current.click();

  const uploadFile = (e) => {
    const selectedFile = e.target.files[0];
    const path = ref(storage, `users/${user.id}/profile`);
    const storageRef = ref(storage, path);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            updateProfile(downloadURL);
          })
          .finally(() => setProgress(0));
      }
    );
  };

  return (
    <m.div
      initial={{
        width: "0%",
      }}
      animate={animation}
      className="Slide"
    >
      <div className="back_bar">
        <BsArrowLeftShort
          size={25}
          onClick={collapse}
          style={{ color: "white" }}
        />
        <h3 className="text-white text-xl">profile</h3>
      </div>
      <div className="profile_picture flex items-center justify-center">
        <div className="progress_bar" style={{ width: ProgresStatus }}></div>
        <input
          type="file"
          name="uploadImage"
          ref={inputRef}
          style={{ display: "none" }}
          onChange={uploadFile}
        />
        <img
          src={SynsUser?.image}
          className="picture-img "
          alt="user profile"
          onClick={openInput}
          key={SynsUser?.image}
        />
      </div>
      <div className="username">
        <div className="name px-4 ">
          <p>username : </p>
        </div>
        <div className="full_name px-4 ">{SynsUser?.username}</div>
      </div>
    </m.div>
  );
}
