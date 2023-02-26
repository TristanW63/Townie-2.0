import React from "react";
import "../Home/Home.css";
import NavBar from "../Navbar/Navbar";
import PostsList from "../Posts/Posts";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { QUERY_LIKED } from "../../utils/queries";

const LikesPage = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(QUERY_LIKED, {
    variables: { username: userParam },
  });

  const user = data?.liked || {};

console.log(user)

  if (loading) {
    return <h2>LOADING...</h2>;
  }
  if(!localStorage.getItem('id_token')) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <div className="Home">
      <NavBar />
      <div
        className="postCard"
      >
        <PostsList
          posts={user.liked}
          title={`${user.username}'s liked posts...`}
        />
      </div>
    </div>
  );
};

export default LikesPage;
