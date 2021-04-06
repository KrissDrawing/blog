import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useStaticQuery, graphql } from "gatsby";
import styled from "styled-components";
import { trimString } from "../../../utilities/utilities";

const Wrapper = styled.div`
  background-color: ${({ color }) => color};
  color: white;
  width: 120px;
  display: flex;
  justify-content: center;
  border-radius: 5px;
  border: 2px solid white;
  font-weight: bold;
  font-size: ${({ count }) => (count > 12 ? 20 - count * 0.5 + "px" : "16px")};
  box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, 0.3);
  & > p {
    margin: 0;
    text-shadow: 1px 1px 5px rgba(0, 0, 0, 1);
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
    <Wrapper
      color={color}
      ref={bannerRef}
      count={name.length > 16 ? 16 : name.length}
    >
      {sub === true ? (
        <Crown src={data.subCrown.childImageSharp.fixed.src} />
      ) : null}
      <p>{trimString(name, 16)}</p>
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
