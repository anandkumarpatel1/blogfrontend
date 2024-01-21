import React, { useEffect, useState } from "react";
import "../styles/Profile.scss";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Loader from "../components/Loader";
import { UserState } from "../context/UserProvider";

const Profile = () => {
  const {user, setUser} = UserState()
  const [loading, setLoading] = useState("");
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      setLoading(true);
      let token = localStorage.getItem("user-token");
      token = await JSON.parse(token);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
        sameSite: "None",
      };
      const { data } = await axios.get(
        "https://blog-backend-sigma-three.vercel.app/api/v1/user/me",
        config
      );
      setUser(data?.user);
      let user = await JSON.stringify(data?.user);
      localStorage.setItem("user", user);
      setLoading(false);
    } catch (error) {
      toast(error.response.data.message);
      setLoading(false);
    }
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <ToastContainer />
      <div className="profile">
        {loading ? (
          <Loader />
        ) : (
          <>
            <div>
              <img src={user?.pic} alt={user?.name} />
            </div>
            <div>
              <div>
                <p>Name</p>
                <p>Email</p>
                <p>Posts</p>
              </div>
              <div>
                <p>: {user?.name}</p>
                <p>: {user?.email}</p>
                <p>: {user?.posts?.length}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Profile;
