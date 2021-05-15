import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { gql, useSubscription, useQuery } from "@apollo/client";
import ProgressBar from "../ProgressBar/ProgressBar";

const Wrapper = styled.div``;

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
    follow {
      name
      count
    }
  }
`;

const TwitchAlert = () => {
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
      {!loadingLastFollow && lastFollower ? (
        <ProgressBar
          name={data ? data.subscribeFollow?.name : lastFollower.follow?.name}
          amount={
            data ? data.subscribeFollow?.count : lastFollower.follow?.count
          }
          title="1500 follow"
          goal="1500"
        />
      ) : null}
      {displayGif && <Img src={gif} />}
    </Wrapper>
  );
};

export default TwitchAlert;
