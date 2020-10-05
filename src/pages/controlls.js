import { ApolloProvider, gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import client from "../gatsby-theme-apollo/client";

const mutateQuery = gql`
  mutation setBrightness($brightness: Int = 0) {
    setBrightness(topic: "test/1/env", brightness: $brightness) {
      brightness {
        value
      }
    }
  }
`;

const Controlls = () => {
  const [brightness, setBrightness] = useState(0);
  const [mutateBrightness, { data }] = useMutation(mutateQuery);

  return (
    <ApolloProvider client={client}>
      <button
        onClick={() => mutateBrightness({ variables: { brightness: 10 } })}
      >
        ON/OFF
      </button>
      <form
        onSubmit={e => {
          e.preventDefault();
          mutateBrightness({ variables: { brightness: Number(brightness) } });
        }}
      >
        <input
          value={brightness}
          onChange={e => setBrightness(e.target.value)}
          type="number"
          min="0"
          max="255"
        />
        <button>Set Brightness</button>
      </form>
      {/* {console.log(brightness)} */}
    </ApolloProvider>
  );
};

export default Controlls;
