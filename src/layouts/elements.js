import styled from "styled-components";

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
  border-bottom: 2px solid black;
  background: none;
  margin: 0;
`;
