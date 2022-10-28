import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    userData: {
      name: "",
      email: "",
      about: "",
      location: "",
      joinDate: "",
      wishlist: 0,
      game: 0,
    },
    token: "",
    test: "initial",
  },
  reducers: {
    setUserData(state, action) {
      state.userData = {
        name: action.payload.name,
        email: action.payload.email,
        about: action.payload.about,
        location: action.payload.location,
        joinDate: action.payload.joinDate,
        wishlist: action.payload.wishlist,
        games: action.payload.games,
      };
    },
    clearUserData(state, action) {
      state.userData = {
        name: "",
        email: "",
        about: "",
        location: "",
        joinDate: "",
        wishlist: 0,
        game: 0,
      };
      state.token = "";
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setTest(state, action) {
      state.test = action.payload;
    },
  },
});

export const UserActions = UserSlice.actions;
export default UserSlice;
