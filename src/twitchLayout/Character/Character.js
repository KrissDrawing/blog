import React, { useRef, useEffect, useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
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

const Character = ({ name, color, roll, ...props }) => {
  const data = useStaticQuery(query);
  const [costumeNumber, setCostumeNumber] = useState(0);

  const bodyRef = useRef(null);
  const headRef = useRef(null);
  const rightHandRef = useRef(null);
  const rightLegRef = useRef(null);
  const leftHandRef = useRef(null);
  const leftLegRef = useRef(null);

  useEffect(() => {
    if (data)
      setCostumeNumber(Math.floor(Math.random() * data.head.nodes.length));
    if (name.toLowerCase() === "mrkretrl") setCostumeNumber(4);
    if (name.toLowerCase() === "xzagaxx") setCostumeNumber(3);
    const body = bodyRef.current;
    const head = headRef.current;
    const rightHand = rightHandRef.current;
    const rightLeg = rightLegRef.current;
    const leftHand = leftHandRef.current;
    const leftLeg = leftLegRef.current;

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
    gsap.to(leftHand, {
      rotation: "random(-40, -80, 5)",
      duration: "random(4, 6, 1)",
    });
    gsap.to(leftLeg, {
      rotation: "random(0, -70, 5)",
      duration: "random(4, 6, 1)",
    });
  }, []);

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
      </CharacterWrapper>
    </Wrapper>
  );
};

export default Character;
