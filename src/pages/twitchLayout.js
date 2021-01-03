import React from "react";
import styled from "styled-components";
import Characters from "../twitchLayout/Characters/Characters";
import TwitchFollowAlert from "../twitchLayout/TwitchFollowAlert/TwitchFollowAlert";
import LastSubscriber from "../twitchLayout/LastSubscriber/LastSubscriber";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const twitchLayout = () => {
  return (
    <Wrapper>
      <TwitchFollowAlert />
      <Characters />
      <LastSubscriber />
    </Wrapper>
  );
};

export default twitchLayout;
