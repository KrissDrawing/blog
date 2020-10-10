import { Link } from "gatsby";
import gsap from "gsap/gsap-core";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { BiRightArrowAlt } from "react-icons/bi";
import Category from "../Category/Category";
import { BreakLine, CategoryDate } from "../../layouts/elements";

const InfoWrapper = styled.div`
  background-color: ${({ index }) => `hsl(${index * 36},100%,76%)`};
  padding: 20px;
  box-shadow: 2px 2px 30px 1px rgba(0, 0, 0, 0.5);
  border: 3px solid black;
  width: 90%;
  margin: 10px auto 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (min-height: 800px) {
    margin: auto;
  }

  @media (min-width: 768px) {
    width: 40%;
  }
`;

const ArticleTitle = styled(Link)`
  color: black;
  text-decoration: none;
  h2 {
    margin-bottom: 10px;
    padding: 0;
  }
`;

const Abstract = styled.p`
  background-color: rgba(0, 0, 0, 0.8);
  padding: 10px;
  color: white;
  border: 2px solid black;
  overflow: hidden;
  max-height: 100px;
  font-size: 0.7rem;

  @media (min-width: 768px) and (min-height: 500px) { {
    max-height: 200px;
  }
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
    /* const section = sectionRef.current;
     console.log(section);
     gsap.fromTo(
       section,
       {
         x: "-=15vh",
       },
       {
         scrollTrigger: {
           trigger: section,
           start: "-400 top",
           end: "bottom bottom",
           scrub: 1.5,
           markers: true,
         },
         x: "+=15vh",
       }
     ); */
  }, [sectionRef]);

  return (
    <InfoWrapper index={i} ref={el => (sectionRef.current = el)}>
      <ArticleTitle to={`/articles/${item.slug}`}>
        <h2>{item.title}</h2>
      </ArticleTitle>
      {/* <p>{item.author}</p> */}
      <BreakLine />
      <CategoryDate>
        <p>Added: {new Date(item.date).toLocaleString()}</p>
        <Category category={item.category} />
      </CategoryDate>
      {/* <BreakLine /> */}

      <Abstract>{item.abstract}</Abstract>
      <ArticleButton to={`/articles/${item.slug}`}>
        <p>See Article</p>
        <BiRightArrowAlt />
      </ArticleButton>
    </InfoWrapper>
  );
};

export default BlogCard;
