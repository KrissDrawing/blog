import { graphql } from "gatsby";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "gatsby-image";
import styled from "styled-components";
import Navigation from "../components/Navigation/Navigation";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

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
    <Wrapper>
      <Navigation />
      <AboutImage ref={imageRef} fluid={data.file.childImageSharp.fluid} />
      <InfoWrapper ref={textRef}>
        <h2>{data.datoCmsAbout.heading}</h2>
        <p>{data.datoCmsAbout.about}</p>
      </InfoWrapper>
    </Wrapper>
  );
};

export const query = graphql`
  {
    file(name: { eq: "about" }) {
      childImageSharp {
        fluid(maxHeight: 1080) {
          ...GatsbyImageSharpFluid_tracedSVG
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
