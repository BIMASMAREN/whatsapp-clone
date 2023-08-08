import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./redux/userSlice";
import currentuserReducer from "./redux/currentUser";
export const store = configureStore({
  reducer: {
    user: userReducer,
    currentUser: currentuserReducer,
  },
});
