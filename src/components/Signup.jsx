import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { UserState } from "../context/UserProvider";

function SignUpForm({ type, setType }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);

  const { setUser, user, token, setToken } = UserState();
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem('user-token')
    if (token) {
      navigate("/");
    }
  });

  const handleOnSubmit = async (evt) => {
    try {
      evt.preventDefault();
      setLoader(true);
      if (!name) {
        return toast("Please Enter Name");
      }
      if (!email) {
        return toast("Please Enter Email");
      }
      if (!password) {
        return toast("Please Enter password");
      }

      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        sameSite: "None",
      };

      const { data } = await axios.post(
        "https://blog-backend-sigma-three.vercel.app/api/v1/user/register",
        { name, email, password },
        config
      );

      if (data?.user) {
        setUser(data?.user);
        setToken(data?.token)
        let user = await JSON.stringify(data?.user);
        let token = await JSON.stringify(data?.token)
        localStorage.setItem("user", user);
        localStorage.setItem("user-token", token);
        navigate("/");
        setLoader(false);
      }
    } catch (error) {
      toast(error.response.data.message);
      setLoader(false);
      return;
    }
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Create Account</h1>

        <span>or use your email for registration</span>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button>Sign Up</button>
        <div>
          <p style={{ cursor: "pointer" }} onClick={() => setType("signIn")}>
            Sign In
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
