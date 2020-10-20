import { Link } from "gatsby";
import React from "react";
import styled, { css } from "styled-components";

const buttonStyle = css`
  display: flex;
  width: fit-content;
  justify-content: space-around;
  align-items: center;
  color: black;
  text-decoration: none;
  padding: 5px 10px;
  border: 2px solid black;
  background-color: rgba(0, 0, 0, 0);

  & > p {
    margin: 0 5px 0 0;
  }
  transition: background-color 0.1s ease-out, color 0.1s ease-out;
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
  }
`;

const ButtonLink = styled(Link)`
  ${buttonStyle}
`;
const ButtonA = styled.a`
  ${buttonStyle}
`;

const LinkButton = ({ to, href, text, icon }) => {
  return (
    <>
      {href ? (
        <ButtonA target="_blank" rel="noopener noreferrer" href={href}>
          <p>{text}</p>
          {icon}
        </ButtonA>
      ) : (
        <ButtonLink to={to}>
          <p>{text}</p>
          {icon}
        </ButtonLink>
      )}
    </>
  );
};

export default LinkButton;
