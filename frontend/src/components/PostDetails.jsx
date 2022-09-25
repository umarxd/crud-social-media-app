import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { usePostsContext } from "../hooks/usePostsContext";

const PostDetails = ({ post }) => {
  const { user } = useAuthContext();
  const { dispatch } = usePostsContext();

  const deletePost = async (id) => {
    const response = await fetch(`http://localhost:4000/api/posts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_POST", payload: json });
    }
  };

  return (
    <div className="m-3">
      <h3>{post.content}</h3>
      <p>
        Posted by:
        <Link
          className="font-bold text-base border-b-2"
          to={`/user/${post.user.id}`}
        >
          {post.user.name}
        </Link>
      </p>
      <p className="text-sm">
        {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
      </p>
      {user?.id === post.user.id && (
        <button
          onClick={() => deletePost(post._id)}
          className="transition-all ease-in duration-75 bg-slate-800 hover:bg-slate-900 font-bold text-base px-2 py-1 rounded-sm"
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default PostDetails;
