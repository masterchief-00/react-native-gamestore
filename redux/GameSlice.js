import { createSlice } from "@reduxjs/toolkit";

const GameSlice = createSlice({
  name: "game",
  initialState: {
    userGames: [],
    categorySearchGames: [],
    newGames: [],
    topGames: [],
    mostDownloaded: [],
    activeCategory: "explore",
  },
  reducers: {
    setActiveCategory(state, action) {
      state.activeCategory = action.payload;
    },
    setSearchResults(state, action) {
      let id = 0;

      for (let game of action.payload.list) {
        if (
          !state.categorySearchGames.find(
            (resultGame) => resultGame.name === game.name
          )
        ) {
          Object.assign(game, { newId: id });
          state.categorySearchGames.push(game);
        } else {
          continue;
        }
      }
    },
    setUserGames(state, action) {
      for (let game of action.payload.list) {
        if (!state.userGames.find((userGame) => userGame.id === game.id)) {
          state.userGames.push(game);
        } else {
          continue;
        }
      }
    },
    setNewGame(state, action) {
      for (let game of action.payload.list) {
        if (!state.newGames.find((newGame) => newGame.id === game.id)) {
          state.newGames.push(game);
        } else {
          continue;
        }
      }
    },
    setTopGame(state, action) {
      for (let game of action.payload.list) {
        if (!state.topGames.find((topGame) => topGame.id === game.id)) {
          state.topGames.push(game);
        } else {
          continue;
        }
      }
    },
    setMostDownloaded(state, action) {
      for (let game of action.payload.list) {
        if (!state.mostDownloaded.find((item) => item.id === game.id)) {
          state.mostDownloaded.push(game);
        } else {
          continue;
        }
      }
    },
    attachCategoryName__user(state, action) {
      for (let category of action.payload.list) {
        for (let game of state.userGames) {
          if (category.id === game.category_id) {
            Object.assign(game, { category_name: category.name });
          }
        }
      }
    },
    attachCategoryName__new(state, action) {
      for (let category of action.payload.list) {
        for (let game of state.newGames) {
          if (category.id === game.category_id) {
            Object.assign(game, { category_name: category.name });
          }
        }
      }
    },
    attachCategoryName__top(state, action) {
      for (let category of action.payload.list) {
        for (let game of state.topGames) {
          if (category.id === game.category_id) {
            Object.assign(game, { category_name: category.name });
          }
        }
      }
    },
    attachCategoryName__most(state, action) {
      for (let category of action.payload.list) {
        for (let game of state.mostDownloaded) {
          if (category.id === game.category_id) {
            Object.assign(game, { category_name: category.name });
          }
        }
      }
    },
    attachCategoryName__categorySearch(state, action) {
      for (let category of action.payload.list) {
        for (let game of state.categorySearchGames) {
          if (category.id === game.category_id) {
            Object.assign(game, { category_name: category.name });
          }
        }
      }
    },
    clearGames(state, action) {
      if (action.payload === "ALL") {
        state.userGames = [];
        state.categorySearchGames = [];
      } else if (action.payload === "USER") {
        state.userGames = [];
      } else if (action.payload === "SEARCH") {
        state.categorySearchGames = [];
      } else {
        state.categorySearchGames = [];
      }
    },
  },
});
export const gameActions = GameSlice.actions;
export default GameSlice;
