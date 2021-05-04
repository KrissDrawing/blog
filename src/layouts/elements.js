import styled, { css } from "styled-components";

export const CategoryDate = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  font-size: ${({ large }) => (large ? "1rem" : "0.7rem")};
  font-weight: 700;

  & > * {
    padding: 5px;
    margin: 0;
  }
  & > span {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const BreakLine = styled.hr`
  width: 100%;
  border-bottom: 2px solid ${({ light }) => (light ? "white" : "black")};
  background: none;
  margin: ${({ margin }) => (margin ? "5px 0 20px 0" : "0")};
`;

export const buttonStyle = css`
  display: flex;
  width: fit-content;
  justify-content: space-around;
  align-items: center;
  color: black;
  text-decoration: none;
  padding: 5px 10px;
  border: 2px solid black;
  background-color: rgba(255, 255, 255, 0.8);
  font-weight: bold;

  & > p {
    margin: 0 5px 0 0;
  }
  transition: background-color 0.1s ease-out, color 0.1s ease-out;
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
  }
`;
