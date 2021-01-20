/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

import React from "react";
import { apolloClient } from "./src/gatsby-theme-apollo/client";
import {  ApolloProvider } from "@apollo/client";

export const wrapRootElement = ({ Root }) => {
  if (!apolloClient) return <h3>Loading...</h3>;
  return (
    <ApolloProvider client={apolloClient}>
      <Root />
    </ApolloProvider>
  );
};
