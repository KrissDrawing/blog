import React, { useEffect, useRef, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { graphql, useStaticQuery } from "gatsby";
import styled from "styled-components";
import { trimString } from "../../utilities/utilities";
import Character from "../Character/Character";
import {
  handleReward,
  saveLastRedeems,
  loadLastRedeems,
} from "../../firebase/firestoreFunctions";
import UserBanner from "../Components/UserBanner/UserBanner";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 50vh;
  left: 2vh;
`;

const CharacterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PointsWrapper = styled.div`
  display: flex;
  font-weight: bold;
  color: white;
  margin-top: -50px;
  align-items: center;
  z-index: 1;
  text-shadow: 3px 3px 3px black;
  & > p {
    margin: 5px;
  }
  & > img {
    margin: 0;
  }
`;

const mutateQueryColorMain = gql`
  mutation setColorMain($r: Int = 0, $g: Int = 0, $b: Int = 0, $a: Float = 0) {
    setColorMain(r: $r, g: $g, b: $b, a: $a) {
      r
      g
      b
      a
    }
  }
`;

const Characters = () => {
  const data = useStaticQuery(query);
  const [reward, setReward] = useState([]);
  const [mutateColorMain] = useMutation(mutateQueryColorMain);

  useEffect(() => {
    const fetchQueue = async () => {
      const rewardQueue = await loadLastRedeems();
      setReward([...rewardQueue]);
    };
    fetchQueue();
  }, []);

  useEffect(() => {
    if (
      reward[0] &&
      reward[reward.length - 1].reward.title.includes("Zmień kolor światła:")
    ) {
      const rewardedColor = reward[reward.length - 1].reward.title.substring(
        reward[reward.length - 1].reward.title.lastIndexOf(" ") + 1
      );
      let switchColor;

      switch (rewardedColor) {
        case "czerwony":
          switchColor = { r: 255, g: 0, b: 0, a: 1 };
          break;
        case "zielony":
          switchColor = { r: 0, g: 255, b: 0, a: 1 };
          break;
        case "niebieski":
          switchColor = { r: 0, g: 0, b: 255, a: 1 };
          break;
      }

      mutateColorMain({
        variables: switchColor,
      });
    }
  }, [reward]);

  useEffect(() => {
    const ws = new WebSocket("wss://pubsub-edge.twitch.tv");
    ws.addEventListener("open", () => {
      const pingInterval = setInterval(() => {
        ws.send(JSON.stringify({ type: "PING" }));
      }, 25000);

      ws.send(
        JSON.stringify({
          type: "LISTEN",
          nonce: "44h1k13746815ab1r2",
          data: {
            topics: [
              `channel-points-channel-v1.${process.env.TWITCH_CHANNEL_ID}`,
            ],
            auth_token: process.env.TWITCH_OAUTH_POINTS,
          },
        })
      );
      return () => pingInterval;
    });

    ws.addEventListener("message", data => {
      let pointsObject = JSON.parse(data.data);

      if (pointsObject.data && pointsObject.data.message) {
        console.log(JSON.parse(pointsObject.data.message));
        setReward(prevState => [
          ...prevState,
          JSON.parse(pointsObject.data.message).data.redemption,
        ]);
        handleReward(JSON.parse(pointsObject.data.message).data.redemption);
      }
    });
  }, []);

  useEffect(() => {
    if (reward.length > 3) {
      reward.shift();
      setReward([...reward]);
    }
    if (reward.length > 0) {
      saveLastRedeems(reward);
    }
  }, [reward]);

  return (
    <Wrapper>
      {reward.map((item, i) =>
        item !== "" ? (
          <CharacterWrapper key={item + i}>
            <div>
              <UserBanner
                color={item.reward.background_color}
                name={item.user.display_name}
              />
              <Character />
            </div>
            <PointsWrapper>
              <p>-{item.reward.cost}</p>
              <img src={data.balls.childImageSharp.fixed.src} />
            </PointsWrapper>
          </CharacterWrapper>
        ) : (
          <p>{trimString("Wykup punkty mordo", 10)}</p>
        )
      )}
    </Wrapper>
  );
};

export const query = graphql`
  {
    balls: file(name: { eq: "balls" }) {
      childImageSharp {
        fixed(width: 32) {
          src
        }
      }
    }
  }
`;

export default Characters;
