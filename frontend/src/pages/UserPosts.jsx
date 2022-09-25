import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { usePostsContext } from "../hooks/usePostsContext";
import PostDetails from "../components/PostDetails";

const UserPosts = () => {
  const { id } = useParams();
  const { posts, dispatch } = usePostsContext();

  const [parent] = useAutoAnimate();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/posts/user/${id}`);
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_POSTS", payload: json });
      }
    };
    fetchPosts();
  }, [dispatch, id]);

  return (
    <div ref={parent}>
      {posts && <div className="text-2xl font-bold">{posts[0]?.user.name}</div>}
      {posts?.length ? (
        posts.map((post) => <PostDetails key={post._id} post={post} />)
      ) : (
        <div>This user haven't posted anything.</div>
      )}
    </div>
  );
};

export default UserPosts;
