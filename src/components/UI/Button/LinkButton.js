import { Link } from "gatsby";
import React from "react";
import styled from "styled-components";
import { buttonStyle } from "../../../layouts/elements";

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
