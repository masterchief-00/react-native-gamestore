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
  },
});

export const CategoryActions = CategorySlice.actions;
export default CategorySlice;
