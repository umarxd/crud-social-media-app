import { useState, useEffect } from "react";
import PostDetails from "../components/PostDetails";
import { useAuthContext } from "../hooks/useAuthContext";
import { usePostsContext } from "../hooks/usePostsContext";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const Home = () => {
  const { user } = useAuthContext();
  const { posts, dispatch } = usePostsContext();
  const [postInput, setPostInput] = useState("");
  const [message, setMessage] = useState("");

  //animation
  const [parent] = useAutoAnimate();

  const createPost = async (content) => {
    if (postInput) {
      setMessage("");
      const response = await fetch("http://localhost:4000/api/posts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
        },
        body: JSON.stringify({ content: postInput }),
      });
      const json = await response.json();
      if (!response.ok) {
        setMessage(json.error);
      }
      if (response.ok) {
        dispatch({ type: "CREATE_POST", payload: json });
        setMessage("Successful");
        setPostInput("");
      }
    } else setMessage("It can't be blank.");
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("http://localhost:4000/api/posts");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_POSTS", payload: json });
      }
    };
    setMessage("");
    fetchPosts();
  }, [dispatch, user]);

  return (
    <div className="home">
      {user && (
        <>
          <button onClick={() => createPost(postInput)} className="post-button">
            Create a post
          </button>
          <textarea
            value={postInput}
            onChange={(e) => setPostInput(e.target.value)}
            className="createPostInput"
            placeholder="256 characters is the max."
          />
        </>
      )}

      {message && <div className="error">{message}</div>}
      <div ref={parent} className="posts">
        {posts &&
          posts.map((post) => <PostDetails key={post._id} post={post} />)}
      </div>
    </div>
  );
};

export default Home;
