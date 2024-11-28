import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "~/Components/AuthProvider/AuthProvider";
import * as logoutService from "~/service/logOutService";

function Profile(props) {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    const tokenString = localStorage.getItem("tokens");
    let tokens = {};

    try {
      if (tokenString) {
        tokens = JSON.parse(tokenString);
      } else {
        console.error("Không tìm thấy tokens trong localStorage");
      }
    } catch (error) {
      console.error("Đữ liệu trong localStorage không hợp lệ:", error);
    }
    if (tokens && tokens.refreshToken) {
      logoutService.logOutFromServer(tokens.refreshToken);
    }
    logOut();
    localStorage.removeItem("selectedLocation");
    localStorage.removeItem("tokens");
    localStorage.removeItem("userId");
    localStorage.removeItem("getDay");
    localStorage.removeItem("selectedTicketType");
    navigate("/menulogin");
  };

  return (
    <div>
      Profile
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
}

export default Profile;
