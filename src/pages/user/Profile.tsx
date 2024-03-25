import { Typography } from "@mui/material";
import PasswordForm from "./components/PasswordForm";
import UsernameForm from "./components/UsernameForm";

const Profile = () => {
  return (
    <div>
      <Typography variant="h4">Profile Management</Typography>
      <UsernameForm />
      <PasswordForm />
    </div>
  );
};

export default Profile;
