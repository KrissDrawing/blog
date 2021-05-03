import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
  background-color: white;
  padding: 10px;
  margin: 2px;
  transition: transform 0.2s ease-out;

  &:hover {
    transform: scale(1.2);
  }

  & > p {
    margin: 0;
  }
`;

const Icon = styled.span`
  font-size: 40px;
`;

const IconWrapper = ({ icon, name }) => {
  return (
    <Wrapper>
      <Icon>{icon}</Icon>
      <p>{name}</p>
    </Wrapper>
  );
};

export default IconWrapper;
