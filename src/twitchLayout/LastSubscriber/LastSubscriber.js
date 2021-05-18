import React, { useState } from "react";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import Character from "../Character/Character";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 5vh;
  left: 13vw;
`;
const CharacterWrapper = styled.div``;

const InfoWrapper = styled.div`
  font-weight: bold;
  color: white;
  margin: 10px;
  p {
    margin: 0;
    text-shadow: 2px 2px 5px black;
  }
`;

const GET_LAST_SUBSCRIBER = gql`
  {
    lastSub {
      name
      count
    }
  }
`;

const LastSubscriber = () => {
  const { loading, __, data } = useQuery(GET_LAST_SUBSCRIBER);

  return (
    <Wrapper>
      <InfoWrapper>
        <p>Ostatni Sub:</p>
        <p>Subów: {data?.lastSub.count - 1}/15</p>
      </InfoWrapper>
      {!loading ? (
        <Character sub={true} color="#ff9e00" name={data.lastSub.name} />
      ) : (
        <p>Ludzie! przecież tu nikogo nie ma!</p>
      )}
    </Wrapper>
  );
};

export default LastSubscriber;
