import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { graphql, Link, useStaticQuery } from "gatsby";
import { FaInstagram } from "react-icons/fa";
import { FiYoutube } from "react-icons/fi";
import { BiMenu } from "react-icons/bi";
import TwitchBanner from "../TwitchBanner/TwitchBanner";

const NavigationWrapper = styled.div<{ expand: boolean }>`
  display: flex;
  flex-direction: ${({ expand }) => (expand === true ? "column" : "row")};
  align-items: center;
  justify-content: space-between;
  z-index: 999;
  position: fixed;
  top: 0;
  padding-top: 25px;
  width: 100vw;
  font-size: 2rem;
  color: white;

  @media (min-width: 768px) {
    /* top: 0; */
    padding-top: 0;
    flex-direction: row;
  }

  &::after {
    content: "";
    transition: opacity 0.2s ease-in-out;
    /* display: ${({ expand }) => (expand === true ? "flex" : "none")}; */
    opacity: ${({ expand }) => (expand === true ? "1" : "0")};
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: ${({ expand }) => (expand === true ? "100vh" : "0")};
    /* filter: blur(5px); */
    background-color: rgba(0, 0, 0, 0.8);
    z-index: -1;
    @media (min-width: 768px) {
      /* top: 0; */
      padding-top: 0;
      flex-direction: row;
    }
  }
`;

const NavigationList = styled.ul<{ expand: boolean }>`
  display: ${({ expand }) => (expand === true ? "flex" : "none")};
  justify-content: space-around;
  height: 50vh;
  align-content: center;
  flex-direction: column;
  margin: 50px 0 0 0;
  padding: 0;
  list-style: none;

  @media (min-width: 768px) {
    margin: 0;
    height: auto;
    display: flex;
    flex-direction: row;
  }
`;

const NavigationLink = styled(Link)`
  text-align: center;
  padding: 10px;
  color: white;
  text-decoration: none;
  transition: font-size 0.1s ease-out;
  /* transition: transform 0.2s ease-out; */
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.6);

  /* &:hover {
    font-size: 3rem;
  } */
`;
const LogoImage = styled.img`
  /* filter: invert(100%); */
  padding: 1px;
  margin: 0 20px;
  border-radius: 50%;
  background-color: white;
  box-shadow: 0px 0px 5px 2px rgba(255, 255, 255, 0.2);
  transition: transform 0.2s ease-out;

  /* &:hover {
    transform: scale(1.2);
  } */
`;
const SocialsWrapper = styled.div<{ expand: boolean }>`
  display: ${({ expand }) => (expand === true ? "flex" : "none")};
  margin: 50px 20px;
  font-size: 3rem;

  & > a {
    margin: 20px;
    color: white;
  }

  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    font-size: 1.5rem;

    & > a {
      margin: 5px;
      color: white;
    }
  }
`;
const BurgerMenu = styled.button`
  display: block;
  position: absolute;
  right: 25px;
  top: 35px;
  padding: 5px;
  background: none;
  border: 2px solid white;
  color: white;

  @media (min-width: 768px) {
    display: none;
  }
`;

interface Props {}

const Navigation = (props: Props) => {
  const [expand, setExpand] = useState(false);

  useEffect(() => {
    const handleResize = e => {
      const windowSize = window.innerWidth;
      if (windowSize >= 768) {
        setExpand(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
    <NavigationWrapper expand={expand}>
      <NavigationLink to="/" onClick={() => setExpand(false)}>
        <LogoImage src={data.logo.childImageSharp.fluid.src} />
      </NavigationLink>
      <NavigationList expand={expand}>
        <NavigationLink to="/articles">Blog</NavigationLink>
        <NavigationLink to="/about">About</NavigationLink>
        <NavigationLink to="/portfolio">Portfolio</NavigationLink>
      </NavigationList>
      <SocialsWrapper expand={expand}>
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
        <TwitchBanner />
      </SocialsWrapper>
      <BurgerMenu onClick={() => setExpand(!expand)}>
        <BiMenu />
      </BurgerMenu>
    </NavigationWrapper>
  );
};

export default Navigation;
