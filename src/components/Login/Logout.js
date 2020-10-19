import { gql, useMutation } from "@apollo/client";
import React from "react";

const Logout = () => {
  const mutateQueryLogout = gql`
    mutation {
      invalidateTokens
    }
  `;

  const [mutateLogout] = useMutation(mutateQueryLogout);
  return (
    <button
      onClick={() => {
        document.location.reload();
        mutateLogout();
      }}
    >
      LogOut
    </button>
  );
};

export default Logout;
