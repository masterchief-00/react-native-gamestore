import { createSlice } from "@reduxjs/toolkit";

const CategorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [{ name: "explore" }],
  },
  reducers: {
    setCategories(state, action) {
      for (let item of action.payload.list) {
        if (!state.categories.find((i) => i.name === item.name)) {
          state.categories.push(item);
        } else {
          continue;
        }
      }
    },
    addCategory(state, action) {
      let newCategory = action.payload;
      let existingItem = state.categories.find(
        (item) => item.name === newCategory.name
      );
      if (!existingItem) {
        state.categories.push(newCategory);
      }
    },    
    clearCategories(state, action) {
      state.categories = [{ name: "explore" }];
    },
  },
});

export const CategoryActions = CategorySlice.actions;
export default CategorySlice;
