import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { ADD_LIKE, UNLIKE } from "../../utils/mutations";
import { QUERY_POSTS } from "../../utils/queries";
import { useQuery } from "@apollo/client";

const LikeList = ({ postId, myId, post }) => {
  const [likeCount, setLikeCount] = useState("");
  const [liked, setLiked] = useState(false);
  const [addLike] = useMutation(ADD_LIKE);
  const [unLike] = useMutation(UNLIKE);
  const [userLikedPost, setUserLikedPost] = useState("");
  const { data, loading, error, refetch } = useQuery(QUERY_POSTS, {
    variables: { id: postId },
  });
  const likePosts = data?.posts || {};
  console.log(likePosts);

  useEffect(() => {
    const likedByCurrentUser = post?.likedBy?.some((user) => user._id === myId);
    setLiked(likedByCurrentUser);
  }, [post, myId]);

  const handleSubmit = async () => {
    if (!liked) {
      try {
        const { data } = await addLike({
          variables: {
            postId,
            likeCount,
          },
        });
        setLikeCount("");
        setLiked(true);
        refetch();
      } catch (err) {
        console.error(err);
      }
    } else if (liked) {
      try {
        const { data } = await unLike({
          variables: {
            postId,
            likeCount,
          },
        });
        setLikeCount("");
        setLiked(false);
        refetch();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <>
      <FaHeart
        className="likeBtn"
        style={{ color: liked ? "red" : "pink" }}
        onClick={() => handleSubmit()}
      />
    </>
  );
};

export default LikeList;

