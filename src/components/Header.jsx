import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Header.scss";
import { UserState } from "../context/UserProvider";

const Header = () => {
  const [option, setOption] = useState(false);
  const { user } = UserState();
  const navigate = useNavigate();

  const profileHandler = () => {
    setOption(!option);
  };

  const LogoutHandler = () => {
    localStorage.clear('user');
    window.location.reload()
  };

  return (
    <div className="header">
      {user && (
        <div>
          <div>icon</div>
          <div>
            <p onClick={() => navigate("/")}>AnDs Blog</p>
          </div>
          <div>
            <img
              src={user?.user?.pic}
              alt={user?.user?.name}
              onClick={profileHandler}
            />
            <div>
              <div className={`HeaderOption ${option ? "lar" : "sam"}`}>
                <p
                  onClick={() => {
                    navigate("/me");
                  }}
                >
                  Profile
                </p>
                <p onClick={LogoutHandler}>Logout</p>
                <p
                  onClick={() => {
                    navigate("/contact");
                  }}
                >
                  Contact Us
                </p>
                <p
                  onClick={() => {
                    navigate("/dev");
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
