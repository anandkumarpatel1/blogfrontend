import React from "react";
import "../styles/Header.scss";
import { UserState } from "../context/UserProvider";

const Header = () => {
  const { user } = UserState();
  console.log(user)
  return (
    <div className="header">
      {user && (
        <div>
          <div>icon</div>
          <div>name</div>
          <div>
            <img src={user?.user?.pic} alt="" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
