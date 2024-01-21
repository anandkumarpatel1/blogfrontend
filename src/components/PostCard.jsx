import React, { useState } from "react";
import "../styles/PostCard.scss";
import { CiMenuKebab } from "react-icons/ci";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const PostCard = ({ item, chn, setChn }) => {
  const [option, setOption] = useState(false);

  const optionHandler = () => {
    setOption(!option);
  };

  const deleteHandler = async () => {
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
      const { data } = await axios.delete(
        `https://blog-backend-sigma-three.vercel.app/api/v1/post/deletePost/${item._id}`,
        config
      );
      setChn(!chn);
      toast(data?.message);
    } catch (error) {
      toast(error.response.data.message);
      setOption(!option);
    }
  };
  return (
    <>
      <div className="postCard">
        <div className={`PostOption ${option ? "lar" : "sam"}`}>
          <p>Visit</p>
          <p onClick={deleteHandler}>Delete</p>
          <p>Edit</p>
          <p>Share</p>
        </div>
        <div>
          <img src={item?.admin?.pic} alt={item?.admin?.name} />
          <p>{item?.admin?.name}</p>
          <CiMenuKebab onClick={optionHandler} />
        </div>
        <img src={item?.pic} alt={item?.admin?.name} />
        <p>{item?.title}</p>
      </div>
    </>
  );
};

export default PostCard;
