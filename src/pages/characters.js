import React, { useEffect, useRef, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { graphql } from "gatsby";
import { gsap } from "gsap";
import styled from "styled-components";
import { trimString } from "../utilities/utilities";
import Character from "../components/Character/Character";

const UserBanner = styled.div`
  background-color: #aaa;
  width: 120px;
  display: flex;
  justify-content: center;
  border-radius: 5px;
  border: 2px solid white;
  font-weight: bold;
  font-size: 16px;
  & > p {
    margin: 0;
  }
`;

const Wrapper = styled.div`
  margin: 50px;
  width: 800px;
  height: 450px;
  display: flex;
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

const Characters = ({ data }) => {
  const [reward, setReward] = useState([]);
  const bannersRef = useRef([]);
  const [mutateColorMain] = useMutation(mutateQueryColorMain);

  useEffect(() => {
    const banners = bannersRef.current;

    banners.forEach(banner => {
      gsap.to(banner, {
        x: "random(-10, 10, 5)",
        y: "random(-10, 10, 5)",
        rotation: "random(-10, 10, 5)",
        duration: "random(9, 15, 1)",
        ease: "none",
        repeat: -1,
        repeatRefresh: true,
      });
    });
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
      console.log("we are connected");
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
      }
    });
  }, []);

  useEffect(() => {
    if (reward.length > 3) {
      reward.shift();
      setReward([...reward]);
    }
  }, [reward]);

  return (
    <Wrapper>
      {reward.map((item, i) =>
        item !== "" ? (
          <CharacterWrapper key={item + i}>
            <div>
              <UserBanner ref={el => (bannersRef.current[i] = el)}>
                <p>{item.user.display_name}</p>
              </UserBanner>
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
