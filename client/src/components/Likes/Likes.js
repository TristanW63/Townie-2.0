import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { ADD_LIKE, UNLIKE } from "../../utils/mutations";
import { QUERY_POSTS } from "../../utils/queries";
import { useQuery } from "@apollo/client";

const LikeList = ({ postId }) => {
  const [likeCount, setLikeCount] = useState("");
  const [liked, setLiked] = useState(false);
  const [addLike] = useMutation(ADD_LIKE);
  const [unLike] = useMutation(UNLIKE);
  const [userLikedPost, setUserLikedPost] = useState("");
  const [userUnlikedPost, setUserUnlikedPost] = useState("");
  const { data, loading, error, refetch } = useQuery(QUERY_POSTS, {
    variables: { id: postId },
  });

  
  useEffect(() => {
    const liked = localStorage.getItem(`post-${postId}-liked`);
    if (liked === 'true') {
      setUserLikedPost(true);
    }
  }, []);

  const handleSubmit = async () => {
    if(!userLikedPost) {
    try {
      const { data } = await addLike({
        variables: {
          postId,
          likeCount
        },
      });

      setLikeCount("");
      setUserLikedPost(true);
      localStorage.setItem(`post-${postId}-liked`, true);
      refetch();
    } catch (err) {
      console.error(err);
    }
  } else if (userLikedPost === true && !userUnlikedPost) {
    if (userUnlikedPost) {
      return;
    }
    try {
      const { data } = await unLike({
        variables: {
          postId,
          likeCount
        },
      });
      setLikeCount("");
      setUserLikedPost(false);
      localStorage.removeItem(`post-${postId}-liked`);
      setUserUnlikedPost(true);
      refetch();
    } catch (err) {
      console.error(err);
    }
  }
};

  return (
    <>
    <FaHeart className="likeBtn" style={{ color: userLikedPost ? 'red' : 'pink' }} 
    onClick={() => handleSubmit() }/>
    </>
  );
};

export default LikeList;
