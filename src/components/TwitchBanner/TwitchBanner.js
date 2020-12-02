import React, { useState, useEffect } from "react";
import { FaTwitch } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import styled from "styled-components";
import axios from "axios";

const Wrapper = styled.a`
  text-decoration: none;
  transition: color 0.5s ease-out;
  width: 150px;
  height: 100px;
  color: ${({ isLive }) => (isLive === true ? "red" : "gray")} !important;
  border: 2px solid ${({ isLive }) => (isLive === true ? "red" : "gray")};
  padding: 5px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 14px;

  p {
    margin: 0;
  }

  & > div {
    display: flex;
  }

  & > div > p {
    padding: 0 5px;
    margin: 0;
  }
`;

const StreamTitle = styled.p`
  color: white !important;
  font-size: 10px;
`;

const TwitchBanner = () => {
  const [streamData, setStreamData] = useState(null);
  const [isLive, setIsLive] = useState(false);

  useEffect(async () => {
    const data = await axios.get(
      "https://api.twitch.tv/helix/streams?user_login=blackfireice",
      {
        headers: {
          "client-id": process.env.TWITCH_CLIENT_ID,
          Authorization: `Bearer ${process.env.TWITCH_OAUTH}`,
        },
      }
    );
    setStreamData(data.data.data[0]);
    if (data.data.data[0]) setIsLive(true);
  }, []);

  return (
    <Wrapper
      target="_blank"
      rel="noopener noreferrer"
      href="https://www.twitch.tv/krissdrawing"
      isLive={isLive}
    >
      {isLive === true ? (
        <>
          <div>
            <FaTwitch />
            <p>Online</p>
            <BsFillPersonFill />
            <p>{streamData.viewer_count}</p>
          </div>
          <StreamTitle>{streamData.title}</StreamTitle>
        </>
      ) : (
        <>
          <FaTwitch />
          <p>Offline</p>
        </>
      )}
    </Wrapper>
  );
};

export default TwitchBanner;
