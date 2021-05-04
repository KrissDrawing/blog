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
  padding: 10px 20px;
  margin: 20px;
  flex-direction: column;
  align-items: center;
  background-color: darkGray;
  border: 2px solid black;
  box-shadow: 2px 2px 40px 2px rgba(0, 0, 0, 0.7);
  margin-bottom: 50px;
`;

const Header = styled.h3`
  color: white;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.8);
  margin-bottom: 10px;
`;

const IconsWrapper = styled.section`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const Divider = styled.hr`
  width: 100%;
  height: 2px;
  margin: 4px 0;
`;

const PortfolioSkills = () => {
  return (
    <Wrapper>
      <Header>Frontend </Header>
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
        {/* <IconWrapper icon={<SiTypescript />} name="Typescript" /> */}
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
      <Divider />
      <Header>Backend </Header>
      <IconsWrapper>
        <IconWrapper icon={<IoLogoNodejs />} name="Node.js" />
        <IconWrapper icon={<SiGraphql />} name="GraphQL" />
        <IconWrapper icon={<SiFirebase />} name="Firebase" />
      </IconsWrapper>
      <Divider />
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
