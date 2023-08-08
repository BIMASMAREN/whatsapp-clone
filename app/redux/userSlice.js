import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: {
    name: "",
    image: "",
    email: "",
    id: "",
  },
  isTalking: false,
  ProfileSlide: false,
  newChat: false,
  getUpdateUsersList: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const userData = action.payload;
      state.user = { ...userData };
      state.isTalking = true;
      state.ProfileSlide = false;
      state.newChat = false;
    },
    setProfileSlide: (state, action) => {
      const { bool } = action.payload;
      state.ProfileSlide = bool;
    },
    setNewChat: (state, action) => {
      const { bool } = action.payload;
      state.newChat = bool;
    },
    updateTalkState : (state,action)=>{
      const {bool} = action.payload
      state.isTalking = bool
    }
    ,
    updateUsersList: (state, action) => {
      const { bool } = action.payload;
      state.getUpdateUsersList = bool;
    },

  },
});

export const { setUser, setProfileSlide, setNewChat, updateUsersList ,updateTalkState} =
  userSlice.actions;

export default userSlice.reducer;
