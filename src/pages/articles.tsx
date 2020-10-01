import { graphql, Link } from "gatsby";
import React, { useEffect, useRef, useState } from "react";
import Navigation from "../components/Navigation/Navigation";
import styled from "styled-components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Wrapper = styled.div`
  height: auto;
`;

const FeaturedImage = styled.img`
  scroll-snap-align: start;
  /* position: absolute; */
  right: 0;
  /* top: 0; */
  height: 100vh;
  width: 50vw;
  object-fit: cover;
`;

const ImageCard = styled.div``;

const ArticleCard = styled.div`
  display: flex;
  align-items: center;
`;

const ArticleTitle = styled(Link)`
  color: hsl(259, 48%, 19%);
  /* text-decoration: none; */
`;

const InfoWrapper = styled.div<{ index: number }>`
  background-color: ${({ index }) => `hsl(${index * 36},100%,76%)`};
  padding: 20px;
  box-shadow: 2px 2px 30px 1px rgba(0, 0, 0, 0.5);
  /* border-radius: 30px; */
  width: 40%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BackgroundTest = styled.div`
  width: 150%;
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
  let sectionsRef = useRef([]);
  let backgroundRef = useRef(null);
  const [state, setState] = useState([]);
  useEffect(() => {
    const images = imageRef.current;
    const sections = sectionsRef.current;
    const background = backgroundRef.current;

    // // gsap.set([logo, sign], { autoAlpha: 0 });
    // // gsap.set([...sections.current, container], { autoAlpha: 1 });
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

    sections.forEach((item, i) => {
      gsap.fromTo(
        item,
        {
          y: "-=70vh",
          autoAlpha: 0.5,
          scale: 0.7,
        },
        {
          scrollTrigger: {
            trigger: item,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
            // markers: true,
          },
          y: "+=70vh",
          autoAlpha: 1,
          scale: 1,
        }
      );
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
      //     autoAlpha: 0.2,
      //   });
      // }
    });

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
          <InfoWrapper index={i} ref={el => (sectionsRef.current[i] = el)}>
            <ArticleTitle to={`/articles/${item.slug}`}>
              <h2>{item.title}</h2>
            </ArticleTitle>
            <p>{item.author}</p>
            <p>{item.date}</p>
          </InfoWrapper>
        </ArticleCard>
      ))}
      <BackgroundTest ref={backgroundRef}></BackgroundTest>
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
        featuredimage {
          url
        }
      }
    }
  }
`;

export default Articles;
