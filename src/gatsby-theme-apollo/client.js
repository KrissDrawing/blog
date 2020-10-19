// src/gatsby-theme-apollo/client.js
import fetch from "isomorphic-fetch";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:4000/graphql",
  credentials: "include",
  // headers: {
  //   "Access-Control-Allow-Credentials": "true",
  //   "Access-Control-Allow-Origin": "http://localhost:4000/graphql",
  // },
});

export default client;
