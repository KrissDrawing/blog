import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Character from "../Character/Character";
import UserBanner from "../Components/UserBanner/UserBanner";

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

const LastSubscriber = () => {
  const [lastSubInfo, setLastSubInfo] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get(
        `https://api.twitch.tv/helix/subscriptions?broadcaster_id=${process.env.TWITCH_CHANNEL_ID}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.TWITCH_OAUTH_POINTS}`,
            "client-id": process.env.TWITCH_CLIENT_ID,
          },
        }
      );
      setLastSubInfo(data.data.data);
    };
    fetchData();
  }, []);

  return (
    <Wrapper>
      <InfoWrapper>
        <p>Ostatni Sub:</p>
        <p>Subów: {lastSubInfo.length - 1}</p>
      </InfoWrapper>
      {lastSubInfo.length > 0 ? (
        <Character sub={true} color="#fcba03" name={lastSubInfo[0].user_name} />
      ) : (
        <p>Ludzie! przecież tu nikogo nie ma!</p>
      )}
    </Wrapper>
  );
};

export default LastSubscriber;
