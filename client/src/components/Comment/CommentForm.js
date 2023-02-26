import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../../utils/mutations";
import { QUERY_POSTS } from "../../utils/queries";
import auth from "../../utils/auth";

const CommentForm = ({ postId }) => {
  const { data, loading, error, refetch } = useQuery(QUERY_POSTS, {
    variables: { id: postId },
  });

  const [commentText, setCommentText] = useState("");

  const [addcomment] = useMutation(ADD_COMMENT);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await addcomment({
        variables: {
          postId,
          commentText,
          commentAuthor: auth.getProfile().data.username,
        },
      });
      setCommentText("");
      console.log(data);
      refetch();
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "commentText") {
      setCommentText(value);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        className="smallComment"
        placeholder="addComment"
        name="commentText"
        value={commentText}
        onChange={handleChange}
        type="text"
      ></input>
    </form>
  );
};

export default CommentForm;
