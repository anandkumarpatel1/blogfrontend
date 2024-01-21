import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../components/Loader";
import "../styles/Home.scss";
import PostCard from "../components/PostCard";
import { UserState } from "../context/UserProvider";
import axios from "axios";

const Home = () => {
  const { user } = UserState();

  const [posts, setPosts] = useState();
  const [pic, setPic] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      let token = localStorage.getItem("user");
      token = await JSON.parse(token);
      token = token?.token;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
        sameSite: "None",
      };
      const { data } = await axios.get("https://blog-backend-sigma-three.vercel.app/api/v1/post/allposts", config);

      setPosts(data?.posts);
      setLoading(false);
    } catch (error) {
      toast(error.response.data.message);
      setLoading(false);
    }
  };

  const createPostHandler = async (e) => {
    e.preventDefault();

    try {
      let token = localStorage.getItem("user");
      token = await JSON.parse(token);
      token = token?.token;
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

      fetchPosts()
      setPic("")
      setTitle("")
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
      <div className="home">
        {loading ? (
          <Loader />
        ) : (
          <>
            <div>
              {posts?.map((item, index) => (
                <PostCard key={index} item={item} />
              ))}
            </div>
          </>
        )}

        <div>
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
      </div>
    </>
  );
};

export default Home;
