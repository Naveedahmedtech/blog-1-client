import PasswordForm from "./components/PasswordForm";
import UsernameForm from "./components/UsernameForm";

const Profile = () => {
  return (
    <div>
      <h2>Profile Management</h2>
      <UsernameForm />
      <PasswordForm />
    </div>
  );
};

export default Profile;
