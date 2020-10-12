import { graphql } from "gatsby";
import React, { useEffect, useRef } from "react";
import Navigation from "../components/Navigation/Navigation";
import styled from "styled-components";
import ArticlesList from "../layouts/articlesList";
import PageMenu from "../components/PageMenu/PageMenu";
import { BiChevronsDown } from "react-icons/bi";
import gsap from "gsap/gsap-core";

const Wrapper = styled.div``;

const ScrollMore = styled.div`
  position: absolute;
  bottom: -35px;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;

  & > p {
    margin: 0;
    display: none;
  }

  > span {
    font-size: 70px;
  }

  @media (min-width: 768px) {
    left: 75%;
    bottom: 0;

    & > p {
      display: block;
    }
  }

  @media (min-width: 768px) and (max-height: 600px) {
    display: none;
  }
`;

const Background = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 400%;
  height: 400%;
  z-index: -1;
  background-image: url(${({ url }) => url});
  opacity: 0.1;
  transform: translate(-50%, -50%);
`;

const Articles = ({ data, pageContext }) => {
  const scrollMoreRef = useRef(null);

  useEffect(() => {
    const scrollMore = scrollMoreRef.current;
    const tl = gsap.timeline();
    tl.fromTo(
      scrollMore,
      { y: "-=50", autoAlpha: 0 },
      {
        y: "+=50",
        autoAlpha: 1,
      }
    ).fromTo(
      scrollMore,
      { y: "+=50", autoAlpha: 1 },
      {
        scrollTrigger: {
          trigger: scrollMore,
          start: "-500 top",
          end: "bottom bottom",
          scrub: 0.5,
        },
        y: "+=50",
        autoAlpha: 0,
      }
    );
  }, []);

  return (
    <Wrapper>
      <Navigation />
      <ArticlesList data={data} />
      <ScrollMore ref={scrollMoreRef}>
        <p>Scroll for more</p>
        <span>
          <BiChevronsDown />
        </span>
      </ScrollMore>
      <PageMenu
        currentPage={pageContext.currentPage}
        numPages={pageContext.numPages}
      />
      <Background url={data.zigzag.childImageSharp.fixed.src}></Background>
    </Wrapper>
  );
};

export const query = graphql`
  query ArticlesQuery($limit: Int = 3, $skip: Int = 0) {
    allDatoCmsArticle(limit: $limit, skip: $skip) {
      nodes {
        title
        slug
        author
        date
        category
        abstract
        featuredimage {
          url
        }
      }
    }
    zigzag: file(name: { eq: "zigzag" }) {
      childImageSharp {
        fixed(width: 200) {
          src
        }
      }
    }
  }
`;

export default Articles;
