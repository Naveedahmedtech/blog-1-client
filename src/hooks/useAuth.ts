import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../redux/store";
import { loginSuccess, logoutSuccess } from "../redux/features/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, userData } = useSelector(
    (state:any) => state.auth
  );

  const login = (userData: any) => {
    // Replace 'any' with your User data type
    dispatch(loginSuccess(userData));
  };

  const logout = () => {
    dispatch(logoutSuccess());
  };

  return { isLoggedIn, userData, login, logout };
};
