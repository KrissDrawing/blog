import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { gql, useSubscription } from "@apollo/client";
import Character from "../Character/Character";

const Wrapper = styled.div`
  transform: scale(0.8);
  position: absolute;
  display: flex;
  align-items: center;
  bottom: 0;

  & > h4 {
    margin: 0 10px;
    color: white;
  }
`;

const FOLLOWER_SUBSCRIPTION = gql`
  subscription {
    subscribeFollow(topic: "followers")
  }
`;

const TwitchAlert = () => {
  const wrapperRef = useRef(null);

  useEffect(() => {}, []);

  const { data, loading } = useSubscription(FOLLOWER_SUBSCRIPTION);
  return (
    <Wrapper ref={wrapperRef}>
      <h4>Nowy follower:</h4>
      {!loading && <Character roll color="black" name={data.subscribeFollow} />}
    </Wrapper>
  );
};

export default TwitchAlert;
