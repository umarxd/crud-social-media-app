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
    <div>
      {user && (
        <div className="flex flex-col">
          <input
            value={postInput}
            onChange={(e) => setPostInput(e.target.value)}
            className="w-3/5 h-8 mt-4 p-6  text-black self-center"
            placeholder="256 characters is the max."
          />
          <button
            onClick={() => createPost(postInput)}
            className="self-center inline-flex items-center justify-center p-0.5 my-2 text-sm font-medium rounded-sm group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white"
          >
            <span className="p-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 group-hover:bg-opacity-0">
              Create a Post
            </span>
          </button>
        </div>
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
