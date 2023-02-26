import React, { useState } from "react";
import "./Navbar.css";
import { Navbar, Nav, NavLink, Modal, Form, Button } from "react-bootstrap";
import { AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { BiMessageSquareAdd, BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FcLike } from "react-icons/fc";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import Logo from "../../img/townhouse64.png";
import { useMutation } from "@apollo/client";

import { ADD_POST } from "../../utils/mutations";
import { QUERY_POSTS, QUERY_USER } from "../../utils/queries";

import auth from "../../utils/auth";

function NavBar() {
  const [showModal, setShowModal] = useState(false);
  const [postText, setPostText] = useState("");

  const [addPost] = useMutation(ADD_POST, {
    update(cache, { data: { addPost } }) {
      try {
        const { posts } = cache.readQuery({ query: QUERY_POSTS }) || {};

        cache.writeQuery({
          query: QUERY_POSTS,
          data: { posts: posts ? [addPost, ...posts] : [addPost] },
        });
        window.location.reload();
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { user } = cache.readQuery({ query: QUERY_USER }) || {};
      cache.writeQuery({
        query: QUERY_USER,
        data: { user: { ...user, posts: [...user.posts, addPost] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addPost({
        variables: {
          postText,
          postAuthor: auth.getProfile().data.username,
        },
      });

      console.log(data);

      setPostText("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "postText" && value.length <= 280) {
      setPostText(value);
    }
  };

  return (
    <>
      <Navbar className="sidebar">
        <div className="bottombar">
          <Nav className="smallScreen">
            <p className="nav-logo">The Townies</p>
            <img className="logoIcon" src={Logo} alt="logoIcon" />
            <Nav.Item>
              <NavLink to="/home" as={Link}>
                <AiFillHome
                  style={{ marginBottom: "3px", marginRight: "3px" }}
                  className="navIcons"
                />{" "}
                <span className="navtext">Home</span>
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink as={Link} to="/Search">  
                <AiOutlineSearch
                  style={{ marginBottom: "3px", marginRight: "3px" }}
                  className="navIcons"
                />{" "}
                <span className="navtext">Search</span>
              </NavLink>
            </Nav.Item>
            <Nav.Item>
            {Auth.loggedIn() ? (
              <>
              <NavLink as={Link} to='/likes'>
                <FcLike
                  style={{ marginBottom: "2px", marginRight: "3px" }}
                  className="navIcons"
                />{" "}
                <span className="navtext">Likes</span>
              </NavLink>
              </>
            ) : (
              <></>
            )}
            </Nav.Item>
            <Nav.Item>
              <NavLink onClick={() => setShowModal(true)}>
                <BiMessageSquareAdd
                  style={{ marginBottom: "2px", marginRight: "3px" }}
                  className="navIcons"
                />{" "}
                <span className="navtext">Create Post</span>
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              {Auth.loggedIn() ? (
                <>
                  <NavLink as={Link} to="/profile">
                    <CgProfile
                      style={{ marginBottom: "2px", marginRight: "3px" }}
                      className="navIcons"
                    />{" "}
                    <span className="navtext">Profile</span>
                  </NavLink>
                </>
              ) : (
                <></>
              )}
            </Nav.Item>
            <Nav.Item>
              <NavLink
                as={Link}
                to="/"
                onClick={Auth.logout}
                className="logout"
              >
                <BiLogOut
                  style={{ marginBottom: "2px", marginRight: "3px" }}
                />{" "}
                <span className="navtext">Logout</span>
              </NavLink>
            </Nav.Item>
          </Nav>
        </div>
      </Navbar>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="signup-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ marginLeft: "35%", fontWeight: "600" }}>
            Create Post
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {auth.loggedIn() ? (
            <>
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
            </>
          ) : (
            <p></p>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NavBar;
