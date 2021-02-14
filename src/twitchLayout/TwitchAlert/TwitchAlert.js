import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { gql, useSubscription, useQuery } from "@apollo/client";
import Character from "../Character/Character";

const Wrapper = styled.div``;

const CharacterWrapper = styled.div`
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
const Img = styled.img`
  position: absolute;
  display: flex;
  max-width: 400px;
  max-height: 400px;
  top: 10%;
  right: 10%;
`;

const FOLLOWER_SUBSCRIPTION = gql`
  subscription {
    subscribeFollow(topic: "followers")
  }
`;
const LAST_FOLLOWER = gql`
  {
    follow
  }
`;

const TwitchAlert = () => {
  const wrapperRef = useRef(null);
  const isInitialMount = useRef(true);
  const [gif, setGif] = useState("");
  const [displayGif, setDisplayGif] = useState(false);
  const { loading: loadingLastFollow, __, data: lastFollower } = useQuery(
    LAST_FOLLOWER
  );
  const { data, loading } = useSubscription(FOLLOWER_SUBSCRIPTION);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      const getGif = async () => {
        let imageGif;
        try {
          imageGif = await axios.get(
            `https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHLY_KEY}&rating=g&tag=perfect-loops`
          );
          if (imageGif.data) setGif(imageGif.data.data.images.original.url);
          setDisplayGif(true);
        } catch (err) {
          if (imageGif.data)
            setGif("https://media.giphy.com/media/Yl5aO3gdVfsQ0/giphy.gif");
          setDisplayGif(true);
        }
      };
      getGif();
    }
  }, [data]);

  useEffect(() => {
    setTimeout(() => {
      setDisplayGif(false);
    }, 10000);
  }, [gif]);

  return (
    <Wrapper>
      <CharacterWrapper ref={wrapperRef}>
        <h4>Nowy follower:</h4>
        {!loadingLastFollow && lastFollower ? (
          <Character
            roll
            color="black"
            name={data ? data.subscribeFollow : lastFollower.follow}
          />
        ) : null}
      </CharacterWrapper>
      {displayGif && <Img src={gif} />}
    </Wrapper>
  );
};

export default TwitchAlert;
