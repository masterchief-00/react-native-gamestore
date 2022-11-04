import { createSlice } from "@reduxjs/toolkit";

const GameSlice = createSlice({
  name: "game",
  initialState: {
    userGames: [],
    allGames: [],
  },
  reducers: {
    setUserGames(state, action) {
      for (let game of action.payload.list) {
        if (!state.userGames.find((userGame) => userGame.id === game.id)) {
          state.userGames.push(game);
        } else {
          continue;
        }
      }
    },
    attachCategoryName(state, action) {
      for (let category of action.payload.list) {
        for (let game of state.userGames) {
          if (category.id === game.category_id) {
            Object.assign(game, { category_name: category.name });
          }
        }
      }
    },
    clearGames(state, action) {
      if (action.payload === "ALL") {
        state.userGames = [];
        state.allGames = [];
      } else if (action.payload === "USER") {
        state.userGames = [];
      } else {
        state.allGames = [];
      }
    },
  },
});
export const gameActions = GameSlice.actions;
export default GameSlice;
