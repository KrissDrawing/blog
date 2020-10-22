import { graphql } from "gatsby";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "gatsby-image";
import styled from "styled-components";
import Navigation from "../components/Navigation/Navigation";
import { BreakLine } from "../layouts/elements";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${({ bg }) => bg});
    opacity: 0.2;
    /* transform: translate(25%, 0) rotate(90deg); */
    z-index: -1;
  }
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const AboutImage = styled(Image)`
  height: 50vh;
  width: 100vw;

  @media (min-width: 768px) {
    height: 100vh;
    width: 50vw;
    flex-direction: row;
  }
`;

const InfoWrapper = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;

  @media (min-width: 768px) {
    width: 50vw;
    margin-top: 0;
  }

  @media (min-width: 768px) and (max-height: 350px) {
    margin-top: 50px;
    font-size: 0.7rem;
    line-height: 1rem;
  }
  & > * {
    width: 80%;
    text-align: center;
  }
`;
const InfoCard = styled.div`
  background-color: #3b8b94;
  padding: 20px;
  border: 2px solid white;
  box-shadow: 2px 2px 20px 1px rgba(0, 0, 0, 0.4);
`;

const About = ({ data }) => {
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const text = [...textRef.current.children];
    const image = `.${imageRef.current.props.className.split(" ")[0]}`;

    gsap.fromTo(
      image,
      {
        autoAlpha: 0,
        x: "-=300",
      },
      {
        autoAlpha: 1,
        x: "+=300",
      }
    );

    text.forEach((item, i) => {
      gsap.fromTo(
        item,
        { y: "+=100px" },
        { duration: (i + 1) * 0.2, y: "-=100px" }
      );
    });
  }, []);

  return (
    <Wrapper bg={data.aboutBg.childImageSharp.fixed.src}>
      <Navigation />
      <AboutImage ref={imageRef} fluid={data.aboutImg.childImageSharp.fluid} />
      <InfoWrapper ref={textRef}>
        <InfoCard>
          <h2>{data.datoCmsAbout.heading}</h2>
          <BreakLine light margin />
          <p>{data.datoCmsAbout.about}</p>
        </InfoCard>
      </InfoWrapper>
    </Wrapper>
  );
};

export const query = graphql`
  {
    aboutImg: file(name: { eq: "about" }) {
      childImageSharp {
        fluid(maxHeight: 1080) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
    aboutBg: file(name: { eq: "aboutBg" }) {
      childImageSharp {
        fixed(height: 1080) {
          src
        }
      }
    }
    datoCmsAbout {
      heading
      about
    }
  }
`;

export default About;
