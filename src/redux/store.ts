import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import dropdownReducer from "./features/dropdownSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dropdown: dropdownReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
