import React from "react";
import Navigation from "../components/Navigation/Navigation";
import Image from "gatsby-image";
import styled from "styled-components";

const HeadingImage = styled(Image)`
  width: 100%;
  max-height: 70vh !important;
`;

const Portfolio = ({ data }) => {
  return (
    <>
      <Navigation />
      <HeadingImage fluid={data.headingImage.childImageSharp.fluid} />
      <h2>Tutaj nic nie ma jak coś na razie</h2>
    </>
  );
};

export const query = graphql`
  {
    headingImage: file(name: { eq: "portfolio" }) {
      childImageSharp {
        fluid(maxWidth: 1920) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
  }
`;

export default Portfolio;
