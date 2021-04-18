import React, { useRef, useEffect, useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { gql, useSubscription } from "@apollo/client";
import { gsap } from "gsap";
import styled from "styled-components";
import UserBanner from "../Components/UserBanner/UserBanner";

const query = graphql`
  {
    head: allFile(filter: { name: { eq: "head" } }) {
      nodes {
        childImageSharp {
          fixed(width: 50) {
            src
          }
        }
      }
    }
    hand: allFile(filter: { name: { eq: "hand" } }) {
      nodes {
        childImageSharp {
          fixed(width: 35) {
            src
          }
        }
      }
    }
    leg: allFile(filter: { name: { eq: "leg" } }) {
      nodes {
        childImageSharp {
          fixed(width: 35) {
            src
          }
        }
      }
    }
    body: allFile(filter: { name: { eq: "body" } }) {
      nodes {
        childImageSharp {
          fixed(width: 100) {
            src
          }
        }
      }
    }
  }
`;

const HELLO_SUBSCRIPTION = gql`
  subscription {
    subscribeHelloReward(topic: "helloTrigger")
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
`;

const CharacterWrapper = styled.div`
  position: relative;
  transform: scale(0.7);
`;

const Body = styled.img`
  position: relative;
`;
const Head = styled.img`
  position: absolute;
  left: 25px;
  top: 5px;
`;
const RightHand = styled.img`
  position: absolute;
  left: 15px;
  top: 35px;
`;
const RightLeg = styled.img`
  position: absolute;
  left: 55px;
  top: 73px;
`;
const LeftHand = styled.img`
  position: absolute;
  left: 40px;
  top: 30px;
  z-index: -1;
`;
const LeftLeg = styled.img`
  position: absolute;
  left: 70px;
  top: 63px;
  z-index: -1;
`;

const HelloText = styled.p`
  margin: 0;
  position: absolute;
  font-size: 40px;
  font-weight: bold;
  color: white;
  z-index: 1;
  top: 50%;
  left: 0;
  text-shadow: 2px 2px 10px black;
`;

const welcomePhrases = ["Siema", "Hi", "Elo", "Hello", "Siemson", "Siemka"];

const Character = ({ name, color, costume, roll, ...props }) => {
  const data = useStaticQuery(query);
  const [costumeNumber, setCostumeNumber] = useState(0);
  const [waveTrigger, setWaveTrigger] = useState(false);
  const { data: helloData = false } = useSubscription(HELLO_SUBSCRIPTION);

  const bodyRef = useRef(null);
  const headRef = useRef(null);
  const rightHandRef = useRef(null);
  const rightLegRef = useRef(null);
  const leftHandRef = useRef(null);
  const leftLegRef = useRef(null);

  const helloRef = useRef(null);

  useEffect(() => {
    if (data && costume) setCostumeNumber(costume);
    if (name.toLowerCase() === "mrkretrl") setCostumeNumber(4);
    if (name.toLowerCase() === "xzagaxx") setCostumeNumber(3);
    console.log("this stuff is not triggering");
  }, [costume]);

  useEffect(() => {
    if (helloData) {
      setTimeout(() => {
        setWaveTrigger(helloData.subscribeHelloReward);
      }, 1000);
    }
  }, [helloData]);

  useEffect(() => {
    const body = bodyRef.current;
    const head = headRef.current;
    const rightHand = rightHandRef.current;
    const rightLeg = rightLegRef.current;
    const leftHand = leftHandRef.current;
    const leftLeg = leftLegRef.current;
    const hello = helloRef.current;

    gsap.set(head, { transformOrigin: "40% 75%" });
    gsap.set(rightHand, { transformOrigin: "50% 25%" });
    gsap.set(rightLeg, { transformOrigin: "30% 15%" });
    gsap.set(leftHand, { transformOrigin: "50% 25%", rotation: "-60" });
    gsap.set(leftLeg, { transformOrigin: "30% 15%", rotation: "-60" });
    gsap.defaults({ ease: "none", repeat: -1, repeatRefresh: true });
    gsap.to(body, {
      x: "random(-20, 20, 5)",
      y: "random(-20, 20, 5)",
      rotation: "random(-10, 10, 5)",
      duration: "random(9, 15, 1)",
    });

    if (roll) {
      gsap.to(body, {
        rotation: "-1800",
        duration: 10,
      });
    }

    gsap.to(head, {
      rotation: "random(-15, 15, 5)",
      duration: "random(4, 6, 1)",
      ease: "power1.inOut",
    });
    gsap.to(rightHand, {
      rotation: "random(-50, 10, 5)",
      duration: "random(4, 6, 1)",
    });
    gsap.to(rightLeg, {
      rotation: "random(-50, 10, 5)",
      duration: "random(4, 6, 1)",
    });

    gsap.to(leftLeg, {
      rotation: "random(0, -70, 5)",
      duration: "random(4, 6, 1)",
    });

    if (waveTrigger === false) {
      gsap.to(leftHand, {
        rotation: "random(-40, -80, 5)",
        duration: "random(4, 6, 1)",
      });
    }
    if (waveTrigger === true) {
      const tlHello = gsap.timeline({
        ease: "Power1.easeInOut",
      });
      tlHello
        .fromTo(
          hello,
          {
            duration: 0.5,
            scale: 0,
          },
          { scale: 1, repeat: 0 }
        )
        .fromTo(
          hello,
          { duration: 0.5, scale: 1 },
          {
            repeat: 0,
            scale: 0,
          },
          "4"
        );
      gsap.defaults({ repeat: 1 });
      const tlWave = gsap.timeline({
        ease: "Power1.easeInOut",
        repeat: 30,
        repeatRefresh: true,
      });
      tlWave
        .to(leftHand, {
          rotation: "-140",
          duration: "0.02",
        })
        .to(leftHand, {
          rotation: "-100",
          duration: "0.02",
        });
      setTimeout(() => {
        setWaveTrigger(false);
      }, 5000);
    }
  }, [waveTrigger]);

  return (
    <Wrapper>
      <UserBanner name={name} color={color} {...props} />
      <CharacterWrapper ref={bodyRef}>
        <Body src={data.body.nodes[costumeNumber].childImageSharp.fixed.src} />
        <Head
          ref={headRef}
          src={data.head.nodes[costumeNumber].childImageSharp.fixed.src}
        />
        <RightHand
          ref={rightHandRef}
          src={data.hand.nodes[costumeNumber].childImageSharp.fixed.src}
        />
        <RightLeg
          ref={rightLegRef}
          src={data.leg.nodes[costumeNumber].childImageSharp.fixed.src}
        />
        <LeftHand
          ref={leftHandRef}
          src={data.hand.nodes[costumeNumber].childImageSharp.fixed.src}
        />
        <LeftLeg
          ref={leftLegRef}
          src={data.leg.nodes[costumeNumber].childImageSharp.fixed.src}
        />
        {waveTrigger === true ? (
          <HelloText ref={helloRef}>
            {welcomePhrases[Math.floor(Math.random() * welcomePhrases.length)]}
          </HelloText>
        ) : null}
      </CharacterWrapper>
    </Wrapper>
  );
};

export default Character;
