import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Header.scss";
import { UserState } from "../context/UserProvider";
import logo from '../styles/logo.png'

const Header = () => {
  const [option, setOption] = useState(false);
  const { user } = UserState();
  const navigate = useNavigate();

  const profileHandler = () => {
    setOption(!option);
  };

  const LogoutHandler = () => {
    localStorage.clear("user");
    window.location.reload();
  };

  return (
    <div className="header">
      { localStorage.getItem('user-token') && (
        <div>
          <div>
            <img src={logo} alt="logo" />
          </div>
          <div>
            <p onClick={() => navigate("/")}>AnDs Blog</p>
          </div>
          <div>
            <img
              src={user?.pic}
              alt={user?.name}
              onClick={profileHandler}
            />
            <div>
              <div className={`HeaderOption ${option ? "lar" : "sam"}`}>
                <p
                  onClick={() => {
                    navigate("/me")
                    setOption(!option)
                  }}
                >
                  Profile
                </p>
                <p onClick={LogoutHandler}>Logout</p>
                <p
                  onClick={() => {
                    navigate("/contact");
                    setOption(!option)
                  }}
                >
                  Contact Us
                </p>
                <p
                  onClick={() => {
                    navigate("/dev")
                    setOption(!option)
                  }}
                >
                  Developer
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
