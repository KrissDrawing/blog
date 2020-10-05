import { Link } from "gatsby";
import gsap from "gsap/gsap-core";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { BiRightArrowAlt } from "react-icons/bi";
import { HiCode } from "react-icons/hi";
import { VscCircuitBoard } from "react-icons/vsc";
import { HiOutlinePhotograph } from "react-icons/hi";
import { AiOutlineLineChart } from "react-icons/ai";

const InfoWrapper = styled.div`
  background-color: ${({ index }) => `hsl(${index * 36},100%,76%)`};
  padding: 20px;
  box-shadow: 2px 2px 30px 1px rgba(0, 0, 0, 0.5);
  /* border-radius: 30px; */
  border: 3px solid white;
  width: 40%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ArticleTitle = styled(Link)`
  /* color: hsl(259, 48%, 19%); */
  color: black;
  text-decoration: none;
  h2 {
    margin-bottom: 10px;
    padding: 0;
  }
`;

const BreakLine = styled.hr`
  width: 100%;
  border-top: 2px solid black;
  background: none;
  margin: 0;
`;

const CategoryDate = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  font-size: 0.7rem;

  & > * {
    padding: 5px;
    margin: 0;
  }
`;

const CategoryWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  & > p {
    margin: 0;
  }
  & > span {
    font-size: 1rem;
  }
`;

const Abstract = styled.p`
  overflow: hidden;
  max-height: 130px;
  font-size: 0.7rem;
`;

const ArticleButton = styled(Link)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: black;
  text-decoration: none;
  padding: 5px 10px;
  border: 2px solid black;

  & > p {
    margin: 0 5px 0 0;
  }
`;

const BlogCard = ({ item, i }) => {
  let sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    console.log(section);
    gsap.fromTo(
      section,
      {
        x: "+=5vw",
        y: "-=70vh",
        autoAlpha: 0.5,
        scale: 0.6,
      },
      {
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          markers: true,
        },
        y: "+=70vh",
        x: "-=15vw",
        autoAlpha: 1,
        scale: 1.2,
      }
    );
  }, [sectionRef]);

  let categoryIcon;
  switch (item.category) {
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
  }

  return (
    <InfoWrapper index={i} ref={el => (sectionRef.current = el)}>
      <ArticleTitle to={`/articles/${item.slug}`}>
        <h2>{item.title}</h2>
      </ArticleTitle>
      {/* <p>{item.author}</p> */}
      <BreakLine />
      <CategoryDate>
        <p>Added: {new Date(item.date).toLocaleString()}</p>
        <CategoryWrapper>
          <p>{item.category}</p> {categoryIcon}
        </CategoryWrapper>
      </CategoryDate>
      <BreakLine />

      <Abstract>{item.abstract}</Abstract>
      <ArticleButton to={`/articles/${item.slug}`}>
        <p>See Article</p>
        <BiRightArrowAlt />
      </ArticleButton>
    </InfoWrapper>
  );
};

export default BlogCard;
