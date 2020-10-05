import { graphql, Link } from "gatsby";
import React, { useEffect, useRef, useState } from "react";
import Navigation from "../components/Navigation/Navigation";
import styled from "styled-components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BlogCard from "../components/BlogCard/BlogCard";

const Wrapper = styled.div`
  /* height: auto; */
`;

const FeaturedImage = styled.img`
  scroll-snap-align: start;
  right: 0;
  height: 100vh;
  width: 50vw;
  object-fit: cover;
`;
const ArticleCard = styled.div`
  display: flex;
  align-items: center;
`;

const ImageCard = styled.div``;

const BackgroundTest = styled.div`
  width: 100%;
  height: 30px;
  background-color: black;
  /* transform: translateY(50vh) rotate(45deg); */
  position: absolute;
  top: 0;
`;

interface Props {
  data: any;
}

const Articles = ({ data }: Props) => {
  let imageRef = useRef([]);
  let backgroundRef = useRef(null);
  const [state, setState] = useState([]);
  useEffect(() => {
    const images = imageRef.current;
    const background = backgroundRef.current;

    gsap.registerPlugin(ScrollTrigger);
    const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });
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
            start: "-400 top",
            end: "bottom bottom",
            scrub: 1.5,
            // markers: true,
          },
          autoAlpha: 1,
          x: "+=300",
        }
      );
    });

    // if (i > 0) {
    //   gsap.to(sections[i - 1], {
    //     scrollTrigger: {
    //       trigger: item,
    //       start: "top center",
    //       end: "bottom bottom",
    //       scrub: 0.5,
    //       markers: true,
    //     },
    //     y: "+=70vh",
    //     autoAlpha: 0.5,
    //   });
    // }
    // });

    // sections.forEach((item, i) => {
    //   if (i > 0) {
    //   }
    // });

    // ScrollTrigger.create({
    //   snap: {
    //     snapTo: 1 / (sections.length - 1),
    //     duration: 0.1,
    //   },
    // });
    // gsap.to(sections, {
    //   yPercent: -100 * (sections.length - 1),
    //   ease: "none",
    //   scrollTrigger: {
    //     trigger: container.current,
    //     pin: true,
    //     markers: true,
    //     scrub: true,
    //     snap: 1 / (sections.length - 1),
    //     end: () => "+=" + container.current.offsetHeight,
    //   },
    // });
  }, [imageRef]);

  return (
    <Wrapper>
      <Navigation />
      {data.allDatoCmsArticle.nodes.map((item, i) => (
        <ArticleCard key={item.slug}>
          <ImageCard ref={el => (imageRef.current[i] = el)}>
            <FeaturedImage src={item.featuredimage.url} />
          </ImageCard>
          <BlogCard item={item} i={i} />
        </ArticleCard>
      ))}
      {/* <BackgroundTest ref={backgroundRef}></BackgroundTest> */}
    </Wrapper>
  );
};

export const query = graphql`
  query MyQuery {
    allDatoCmsArticle {
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
  }
`;

export default Articles;
