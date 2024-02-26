import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import dropdownReducer from "./features/dropdownSlice";
import { authApi } from "./features/authApi";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    dropdown: dropdownReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware:any) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
