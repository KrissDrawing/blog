import React, { useRef, useEffect } from "react";
import Navigation from "../components/Navigation/Navigation";
import { graphql } from "gatsby";
import Image from "gatsby-image";
import styled, { keyframes } from "styled-components";
import { gsap } from "gsap";
import LogoParticle from "../components/Particles/LogoParticle/LogoParticle";
import Slogan from "../components/UI/Slogan/Slogan";

const galaxyMove = keyframes`
  0% { background-position: -150px -150px;
    transform:  translate(-50%-150px, -50%) rotate(0deg);
  }
  25% { background-position: 150px 100px;
    transform:  translate(-50%, -50%) rotate(90deg);
  }
  50% { background-position: -150px 150px;
    transform:  translate(-50%, -50%) rotate(180deg);}
  75% { background-position: 150px -150px;
   transform:  translate(-50%, -50%) rotate(270deg);}
  100% { background-position: -150px -150px;
    transform:  translate(-50%, -50%) rotate(360deg);}
`;

const GalaxyImage = styled.div`
  overflow: hidden;
  width: 800px;
  height: 800px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  &::after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-image: url(${({ backdrop }) => backdrop});
    background-size: contain;
    background-repeat: no-repeat;
    animation: ${galaxyMove} 60s linear infinite;
  }
  mask-image: url(${({ mask }) => mask});
  mask-repeat: no-repeat;
  mask-position: center;
`;

const SignImage = styled.img`
  position: absolute !important;
  top: 50%;
  left: 50%;
  transform: translate(-5%, 20%);
`;

const BackgroundImage = styled(Image)`
  position: absolute !important;
  width: 100% !important;
  height: 100% !important;
  top: 0;
  left: 0;
  z-index: -1;
`;

const IndexPage = ({ data }) => {
  const logoRef = useRef(null);
  const signRef = useRef(null);
  const sloganArray = ["Programming", "Graphics", "Electronics", "Self DEV"];

  useEffect(() => {
    const logo = logoRef.current;
    const sign = signRef.current;
    gsap.set([logo, sign], { autoAlpha: 0 });
    const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });
    tl.fromTo(
      logo,
      { y: "+=100", rotation: -30 },
      { duration: 1.5, y: "-=100", rotation: 0, autoAlpha: 1 }
    ).fromTo(
      sign,
      { y: "+=100" },
      { duration: 1, y: "-=100", autoAlpha: 1 },
      "-=1"
    );
  }, []);

  return (
    <>
      <Navigation />
      <BackgroundImage fixed={data.background.childImageSharp.fixed} />
      <LogoParticle />
      <GalaxyImage
        ref={logoRef}
        mask={data.logo.childImageSharp.fluid.src}
        backdrop={data.galaxy.childImageSharp.fixed.src}
      />
      <SignImage ref={signRef} src={data.sign.childImageSharp.fixed.src} />
      <Slogan sloganArray={sloganArray} />
    </>
  );
};

export const query = graphql`
  {
    background: file(name: { eq: "background" }) {
      childImageSharp {
        fixed(width: 1920) {
          ...GatsbyImageSharpFixed_tracedSVG
        }
      }
    }
    logo: file(name: { eq: "logo" }) {
      childImageSharp {
        fluid(maxWidth: 294) {
          src
        }
      }
    }
    galaxy: file(name: { eq: "galaxy" }) {
      childImageSharp {
        fixed(width: 800) {
          src
        }
      }
    }
    sign: file(name: { eq: "krissdrawing" }) {
      childImageSharp {
        fixed(width: 499) {
          src
        }
      }
    }
  }
`;

export default IndexPage;
