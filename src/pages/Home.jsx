import React, { useContext } from "react";
import { UserState } from "../context/UserProvider";
import Loader from "../components/Loader";
import '../styles/Home.scss'
import PostCard from "../components/PostCard";

const Home = () => {
  const { user } = UserState();

  return (
    <div className="home">
      
      <div><PostCard /></div>
      <div>d</div>
    </div>
  );
};

export default Home;
