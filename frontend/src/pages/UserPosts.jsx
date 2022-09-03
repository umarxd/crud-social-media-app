import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { usePostsContext } from "../hooks/usePostsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import PostDetails from "../components/PostDetails";

const UserPosts = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const { posts, dispatch } = usePostsContext();

  //animation
  const [parent] = useAutoAnimate();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(
        `http://localhost:4000/api/posts/user/${id}`
      );
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_POSTS", payload: json });
      }
    };
    fetchPosts();
  }, [dispatch, id]);

  return (
    <div ref={parent} className="posts">
      {posts && <h1>{posts[0]?.user.name}</h1>}
      {posts
        ? posts.map((post) => <PostDetails key={post._id} post={post} />)
        : "asd"}
    </div>
  );
};

export default UserPosts;
