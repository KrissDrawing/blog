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
  display: flex;
`;

const Characters = ({ data }) => {
  const [displayName, setDisplayName] = useState([]);
  const astronautsRef = useRef([]);
  const bannersRef = useRef([]);

  useEffect(() => {
    const astronauts = astronautsRef.current;
    const banners = bannersRef.current;

    astronauts.forEach(astronaut => {
      gsap.to(astronaut, {
        x: "random(-20, 20, 5)",
        y: "random(-20, 20, 5)",
        rotation: "random(-10, 10, 5)",
        duration: "random(9, 15, 1)",
        ease: "none",
        repeat: -1,
        repeatRefresh: true,
      });
    });

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
  }, [displayName]);

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
        setDisplayName(prevState => [
          ...prevState,
          JSON.parse(pointsObject.data.message).data.redemption.user
            .display_name,
        ]);
      }
    });
  }, []);

  useEffect(() => {
    if (displayName.length >= 3) {
      displayName.splice(-1, 1);
    }
  }, [displayName]);

  return (
    <Wrapper>
      {displayName.map((item, i) =>
        item !== "" ? (
          <div key={item + i}>
            <UserBanner ref={el => (bannersRef.current[i] = el)}>
              <p>{item}</p>
            </UserBanner>
            <img
              ref={el => (astronautsRef.current[i] = el)}
              src={data.astronaut.childImageSharp.fixed.src}
            />
          </div>
        ) : (
          <p>{trimString("Wykup punkty mordo", 10)}</p>
        )
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
