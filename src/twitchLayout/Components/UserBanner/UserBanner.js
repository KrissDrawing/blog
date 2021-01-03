import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useStaticQuery, graphql } from "gatsby";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: ${({ color }) => color};
  color: white;
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
  position: relative;
`;
const Crown = styled.img`
  position: absolute;
  top: -40px;
`;

const UserBanner = ({ color, name, sub }) => {
  const bannerRef = useRef(null);
  const data = useStaticQuery(query);

  useEffect(() => {
    const banner = bannerRef.current;
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

  return (
    <Wrapper color={color} ref={bannerRef}>
      {sub === true ? (
        <Crown src={data.subCrown.childImageSharp.fixed.src} />
      ) : null}
      <p>{name}</p>
    </Wrapper>
  );
};

const query = graphql`
  {
    subCrown: file(name: { eq: "subcrown" }) {
      childImageSharp {
        fixed(width: 40) {
          src
        }
      }
    }
  }
`;

export default UserBanner;
