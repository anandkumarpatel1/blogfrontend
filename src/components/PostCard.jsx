import React, { useState } from "react";
import "../styles/PostCard.scss";
import { CiMenuKebab } from "react-icons/ci";

const PostCard = ({ item }) => {
  const [option, setOption] = useState(false);

  const optionHandler = () => {
    setOption(!option);
  };
  return (
    <>
      <div className="postCard">
        <div className={`PostOption ${option ? "lar" : "sam"}`}>
          <p>Visit</p>
          <p>Delete</p>
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
