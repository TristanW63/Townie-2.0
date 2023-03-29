import React from "react";
import "./App.css";
import Login from "./components/Login/Reg/Login";
import Home from "./components/Home/Home";
import Profile from "../src/components/Profile/Profile";
import LikesPage from "./components/LikePage/LikePage";
import UserProfile from "./components/Profile/UserProfile";
import Search from "./components/Search/SearchBar";
import { Register } from "./components/Login/Reg/Register";
import { useContext } from "react";
import { UserContext, UserContextProvider } from "./utils/UserContext";
import {
  createHttpLink,
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//this needs to be changed to the deployed link when deployed to heroku or netlify "http://localhost:3001/graphql"
const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
});

//this is the token that is used to authenticate the user
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/likes" element={<LikesPage />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/UserProfile/:userId" element={<UserProfile />} />
        </Routes>
        </UserContextProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
