import { NavBar, Image } from "antd-mobile";
import { useNavigate } from "react-router";
import "./header.css";
import LogoutIcon from "./logout-icon";
import { signOutUser } from "../utils/firebase/firebase.utils";

export const Header = ({ navigation = -1 }) => {
  const navigate = useNavigate();
  return (
    <NavBar
      style={{
        marginTop: "10px",
        marginBottom: "10px",
        position: "relative"
      }}
      onBack={() => navigate(navigation)}
      backArrow={navigation !== null}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "white"
        }}
      >
        <Image width={110} src="./aquilalogo.png"></Image>
        <LogoutIcon
          style={{ position: "absolute", bottom: 10, right: 10 }}
          onClick={signOutUser}
        />
      </div>
    </NavBar>
  );
};
