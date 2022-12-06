import EditProfile from "../components/edit-profile.component";
import { Header } from "../components/Header";

const Profile = () => {
  return (
    <>
      <Header />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <EditProfile />
      </div>
    </>
  );
};

export default Profile;
