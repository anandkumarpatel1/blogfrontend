import React, { useState } from "react";
import "../styles/UpdatePost.scss";
import { ToastContainer, toast } from "react-toastify";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { UserState } from "../context/UserProvider";

const UpdatePost = ({ updateDia, setUpdateDia, setOption, title, pic, id }) => {
  const [newPic, setNewPic] = useState(pic);
  const [newTitle, setNewTitle] = useState(title);

  const { chn, setChn } = UserState();

  const cutHandler = () => {
    setOption(false);
    setUpdateDia(false);
  };
  const updatePostHandler = async (e) => {
    e.preventDefault();

    try {
      if (!newTitle) {
        toast("Please Provide New Title");
        return;
      }
      if (!newPic) {
        toast("Please Provide New Pic Url");
        return;
      }
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
      const { data } = await axios.put(
        `https://blog-backend-sigma-three.vercel.app/api/v1/post/updatePost/${id}`,
        { title: newTitle, pic: newPic },
        config
      );

      setChn(!chn);
      cutHandler();
    } catch (error) {
      toast(error.response.data.message);
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
      {updateDia && (
        <div className="updatePost">
          <div>
            <RxCross2 onClick={cutHandler} />
          </div>
          <form onSubmit={(e) => updatePostHandler(e)}>
            <input
              type="text"
              placeholder="Enter Image URL Of Post"
              value={newPic}
              onChange={(e) => setNewPic(e.target.value)}
            />
            <textarea
              placeholder="Enter Title Of Post"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            ></textarea>
            <button>Update Post</button>
          </form>
        </div>
      )}
    </>
  );
};

export default UpdatePost;
