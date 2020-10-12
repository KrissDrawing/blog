import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import BlogCard from "../components/BlogCard/BlogCard";

const FeaturedImage = styled.img`
  scroll-snap-align: start;
  right: 0;
  height: 50vh;
  width: 100vw;
  margin: 0;
  object-fit: cover;

  @media (min-width: 768px) {
    height: 100vh;
    width: 50vw;
  }
`;
const ArticleCard = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 0;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const ImageCard = styled.div``;

const ArticlesList = ({ data }) => {
  let imageRef = useRef([]);
  useEffect(() => {
    const images = imageRef.current;

    gsap.registerPlugin(ScrollTrigger);
    images.forEach((item, i) => {
      gsap.fromTo(
        item,
        {
          autoAlpha: 0,
          x: "-=300",
        },
        {
          scrollTrigger: {
            trigger: item,
            start: "-400 400",
            end: "bottom bottom",
            scrub: 1.5,
            // markers: true,
          },
          autoAlpha: 1,
          x: "+=300",
        }
      );
    });
  }, [imageRef]);

  return (
    <>
      {data.allDatoCmsArticle.nodes.map((item, i) => (
        <ArticleCard key={item.slug}>
          <ImageCard ref={el => (imageRef.current[i] = el)}>
            <FeaturedImage src={item.featuredimage.url} />
          </ImageCard>
          <BlogCard item={item} i={i} />
        </ArticleCard>
      ))}
    </>
  );
};

export default ArticlesList;
