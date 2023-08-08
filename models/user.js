import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import {
  getDatabase,
  ref,
  push,
  get,
  query,
  limitToLast,
  orderByKey,
} from "firebase/database";
import { app } from "../firebase/firebase";
import { NextResponse } from "next/server";
const firestore = getFirestore(app);
const RealTimeDatabase = getDatabase(app);
import { store } from "@/app/store";
import AES from "crypto-js/aes";
import encUtf8 from "crypto-js/enc-utf8";
import { updateUsersList } from "@/app/redux/userSlice";

export const setIntoLocalStorage = (user) => {
  const secret = process.env.SECRET_PASS_PHRASE || "ApexpuJVJxRZb";
  const userString = JSON.stringify(user);
  const encryptedUserString = AES.encrypt(userString, secret).toString();
  localStorage.setItem("_user", encryptedUserString);
};

export const getUserFromFirebase = async (userid) => {
  return new Promise((resolve, reject) => {
    getDocs(query(collection(firestore, "users"), where("id", "==", userid)))
      .then((res) => {
        res.forEach((user) => resolve(user.data()));
      })
      .catch((error) => reject(error));
  });
};

export const getUserFromLocalStorage = () => {
  // Get the encrypted user string from localStorage
  const secret = process.env.SECRET_PASS_PHRASE || "ApexpuJVJxRZb";
  if (typeof window === "undefined") {
    return null;
  }
  if (!localStorage.getItem("_user")) return null; // Return null if no user found

  const encryptedUserString = localStorage.getItem("_user");
  const decryptedBytes = AES.decrypt(encryptedUserString, secret);
  const decryptedUserString = decryptedBytes.toString(encUtf8);
  const user = JSON.parse(decryptedUserString);

  return user;
};

export const insertUser = async (user) => {
  const q = collection(firestore, "users");
  try {
    await addDoc(q, { ...user });
    return NextResponse.json("User Inserted", { status: 200 });
  } catch (erorr) {
    return NextResponse.json("Erorr has occured", { status: 400 });
  }
};

export const getUsers = async () => {
  const Collection = collection(firestore, "users");
  const users = await getDocs(Collection);
  const List = [];
  users.forEach((user) => List.push(user.data()));
  return List;
};

export const pushMessage = async (sender, reciver, message, id) => {
  console.log(sender, reciver, message, id);
  await getLastMessage(reciver.id).then((res) => {
    if (!res) {
      pushRecentChat(reciver);
    }
  });
  push(ref(RealTimeDatabase, `conversation/${id}`), {
    sender: sender,
    reciver: reciver.username,
    message: message,
    time: getTime(),
  });
};

export const ConversationId = (reciverId) => {
  const state = store.getState();
  const id1 = state.user.user.id;
  const id2 = getUserFromLocalStorage()?.id;
  const id = ((reciverId || id1).slice(0, 5) + id2.slice(0, 5))
    .split("")
    .sort()
    .join("");
  return id;
};

export const pushRecentChat = (userB) => {
  const userA = getUserFromLocalStorage();
  const dataA = { ...userA, time: getTime() };
  const dataB = { ...userB, time: getTime() };
  push(ref(RealTimeDatabase, `RecenetChat/${userA.id}`), dataB);
  push(ref(RealTimeDatabase, `RecenetChat/${userB.id}`), dataA);
  const dispatch = store.dispatch;
  dispatch(updateUsersList({ bool: true }));
};
export const getLastSeen = (reciverId) => {
  return new Promise((resolve, reject) => {
    getUserFromFirebase(reciverId).then((res) => {
      resolve(res.lastSeen || "offline");
    });
  });
};

export const UpdateLastSeen = () => {
  const id = getUserFromLocalStorage()?.id;
  const link = collection(firestore, "users");
  getDocs(query(link, where("id", "==", id))).then((res) => {
    res.forEach((url) => {
      const path = doc(firestore, `users/${url.id}`);
      updateDoc(path, {
        lastSeen: new Date().toISOString(),
      });
    });
  });
};

export const getLastMessage = async (reciverId) => {
  const id = ConversationId(reciverId);
  const link = `conversation/${id}`;
  return new Promise((resolve, reject) => {
    get(query(ref(RealTimeDatabase, link), orderByKey(), limitToLast(1)))
      .then((res) => resolve(res.val()))
      .catch((error) => reject(error));
  });
};

const getTime = () => new Date().toISOString();

export const formatReadAbleTime = (isoString, req) => {
  if (!isoString) return "NAN";
  const date = new Date(isoString);

  switch (req) {
    case "year":
      return date.getFullYear();
    case "month":
      return date.getMonth() + 1;
    case "day":
      return date.getDate();
    case "hours":
      return date.getHours();
    case "minutes":
      return date.getMinutes();
    case "seconds":
      return date.getSeconds();
    default:
      return "Invalid Request";
  }
};

export const errorSimplify = (error) => {
  const errorMap = {
    "auth/email-already-in-use": "This email address is already in use.",
    "auth/invalid-email": "Invalid email address.",
    "auth/weak-password":
      "Password is too weak. It must be at least 6 characters long.",
    "auth/user-not-found": "User is not found.",
    "auth/wrong-password": "Incorrect password.",
    "auth/weak-password": "Password is too weak.",
  };
  return errorMap[error] || "An error occurred. Please try again.";
};

export const updateProfile = async (imageRef) => {
  const id = getUserFromLocalStorage()?.id;

  getDocs(query(collection(firestore, "users"), where("id", "==", id))).then(
    (res) => {
      res.forEach((url) => {
        const path = doc(firestore, `users/${url.id}`);
        updateDoc(path, {
          image: imageRef,
        }).catch((err) => console.log(err));
      });
    }
  );
};
