import React, { useState } from "react";
import { QUERY_USERS } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import NavBar from "../Navbar/Navbar";
import PostList from "../Posts/Posts"
import "./SearchBar.css";
import "../Posts/Post.css";

const SearchPage = () => {
  const { username: userParam } = useParams();
  const [userSearch, setUserSearch] = useState("");

  const { data, refetch } = useQuery(QUERY_USERS, {
    variables: { username: userParam },
  });

  const users = data?.users || {};

  const [matchedUser, setMatchedUser] = useState(null);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    setUserSearch("");

    const userArray = Object.values(users);

    let isFound = false;
    for (let i = 0; i < users.length; i++) {
      if (userSearch === userArray[i].username) {
        setMatchedUser(userArray[i]);
        console.log("ladies and dudes we found " + userSearch);
        isFound = true;
        break;
      }
    }
    if(!isFound) console.log("no match my man")
  };
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "UserSearch") {
      setUserSearch(value);
    }
  };
  
  return (
    <div className="Home">
      <NavBar />
      <div className="searchCard">
      <Form className="SearchBarPosition" onSubmit={handleFormSubmit}>
          <Form.Control
          className="Search"
            type="text"
            name="UserSearch"
            placeholder="Search..."
            onChange={handleChange}
            value={userSearch}
          />
      </Form>
      { matchedUser && <PostList posts={matchedUser.posted} refetch={refetch} /> } 

      </div>
      </div>
  );
};

export default SearchPage;
