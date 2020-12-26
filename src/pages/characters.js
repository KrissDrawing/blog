import React, { useEffect, useRef, useState } from "react";
import { graphql } from "gatsby";
import { gsap } from "gsap";
import styled from "styled-components";
import { trimString } from "../utilities/utilities";

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
`;

const Characters = ({ data }) => {
  const [displayName, setDisplayName] = useState("");
  const astronautRef = useRef(null);
  const bannerRef = useRef(null);

  useEffect(() => {
    const astronaut = astronautRef.current;
    const banner = bannerRef.current;

    gsap.to(astronaut, {
      x: "random(-20, 20, 5)",
      y: "random(-20, 20, 5)",
      rotation: "random(-10, 10, 5)",
      duration: 5,
      ease: "none",
      repeat: -1,
      repeatRefresh: true,
    });
    gsap.to(banner, {
      x: "random(-10, 10, 5)",
      y: "random(-10, 10, 5)",
      rotation: "random(-10, 10, 5)",
      duration: 4,
      ease: "none",
      repeat: -1,
      repeatRefresh: true,
    });
  }, [data]);

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
        setDisplayName(
          JSON.parse(pointsObject.data.message).data.redemption.user
            .display_name
        );
      }
    });
  }, []);

  return (
    <Wrapper>
      {displayName !== "" ? (
        <>
          <UserBanner ref={bannerRef}>
            <p>{displayName}</p>
          </UserBanner>
          <img
            ref={astronautRef}
            src={data.astronaut.childImageSharp.fixed.src}
          />
        </>
      ) : (
        <p>{trimString("Wykup punkty mordo", 10)}</p>
      )}
    </Wrapper>
  );
};

export const query = graphql`
  {
    astronaut: file(name: { eq: "astronaut" }) {
      childImageSharp {
        fixed(width: 100) {
          src
        }
      }
    }
  }
`;

export default Characters;
