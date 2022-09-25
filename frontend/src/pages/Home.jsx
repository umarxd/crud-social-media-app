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
            className="w-3/5 h-8 mt-4 text-black self-center form-control block px-3 py-1.5 text-base font-normal border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-slate-800 focus:outline-none"
            placeholder="256 characters is the max."
          />
          <button
            onClick={() => createPost(postInput)}
            className="w-max mx-auto my-3 transition-all ease-in duration-75 bg-slate-800 hover:bg-slate-900 font-bold text-base px-2 py-1 rounded-sm"
          >
            Create a Post
          </button>
        </div>
      )}

      {message && <div>{message}</div>}
      <div ref={parent}>
        {posts &&
          posts.map((post) => <PostDetails key={post._id} post={post} />)}
      </div>
    </div>
  );
};

export default Home;
