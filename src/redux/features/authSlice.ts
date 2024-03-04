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
      console.log("Login? ", state.isLoggedIn);
      localStorage.setItem("userData", JSON.stringify(action.payload));
    },
    logoutSuccess(state) {
      state.isLoggedIn = false;
      state.userData = null;
      localStorage.removeItem("userData");
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;

export default authSlice.reducer;
