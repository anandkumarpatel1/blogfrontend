import React from "react";
import '../styles/Profile.scss'
import { UserState } from "../context/UserProvider";

const Profile = () => {
  const { user } = UserState();
  return (
    <div className="profile">
      <div>
        <img src={user?.user?.pic} alt={user?.user?.name} />
      </div>
      <div>
        <div>
          <p>Name</p>
          <p>Email</p>
          <p>Posts</p>
        </div>
        <div>
          <p>: {user?.user?.name}</p>
          <p>: {user?.user?.email}</p>
          <p>: {user?.user?.posts.length}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
