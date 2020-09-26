import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

const NavigationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  position: fixed;
  top: 5%;
  left: 20%;
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

  &:hover {
    font-size: 3rem;
  }
`;

interface Props {}

const Navigation = (props: Props) => {
  return (
    <NavigationWrapper>
      <NavigationList>
        <NavigationLink to="/articles">Blog</NavigationLink>
        <NavigationLink to="/about">About</NavigationLink>
        <NavigationLink to="/portfolio">Portfolio</NavigationLink>
      </NavigationList>
    </NavigationWrapper>
  );
};

export default Navigation;
