import React from "react";
import styled from "styled-components";
import { HiCode } from "react-icons/hi";
import { VscCircuitBoard } from "react-icons/vsc";
import { HiOutlinePhotograph } from "react-icons/hi";
import { AiOutlineLineChart } from "react-icons/ai";

const CategoryWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  & > p {
    margin: 0 10px 0 0;
  }
  & > span {
    font-size: 1rem;
  }
`;

const Category = ({ category }) => {
  let categoryIcon;
  switch (category) {
    case "programming":
      categoryIcon = (
        <span>
          <HiCode />
        </span>
      );
      break;
    case "graphics":
      categoryIcon = (
        <span>
          <HiOutlinePhotograph />
        </span>
      );
      break;
    case "electronics":
      categoryIcon = (
        <span>
          <VscCircuitBoard />
        </span>
      );
      break;
    case "self-dev":
      categoryIcon = (
        <span>
          <AiOutlineLineChart />
        </span>
      );
      break;
    default:
      categoryIcon = (
        <span>
          <AiOutlineLineChart />
        </span>
      );
      break;
  }

  return (
    <CategoryWrapper>
      <p>{category}</p> {categoryIcon}
    </CategoryWrapper>
  );
};

export default Category;
