import { configureStore } from "@reduxjs/toolkit";
import CategorySlice from "./CategorySlice";
import GameSlice from "./GameSlice";
import UserSlice from "./UserSlice";

const store = configureStore({
  reducer: {
    user: UserSlice.reducer,
    category: CategorySlice.reducer,
    game: GameSlice.reducer,
  },
});
export default store;
