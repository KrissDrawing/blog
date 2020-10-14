import { graphql } from "gatsby";
import React, { useEffect, useRef } from "react";
import Navigation from "../components/Navigation/Navigation";
import styled from "styled-components";
import ArticlesList from "./articlesList";
import PageMenu from "../components/PageMenu/PageMenu";
import { BiChevronsDown } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
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
  color: black;

  & > p {
    margin: 0;
    font-weight: 700;
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

const BackgroundAnimations = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
`;

const BgWrapper1 = styled.div`
  width: 700px;
  height: 700px;
  position: absolute;
  top: 20%;
  right: 100px;
  transform: translate(50%, -50%);
  border-radius: 50%;
  overflow: hidden;
  font-size: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BgWrapper2 = styled.div`
  width: 1000px;
  height: 1000px;
  position: absolute;
  top: 70%;
  transform: translate(50%, -50%);
  right: 50%;
  font-size: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BgWrapper3 = styled.div`
  width: 500px;
  height: 500px;
  position: absolute;
  top: 80%;
  right: 10%;
  transform: translate(50%, -50%);
  font-size: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BgWrapper4 = styled.div`
  width: 500px;
  height: 500px;
  position: absolute;
  top: 30%;
  right: 40%;
  transform: translate(50%, -50%);
  font-size: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

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

const Articles = ({ data, pageContext }) => {
  const scrollMoreRef = useRef(null);
  const bgAnimRef = useRef(null);

  useEffect(() => {
    const scrollMore = scrollMoreRef.current;
    const bgAnim = bgAnimRef.current.children;

    for (let i = 0; i <= 3; i++) {
      gsap.to(bgAnim[i], {
        scrollTrigger: {
          trigger: bgAnim[i],
          start: "top center",
          end: "6000 top",
          scrub: 1,
          // markers: true,
        },
        // repeat: -1,
        rotation: i * 50 + 360,
        transformOrigin: "50% 50%",
        ease: "none",
      });
    }
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
        currentpage={pageContext.currentPage}
        numPages={pageContext.numPages}
      />
      <Background url={data.zigzag.childImageSharp.fixed.src}></Background>
      <BackgroundAnimations ref={bgAnimRef}>
        <BgWrapper1>
          <FiSettings />
        </BgWrapper1>
        <BgWrapper2>
          <FiSettings />
        </BgWrapper2>
        <BgWrapper3>
          <FiSettings />
        </BgWrapper3>
        <BgWrapper4>
          <FiSettings />
        </BgWrapper4>
      </BackgroundAnimations>
    </Wrapper>
  );
};

export default Articles;
