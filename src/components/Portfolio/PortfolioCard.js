import React from "react";
import styled from "styled-components";
import Image from "gatsby-image";
import { FaGithub } from "react-icons/fa";
import LinkButton from "../UI/Button/LinkButton";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { BreakLine } from "../../layouts/elements";

const Wrapper = styled.div`
  background-color: ${({ index }) => `hsl(${index * 36 + 200},100%,76%)`};
  border: 2px solid black;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  height: 100%;
  padding: 20px;
  box-shadow: 2px 2px 40px 2px rgba(0, 0, 0, 0.7);

  @media (min-width: 768px) {
    flex-direction: row;
  }
  @media (min-width: 1000px) {
    width: 70%;
  }
`;
const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

const StyledImage = styled(Image)`
  border: 2px solid black;
  width: 80% !important;
  height: 300px !important;
  object-fit: contain;
  box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.4);

  @media (min-width: 768px) {
    width: 50% !important;
    height: 500px !important;
  }
`;

const InfoWrapper = styled.div`
  width: 100%;
  height: 300px;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: space-around;
  @media (min-width: 768px) {
    width: 50%;
    height: 500px;
  }
`;
const Description = styled.p`
  display: block;
  height: 40%;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  margin: 0;
  padding: 10px;
`;

const Technologies = styled.p`
  margin: 0;
`;

const PortfolioCard = ({
  project: {
    title = "CrossyRoad Wannabe",
    desc = "Lorem ipsum dolor sit amet, consectetur adip, Lorem ipsum dolor sit amet, consectetur adipm",
    tech = "js, node",
    img,
    code,
    live,
  },
  index,
}) => {
  return (
    <Wrapper index={index}>
      <InfoWrapper>
        <div>
          <h3>{title}</h3>
          <BreakLine />
          <Technologies>{tech}</Technologies>
        </div>
        <Description>{desc}</Description>

        <ButtonsWrapper>
          <LinkButton href={code} text="code" icon={<FaGithub />} />
          {live ? (
            <LinkButton
              href={live}
              text="live"
              icon={<AiOutlinePlayCircle />}
            />
          ) : null}
        </ButtonsWrapper>
      </InfoWrapper>
      <StyledImage fixed={img} />
    </Wrapper>
  );
};

export default PortfolioCard;
