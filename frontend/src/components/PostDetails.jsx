import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { usePostsContext } from "../hooks/usePostsContext";

const PostDetails = ({ post }) => {
  const { user } = useAuthContext();
  const { dispatch } = usePostsContext();

  const deletePost = async (id) => {
    const response = await fetch(`/api/posts/${id}`, {
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
    <div className="post-details">
      <h3>{post.content}</h3>
      <p>
        Posted by:
        <Link className="userLink" to={`/user/${post.user.id}`}>
          {post.user.name}
        </Link>
      </p>
      <p>
        {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
      </p>
      {user?.id === post.user.id && (
        <button onClick={() => deletePost(post._id)} className="deleteButton">
          Delete
        </button>
      )}
    </div>
  );
};

export default PostDetails;
