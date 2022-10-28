import { configureStore } from "@reduxjs/toolkit";
import CategorySlice from "./CategorySlice";
import UserSlice from "./UserSlice";

const store = configureStore({
  reducer: {
    user: UserSlice.reducer,
    category:CategorySlice.reducer
  },
});
export default store;
