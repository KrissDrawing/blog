import React from "react";

import {
  SiHtml5,
  SiCss3,
  SiSass,
  SiJavascript,
  SiReact,
  SiRedux,
  SiGatsby,
  SiGraphql,
  SiTypescript,
  SiStyledComponents,
  SiFirebase,
  SiAdobephotoshop,
  SiAdobeaftereffects,
  SiAdobepremiere,
  SiBlender,
} from "react-icons/si";
import { IoLogoNodejs } from "react-icons/io";
import IconWrapper from "../UI/IconWrapper/IconWrapper";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  margin: 20px;
  margin-bottom: 50px;
`;

const Header = styled.h3`
  color: white;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.8);
  margin: 10px;
`;

const IconsWrapper = styled.section`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const PortfolioSkills = () => {
  return (
    <Wrapper>
      <Header>FrontEnd </Header>
      <IconsWrapper>
        <IconWrapper icon={<SiHtml5 />} name="HTML" />
        <IconWrapper
          icon={
            <>
              <SiCss3 />
              /
              <SiSass />
            </>
          }
          name="CSS/Sass"
        />
        <IconWrapper icon={<SiJavascript />} name="ES6+" />
        <IconWrapper icon={<SiTypescript />} name="Typescript" />
        <IconWrapper
          icon={
            <>
              <SiReact />
              /
              <SiRedux />
            </>
          }
          name="React/Redux"
        />
        <IconWrapper icon={<SiGatsby />} name="Gatsby" />
        <IconWrapper icon={<SiStyledComponents />} name="Styled-components" />
      </IconsWrapper>
      <Header>backend </Header>
      <IconsWrapper>
        <IconWrapper icon={<IoLogoNodejs />} name="Node.js" />
        <IconWrapper icon={<SiGraphql />} name="GraphQL" />
        <IconWrapper icon={<SiFirebase />} name="Firebase" />
      </IconsWrapper>
      <Header>Grafika </Header>
      <IconsWrapper>
        <IconWrapper icon={<SiAdobephotoshop />} name="Photoshop" />
        <IconWrapper icon={<SiAdobeaftereffects />} name="After Effects" />
        <IconWrapper icon={<SiAdobepremiere />} name="Premiere" />
        <IconWrapper icon={<SiBlender />} name="Blender" />
      </IconsWrapper>
    </Wrapper>
  );
};

export default PortfolioSkills;
