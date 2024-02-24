// src/store/dropdownSlice.js
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const dropdownSlice = createSlice({
  name: "dropdown",
  initialState: {
    openDropdownIndex: null,
  },
  reducers: {
    toggleDropdown: (state, action: PayloadAction<any>) => {
      state.openDropdownIndex =
        state.openDropdownIndex === action.payload ? null : action.payload;
    },
  },
});

export const { toggleDropdown } = dropdownSlice.actions;

export default dropdownSlice.reducer;
