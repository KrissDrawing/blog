import React from "react";
import styled, { css } from "styled-components";

const Bar = css`
  width: 400px;
  height: 30px;
`;

const Wrapper = styled.div`
  ${Bar};
  position: relative;
  top: 50px;
  left: 300px;
  overflow: hidden;
  background-color: black;
`;

const Progress = styled.div`
  ${Bar};
  position: absolute;
  top: 0;
  right: ${({ progress }) => 400 - progress * 400 + "px"};
  background-color: red;
`;

const Amount = styled.p`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate(50%, -50%);
  z-index: 999;
`;

const ProgressBar = ({ amount = 50, goal = 100 }) => {
  return (
    <Wrapper>
      <Amount>{`${amount}/${goal}`}</Amount>
      <Progress progress={amount / goal}></Progress>
    </Wrapper>
  );
};

export default ProgressBar;
