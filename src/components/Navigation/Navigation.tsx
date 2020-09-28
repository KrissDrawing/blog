import React from "react";
import styled from "styled-components";
import { graphql, Link, useStaticQuery } from "gatsby";
import { FaInstagram } from "react-icons/fa";
import { FiYoutube } from "react-icons/fi";

const NavigationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 999;
  position: fixed;
  top: 5%;
  width: 100vw;
  font-family: "Montserrat";
  font-size: 2rem;
  color: white;
`;

const NavigationList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
`;

const NavigationLink = styled(Link)`
  padding: 10px;
  color: white;
  text-decoration: none;
  transition: font-size 0.1s ease-out;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.6);

  &:hover {
    font-size: 3rem;
  }
`;
const LogoImage = styled.img`
  filter: invert(100%);
  margin: 0 20px;
  border-radius: 50%;
  background-color: white;
  box-shadow: 0px 0px 5px 2px rgba(255, 255, 255, 0.2);
`;
const SocialsWrapper = styled.div`
  margin: 0 20px;
  font-size: 1.5rem;

  & > a {
    margin: 5px;
    color: white;
  }
`;

interface Props {}

const Navigation = (props: Props) => {
  const data = useStaticQuery(graphql`
    {
      logo: file(name: { eq: "logo" }) {
        childImageSharp {
          fluid(maxWidth: 50) {
            src
          }
        }
      }
    }
  `);

  return (
    <NavigationWrapper>
      <NavigationLink to="/">
        <LogoImage src={data.logo.childImageSharp.fluid.src} />
      </NavigationLink>
      <NavigationList>
        <NavigationLink to="/articles">Blog</NavigationLink>
        <NavigationLink to="/about">About</NavigationLink>
        <NavigationLink to="/portfolio">Portfolio</NavigationLink>
      </NavigationList>
      <SocialsWrapper>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.instagram.com/krissdrawing/"
        >
          <FaInstagram />
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.youtube.com/c/6KRX"
        >
          <FiYoutube />
        </a>
      </SocialsWrapper>
    </NavigationWrapper>
  );
};

export default Navigation;
