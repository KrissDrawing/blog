import { graphql } from "gatsby";
import React from "react";
import Image from "gatsby-image";
import styled from "styled-components";
import Navigation from "../components/Navigation/Navigation";

const AboutImage = styled(Image)`
  height: 100vh;
  width: 50vw;
`;

interface Props {
  data: any;
}

const about = ({ data }: Props) => {
  return (
    <>
      <Navigation />
      {
        //@ts-ignore}
        <AboutImage fluid={data.file.childImageSharp.fluid} />
      }
    </>
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
  }
`;

export default about;
