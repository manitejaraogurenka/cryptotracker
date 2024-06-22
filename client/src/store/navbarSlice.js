import { createSlice } from "@reduxjs/toolkit";

const navbarSlice = createSlice({
  name: "navbar",
  initialState: { selected: "Home" },
  reducers: {
    setSelected(state, action) {
      state.selected = action.payload;
    },
  },
});

export const navbarActions = navbarSlice.actions;
export default navbarSlice;
