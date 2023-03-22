import React, { useState } from "react";
import "../Home/Home.css";
import NavBar from "./../Navbar/Navbar";
import { QUERY_ME, QUERY_FRIENDS } from "../../utils/queries";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import PostsList from "../Posts/Posts";
import { DELETE_USER } from "../../utils/mutations";
import { AiFillDelete } from "react-icons/ai";
import { NavLink, Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import Auth from "../../utils/auth";
import { FaUserFriends } from "react-icons/fa";

const Profile = (refetch) => {
  const { loading, data } = useQuery(QUERY_ME);
  const [getFriends, { loading2, data2 }] = useLazyQuery(QUERY_FRIENDS);
  const currentUsername = data?.me?.username;
  const [deleteUser] = useMutation(DELETE_USER);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  // Find Current User
  const user = data?.me || {};
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  const handleFriend = async () => {
    try {
      const { data } = await getFriends({
        variables: { username: currentUsername },
      });
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };
  // Delete User
  const handleDelete = async (userId) => {
    try {
      const { data, error } = await deleteUser({
        variables: { userId },
      });

      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <>
      <div className="Home">
        <NavBar />
        <div className="postCard">
          <div className="profiledelete" id="profiledelete">
            <p className="deleteusers">
              {" "}
              Delete Profile{" "}
              <AiFillDelete
                className="DeleteBtn"
                onClick={() => setShowModal(true)}
              />
            </p>
            <p className="friendCount" onClick={() => {setShowModal2(true); handleFriend();}}>
              Friends: {user.friendCount}
              </p>
          </div>
          <PostsList
            posts={user.posted}
            currentUsername={currentUsername}
            showTitle={false}
            showUsername={false}
            refetch={refetch}
          />
        </div>
      </div>
      <Modal show={showModal2} onHide={() => setShowModal2(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Friends</Modal.Title>
        </Modal.Header>

        <Modal.Body>
       {user.friends.map((friend) => (
            <div className="friendCard" key={friend._id}>
              <div className="friendCardInfo">
                <p style={{ fontSize: "2rem"}}>{friend.username}</p>
              </div>
            </div>
          ))}
        </Modal.Body>

        </Modal>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Profile</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Are you sure you want to delete your profile?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => setShowModal(false)} variant="secondary">
            No
          </Button>
          <NavLink as={Link} to="/" onClick={Auth.logout}>
            <Button
              onSubmit={Auth.logout}
              onClick={() => handleDelete(user._id)}
              variant="primary"
            >
              Yes
            </Button>
          </NavLink>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Profile;
