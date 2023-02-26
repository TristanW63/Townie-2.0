import React from "react";
import "./Home.css";
import NavBar from "./../Navbar/Navbar";
import { QUERY_POSTS } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import PostsList from "../Posts/Posts";
import WeatherCard from "../Weather/Weather";

const Home = () => {
  const { data: postsData, refetch } = useQuery(QUERY_POSTS);

  const posts = postsData?.posts || {};

  return (
    <div className="Home">
      <NavBar />
      <div className="postCard">
        <PostsList
          posts={posts}
          title="some feed for posts"
          refetch={refetch}
        />
        <WeatherCard />
      </div>
    </div>
  );
};

export default Home;
