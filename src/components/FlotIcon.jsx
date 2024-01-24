import React, { useState } from "react";
import "../styles/FloatIcon.scss";
import { FaPlus } from "react-icons/fa6";
import { UserState } from "../context/UserProvider";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { RxCross2 } from "react-icons/rx";
import Loader from "./Loader";

const FlotIcon = () => {
  const { chn, setChn } = UserState();

  const [dialog, setDialog] = useState(false);
  const [title, setTitle] = useState("");
  const [pic, setPic] = useState("");
  const [loading, setLoading] = useState(false);

  const postIconHandler = async () => {};

  const createPostHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
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

      const { data } = await axios.post(
        "https://blog-backend-sigma-three.vercel.app/api/v1/post/createpost",
        { title, pic },
        config
      );
      setChn(!chn);
      setPic("");
      setTitle("");
      setLoading(false);
      setDialog(false);
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
      {loading ? (
        <div
          style={{
            width: "100%",
            height: "100vh",
            position: "fixed",
            background: "rgba(255, 255, 255, 0.6)",
            zIndex: "15",
          }}
        >
          <Loader />
        </div>
      ) : (
        <>
          {localStorage.getItem("user-token") && (
            <>
              <div className="floaticon" onClick={() => setDialog(true)}>
                <FaPlus onClick={postIconHandler} />
              </div>
              {dialog && (
                <div className="floatDialog">
                  <div>
                    <RxCross2 size={30} onClick={() => setDialog(false)} />
                  </div>
                  <form onSubmit={(e) => createPostHandler(e)}>
                    <input
                      type="text"
                      placeholder="Enter Image URL Of Post"
                      value={pic}
                      onChange={(e) => setPic(e.target.value)}
                    />
                    <textarea
                      placeholder="Enter Title Of Post"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    ></textarea>
                    <button>Create Post</button>
                  </form>
                </div>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default FlotIcon;
