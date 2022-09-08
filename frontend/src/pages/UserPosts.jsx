import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { usePostsContext } from "../hooks/usePostsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import PostDetails from "../components/PostDetails";

const UserPosts = () => {
  const { id } = useParams();
  const { posts, dispatch } = usePostsContext();

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
      {posts?.length ? (
        posts.map((post) => <PostDetails key={post._id} post={post} />)
      ) : (
        <div style={{ marginBlock: 50 }}>
          This user haven't posted anything.
        </div>
      )}
    </div>
  );
};

export default UserPosts;
