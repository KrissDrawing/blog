import React from "react";
import styled, { css } from "styled-components";
import Character from "../Character/Character";

const Bar = css`
  width: 400px;
  height: 30px;
`;

const Wrapper = styled.div`
  ${Bar};
  position: absolute;
  border-radius: 10px;
  top: 94vh;
  left: 50%;
  transform: translate(50%, -50%);
  background-color: pink;
`;
const Goal = styled.div`
  ${Bar};
  position: relative;
  top: 0;
  left: 0;
  border-radius: 10px;
  box-sizing: content-box;
  border: thick solid white;
  background-color: #240046;
`;

const Progress = styled.div`
  ${Bar};
  width: ${({ progress }) => 400 - progress + "px"};
  position: absolute;
  border-radius: 5px;
  top: 50%;
  left: 0;
  transform: translate(5px, -10px);
  background-color: #ff9e00;
`;

const Amount = styled.div`
  position: absolute;
  display: flex;
  left: 20px;
  top: 50%;
  transform: translateY(-30%);
  z-index: 999;

  & > p {
    margin: 0;
    font-weight: bold;
    color: #240046;
    font-size: 1.2em;
  }
  & > p:nth-of-type(2) {
    font-weight: normal;
    font-size: 1.6em;
    color: #7b2cbf;
  }
`;

const CharacterWrapper = styled.div`
  transform: translate(40%, -50%) scale(0.8);
  position: absolute;
  display: flex;
  align-items: center;
  top: 0;
  right: ${({ progress }) => progress + "px"};
  & > h4 {
    margin-top: -10px;
    color: white;
  }
`;
const GoalName = styled.h3`
  color: white;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.9);
`;

const ProgressBar = ({
  amount = 50,
  goal = 100,
  name = "KrissDrawing",
  title = "follower goal",
}) => {
  const progressPositon = amount < goal ? 400 - (amount / goal) * 400 : 0;
  return (
    <Wrapper>
      <Goal></Goal>
      <Amount>
        <p>{amount}</p>
        <p>/{goal}</p>
      </Amount>
      <GoalName>{title}</GoalName>
      <Progress progress={progressPositon}></Progress>
      <CharacterWrapper progress={progressPositon}>
        <h4>Nowy:</h4>
        <Character color="#240046" name={name} />
      </CharacterWrapper>
    </Wrapper>
  );
};

export default ProgressBar;
