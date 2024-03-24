import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const userDataFromStorage = localStorage.getItem("userData");

interface AuthState {
  isLoggedIn: boolean;
  userData: any;
}

const initialState: AuthState = {
  isLoggedIn: !!userDataFromStorage,
  userData: userDataFromStorage ? JSON.parse(userDataFromStorage) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<any>) {
      state.isLoggedIn = true;
      state.userData = action.payload;
      localStorage.setItem("userData", JSON.stringify(action.payload));
    },
    logoutSuccess(state) {
      state.isLoggedIn = false;
      state.userData = null;
      localStorage.removeItem("userData");
    },
    // Reducer to update user token or any part of user data
    updateUserData(state, action: PayloadAction<any>) {
      state.userData = action.payload;
      localStorage.setItem("userData", JSON.stringify(action.payload));
    },
  },
});

export const { loginSuccess, logoutSuccess, updateUserData } =
  authSlice.actions;

export default authSlice.reducer;
