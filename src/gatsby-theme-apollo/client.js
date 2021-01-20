import { ApolloClient, split, HttpLink, InMemoryCache } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import fetch from "isomorphic-fetch";
import { WebSocketLink } from "@apollo/client/link/ws";

const wsLink = process.browser
  ? new WebSocketLink({
      uri: `ws://localhost:3000/graphql`,
      options: {
        reconnect: true,
      },
    })
  : null;

const httpLink = new HttpLink({
  fetch,
  uri: "http://localhost:3000/graphql",
});

const splitLink = process.browser
  ? split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        );
      },
      wsLink,
      httpLink
    )
  : null;

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
  credentials: "include",
  // headers: {
  //   "Access-Control-Allow-Credentials": "true",
  //   "Access-Control-Allow-Origin": "http://localhost:4000/graphql",
  // },
});

export default apolloClient;
