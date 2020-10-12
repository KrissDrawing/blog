import { Link } from "gatsby";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  height: 50px;
  display: flex;
  justify-content: center;
  position: absolute;
`;
const PageLink = styled(Link)`
  width: 50px;
  height: 50px;
  border: 2px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin: 10px 5px;
  color: ${({ currentPage }) => (currentPage ? "black" : "white")};
  background-color: ${({ currentPage }) => (currentPage ? "white" : "none")};
  font-weight: 700;
  text-decoration: none;
`;

const PageMenu = ({ currentpage, numPages }) => {
  return (
    <Wrapper>
      {Array.from({ length: numPages }).map((_, i) => (
        <PageLink
          key={i}
          currentPage={i + 1 === currentpage}
          to={`/articles${i === 0 ? "" : `/${i + 1}`}`}
        >
          {i + 1}
        </PageLink>
      ))}
    </Wrapper>
  );
};

export default PageMenu;
