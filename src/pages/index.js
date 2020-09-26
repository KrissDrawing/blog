import React from "react";
import Navigation from "../components/Navigation/Navigation";
import { graphql } from "gatsby";
import Image from "gatsby-image";
import styled, { keyframes } from "styled-components";
import { ApolloProvider } from "@apollo/client";
import client from "../gatsby-theme-apollo/client";

const galaxyMove = keyframes`
  0% { background-position: -150px -150px;
    transform:  translate(-50%, -50%) rotate(0deg);
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
  width: 1174px;
  height: 1000px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  &::after {
    content: "";
    width: 80%;
    height: 80%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-image: url(${({ backdrop }) => backdrop});
    background-size: contain;
    background-repeat: no-repeat;
    animation: ${galaxyMove} 70s linear infinite;
  }

  mask-image: url(${({ mask }) => mask});
  mask-repeat: no-repeat;
  mask-position: center;
`;
const SignImage = styled(Image)`
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
`;

const IndexPage = ({ data }) => {
  return (
    <ApolloProvider client={client}>
      <Navigation />
      <BackgroundImage fixed={data.background.childImageSharp.fixed} />
      <GalaxyImage
        mask={data.logo.childImageSharp.fluid.src}
        backdrop={data.galaxy.childImageSharp.fixed.src}
      />
      <SignImage fixed={data.sign.childImageSharp.fixed} />
    </ApolloProvider>
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
        fixed(width: 1174) {
          src
        }
      }
    }
    sign: file(name: { eq: "krissdrawing" }) {
      childImageSharp {
        fixed(width: 499) {
          ...GatsbyImageSharpFixed_tracedSVG
        }
      }
    }
  }
`;

export default IndexPage;
