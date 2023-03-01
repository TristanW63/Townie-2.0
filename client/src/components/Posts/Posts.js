import React, { useState } from "react";
import "./Post.css";
import { Form, Modal, Button } from "react-bootstrap";
import CommentList from "../Comment/Comment";
import LikeList from "../Likes/Likes";
import CommentForm from "../Comment/CommentForm";
import { useMutation, useQuery } from "@apollo/client";
import { AiFillDelete } from "react-icons/ai"
import { FiEdit } from "react-icons/fi"
import { UPDATE_POST } from "../../utils/mutations";
import { DELETE_POST } from "../../utils/mutations";
import AddFriend from "../Friends/AddFriend";

const PostsList = ({ posts, refetch, currentUsername }) => {
  const [showModal, setShowModal] = useState(false);
  const [postText, setPostText] = useState("");
  const [postId, setPostId] = useState("");
  const [deletePost] = useMutation(DELETE_POST);
  const [updatePost] = useMutation(UPDATE_POST);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data, error } = await updatePost({
        variables: {
          postId: postId,
          postText: postText,
        },
      });

      setPostText("");
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "postText") {
      setPostText(value);
    }
  };

  const handleDelete = async (postId) => {
    try {
      const { data, error } = await deletePost({
        variables: { postId },
      });

      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  if (!posts.length) {
    return (
      <div className="parent">
        <div style={{ fontSize: "6rem" }}> NO POSTS YET</div>
      </div>
    );
  }

  return (
    <>
      <div className="postCard">
        {posts &&
          posts.map((post) => (
            <div key={post._id} className="card">
              {/* <p className="author">{post.postAuthor}</p> */}
              <span className="author">
              <AddFriend username={post.postAuthor} />
              </span>
              <span className="date">{post.createdAt}</span>
              <p style={{ paddingLeft: "4%", paddingTop: "2%" }}>
                {post.postText}
              </p>
              <div style={{ paddingLeft: "2%" }}>
                <CommentForm postId={post._id} refetch={refetch} />
              </div>
              <p>
                <span style={{ marginRight: "3%", paddingLeft: "3%" }}>
                  <LikeList postId={post._id} refetch={refetch} />{" "}
                  {post.likeCount}
                </span>
                <CommentList comments={post.comments} /> {post.commentCount}
              </p>
              {post.postAuthor === currentUsername && (
                <>
                  <FiEdit
                  className="edit"
                    onClick={() => {
                      setShowModal(true);
                      setPostId(post._id);
                    }}
                  
                    Update
                  />
                  <AiFillDelete className="delete" onClick={() => handleDelete(post._id)} />
                </>
              )}
            </div>
          ))}
      </div>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="signup-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ marginLeft: "35%", fontWeight: "600" }}>
            Update Post
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                as="textarea"
                name="postText"
                onChange={handleChange}
                value={postText}
              />
            </Form.Group>
            <Button
              id="post-btn"
              variant="primary"
              type="submit"
              onClick={() => setShowModal(false)}
            >
              Post
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default PostsList;
// likes={post.likes}
