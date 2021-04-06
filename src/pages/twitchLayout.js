import React from "react";
import styled from "styled-components";
import Characters from "../twitchLayout/Characters/Characters";
import TwitchFollowAlert from "../twitchLayout/TwitchFollowAlert/TwitchFollowAlert";
import LastSubscriber from "../twitchLayout/LastSubscriber/LastSubscriber";
import TwitchAlert from "../twitchLayout/TwitchAlert/TwitchAlert";
import InstagramAlert from "../twitchLayout/InstagramAlert/InstagramAlert";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const twitchLayout = () => {
  return (
    <Wrapper>
      <TwitchAlert />
      <InstagramAlert />
      <TwitchFollowAlert />
      <Characters />
      {/* <LastSubscriber /> */}
    </Wrapper>
  );
};

export default twitchLayout;
