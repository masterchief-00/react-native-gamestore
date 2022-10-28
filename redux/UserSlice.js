import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    userData: {
      name: "",
      email: "",
      location: "",
      joinDate: "",
      wishlist:0,
      game:0,
      token: "",
    },
    test: "initial",
  },
  reducers: {
    setUserData(state, action) {
      state.userData = {
        name: action.payload.name,
        email: action.payload.email,
        location: action.payload.location,
        joinDate: action.payload.joinDate,
        wishlist: action.payload.wishlist,
        games: action.payload.games,
        token: action.payload.token,
      };
    },
    setTest(state, action) {
      state.test = action.payload;
    },
  },
});

export const UserActions = UserSlice.actions;
export default UserSlice;
