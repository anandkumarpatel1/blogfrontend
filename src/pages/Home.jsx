import React, { useContext } from "react";
import { UserState } from "../context/UserProvider";
import Loader from "../components/Loader";

const Home = () => {
  const { user } = UserState()
  
  return <div><Loader /></div>;
};

export default Home;
