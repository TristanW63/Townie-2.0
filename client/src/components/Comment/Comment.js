import React, { useState } from "react";
import { FaRegComment } from "react-icons/fa";

const CommentList = ({ comments = [], refetch }) => {
  const [commentsVisible, setCommentsVisible] = useState(false);
  return (
    <>
      <>
        <FaRegComment
          style={{ color: commentsVisible ? "red" : "black" }}
          onClick={() => setCommentsVisible(!commentsVisible)}
          refetch={refetch}
        />
      </>
      {commentsVisible && (
        <>
          {comments.map((comment) => (
            <section className="comments" key={comment._id}>
              <hr style={{ color: "black" }} />
              <p>
                {comment.commentAuthor}
                <span className="commentDate">{comment.createdAt}</span>
              </p>
              <p>{comment.commentText}</p>
            </section>
          ))}
        </>
      )}
    </>
  );
};

export default CommentList;
