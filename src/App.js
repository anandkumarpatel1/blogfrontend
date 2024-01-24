import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Header from "./components/Header";
import { UserProvider } from "./context/UserProvider";
import Profile from "./pages/Profile";
import FlotIcon from "./components/FlotIcon";
import { Analytics } from "@vercel/analytics/react";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <Header />
          <FlotIcon />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/me" element={<Profile />} />
      <Analytics />

          </Routes>
        </UserProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
