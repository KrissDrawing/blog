import React, { useRef, useEffect, useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { gsap } from "gsap";
import styled from "styled-components";

const query = graphql`
  {
    head: file(name: { eq: "head" }) {
      childImageSharp {
        fixed(width: 50) {
          src
        }
      }
    }
    hand: file(name: { eq: "hand" }) {
      childImageSharp {
        fixed(width: 35) {
          src
        }
      }
    }
    leg: file(name: { eq: "leg" }) {
      childImageSharp {
        fixed(width: 35) {
          src
        }
      }
    }
    body: file(name: { eq: "body" }) {
      childImageSharp {
        fixed(width: 100) {
          src
        }
      }
    }
  }
`;

const Wrapper = styled.div`
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

const Character = () => {
  const data = useStaticQuery(query);

  const bodyRef = useRef(null);
  const headRef = useRef(null);
  const rightHandRef = useRef(null);
  const rightLegRef = useRef(null);
  const leftHandRef = useRef(null);
  const leftLegRef = useRef(null);

  useEffect(() => {
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

    gsap.to(body, {
      x: "random(-20, 20, 5)",
      y: "random(-20, 20, 5)",
      rotation: "random(-10, 10, 5)",
      duration: "random(9, 15, 1)",
      ease: "none",
      repeat: -1,
      repeatRefresh: true,
    });
    gsap.to(head, {
      rotation: "random(-15, 15, 5)",
      duration: "random(4, 6, 1)",
      ease: "power1.inOut",
      repeat: -1,
      repeatRefresh: true,
    });
    gsap.to(rightHand, {
      rotation: "random(-50, 10, 5)",
      duration: "random(4, 6, 1)",
      ease: "none",
      repeat: -1,
      repeatRefresh: true,
    });
    gsap.to(rightLeg, {
      rotation: "random(-50, 10, 5)",
      duration: "random(4, 6, 1)",
      ease: "none",
      repeat: -1,
      repeatRefresh: true,
    });
    gsap.to(leftHand, {
      rotation: "random(-40, -80, 5)",
      duration: "random(4, 6, 1)",
      ease: "none",
      repeat: -1,
      repeatRefresh: true,
    });
    gsap.to(leftLeg, {
      rotation: "random(0, -70, 5)",
      duration: "random(4, 6, 1)",
      ease: "none",
      repeat: -1,
      repeatRefresh: true,
    });
  }, []);

  return (
    <>
      <Wrapper ref={bodyRef}>
        <Body src={data.body.childImageSharp.fixed.src} />
        <Head ref={headRef} src={data.head.childImageSharp.fixed.src} />
        <RightHand
          ref={rightHandRef}
          src={data.hand.childImageSharp.fixed.src}
        />
        <RightLeg ref={rightLegRef} src={data.leg.childImageSharp.fixed.src} />
        <LeftHand ref={leftHandRef} src={data.hand.childImageSharp.fixed.src} />
        <LeftLeg ref={leftLegRef} src={data.leg.childImageSharp.fixed.src} />
      </Wrapper>
    </>
  );
};

export default Character;
