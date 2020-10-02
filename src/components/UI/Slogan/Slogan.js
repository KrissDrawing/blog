import gsap from "gsap/gsap-core";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const SloganWrapper = styled.div`
  position: absolute;
  top: 50vh;
  transform: translate(0, -50%);
  left: 10vw;
  display: flex;
  color: white;
  font-size: 2rem;
  font-weight: 700;
`;

const SloganHeading = styled.h2`
  margin: 0;
  background-color: black;
  padding: 5px;
`;

const Slogan = ({ sloganArray }) => {
  const sloganRef = useRef(null);
  const [sloganString, setSloganString] = useState("Programming");
  let iterator = 1;

  let sloganInterval;
  useEffect(() => {
    sloganInterval = setInterval(() => {
      setSloganString(sloganArray[iterator % sloganArray.length]);
      iterator++;
    }, 4000);
    return () => clearInterval(sloganInterval);
  }, []);

  useEffect(() => {
    const slogan = sloganRef.current.children;
    const tl1 = gsap.timeline({ defaults: { ease: "power3.inOut" } });
    tl1
      .fromTo(
        slogan,
        { y: "30", autoAlpha: 0 },
        {
          duration: 0.3,
          stagger: { each: 0.1, from: "random" },
          y: "0",
          autoAlpha: 1,
        }
      )
      .to(
        slogan,
        {
          duration: 0.3,
          stagger: { each: 0.1, from: "random" },
          y: "-30",
          autoAlpha: 0,
        },
        "+=1"
      );
  }, [sloganString, iterator]);

  return (
    <>
      <SloganWrapper ref={sloganRef}>
        {sloganString
          .toUpperCase()
          .split("")
          .map((char, i) => (
            <SloganHeading key={i}>{char}</SloganHeading>
          ))}
      </SloganWrapper>
    </>
  );
};

export default Slogan;
