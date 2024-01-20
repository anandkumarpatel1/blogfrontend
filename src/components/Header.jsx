import React from "react";
import {useNavigate} from 'react-router-dom'
import "../styles/Header.scss";
import { UserState } from "../context/UserProvider";

const Header = () => {
  const { user } = UserState();
  const navigate = useNavigate()

  return (
    <div className="header">
      {user && (
        <div>
          <div>icon</div>
          <div>name</div>
          <div>
            <img src={user?.user?.pic} alt={user?.user?.name} onClick={() => navigate('/me')}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
