import React from "react";
import styled from "styled-components";
import Characters from "../twitchLayout/Characters/Characters";
import TwitchFollowAlert from "../twitchLayout/TwitchFollowAlert/TwitchFollowAlert";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vw;
  position: relative;
`;

const twitchLayout = () => {
  return (
    <Wrapper>
      <TwitchFollowAlert />
      <Characters />
    </Wrapper>
  );
};

export default twitchLayout;
