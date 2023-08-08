import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: {
    name: "",
    image: "",
    email: "",
    id: "",
  },
};

export const currentUser = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const userData = action.payload;
      state.user = { ...userData };
    },
  },
});

export const { setUser } = currentUser.actions;

export default currentUser.reducer;
