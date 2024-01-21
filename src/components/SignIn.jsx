import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Loader from "./Loader";
import { UserState } from "../context/UserProvider";

const SignInForm = ({ type, setType }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setUser, user, token, setToken } = UserState();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });

  const handleOnSubmit = async (evt) => {
    try {
      setLoading(true);
      evt.preventDefault();

      if (!email) {
        setLoading(false);
        toast("Please Enter Your Email");
        return;
      }

      if (!password) {
        setLoading(false);
        toast("Please Enter your password");
        return;
      }

      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        sameSite: "None",
      };
      const { data } = await axios.post(
        "https://blog-backend-sigma-three.vercel.app/api/v1/user/login",
        { email, password },
        config
      );

      if (data?.user) {
        setUser(data?.user);
        setToken(data?.token)
        let user = await JSON.stringify(data?.user);
        let token = await JSON.stringify(data?.token);
        localStorage.setItem("user", user);
        localStorage.setItem("user-token", token);
        navigate("/");
        setLoading(false);
      }
    } catch (error) {
      toast(error?.response?.data?.message);
      setLoading(false);
      return;
    }
  };

  return (
    <div className="form-container sign-in-container">
      {loading ? (
        <Loader />
      ) : (
        <>
          {" "}
          <form onSubmit={handleOnSubmit}>
            <h1>Sign in</h1>

            <span>or use your account</span>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <a href="#">Forgot your password?</a>
            <button>Sign In</button>
            <div>
              <p style={{cursor: 'pointer'}} onClick={() => setType("signUp")}>Sign Up</p>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default SignInForm;
