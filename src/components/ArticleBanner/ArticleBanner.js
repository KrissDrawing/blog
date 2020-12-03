import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import Category from "../Category/Category";
import { CategoryDate } from "../../layouts/elements";
import { BiRightArrowAlt } from "react-icons/bi";
import { trimString } from "../../utilities/utilities";

const NewArticle = styled(Link)`
  color: white;
  text-decoration: none;
  ${({ isNew }) =>
    isNew
      ? `position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);`
      : "margin: 20px;"}

  width: 90vw;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid white;

  & > span {
    height: 96px;
    display: flex;
    align-items: center;
    /* padding: 20px 5px; */
    font-size: 60px;
    border-left: 2px solid white;
  }
  & > div {
    margin: auto;
  }

  @media (min-width: 900px) {
    width: 50vw;
  }
`;

const Badge = styled.p`
  margin: 0;
  padding: 0;
  line-height: 30px;
  font-size: 35px;
  transform: translate(-17%, 0) rotate(-90deg);
  border-bottom: 2px solid white;
`;

const ArticleBanner = ({ item, isNew }) => {
  return (
    <NewArticle isNew={isNew} to={`/articles/${item.slug}`}>
      <Badge>
        {isNew ? "NEW" : "NEXT"}
        <br /> POST
      </Badge>
      <div>
        <h2>{trimString(item.title, 30)}</h2>
        <CategoryDate>
          <p>{new Date(item.date).toLocaleString()}</p>
          <Category category={item.category} />
        </CategoryDate>
      </div>
      <span>
        <BiRightArrowAlt />
      </span>
    </NewArticle>
  );
};

export default ArticleBanner;
