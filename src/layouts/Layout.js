import { useStaticQuery } from "gatsby";
import React from "react";
import styled from "styled-components";
const Wrapper = styled.div`
  width: 100%;
  &::before {
    background: linear-gradient(
      180deg,
      rgba(200, 0, 50, 1),
      rgba(255, 255, 255, 0)
    );
    z-index: -1;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: 100%;
  }

  &::after {
    z-index: -1;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${({ url }) => url});
    background-repeat: repeat;
    background-size: 100%;
    opacity: 0.1;
    mask: linear-gradient(0deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
  }

  /* transform: rotate(90deg); */
`;

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query {
      lines: file(name: { eq: "lines" }) {
        childImageSharp {
          fixed(width: 1000) {
            src
          }
        }
      }
    }
  `);

  return (
    <>
      <Wrapper url={data.lines.childImageSharp.fixed.src}>{children}</Wrapper>
    </>
  );
};

export default Layout;
