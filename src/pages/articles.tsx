import { graphql, Link } from "gatsby";
import React, { useEffect, useRef, useState } from "react";
import Navigation from "../components/Navigation/Navigation";
import styled from "styled-components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BlogCard from "../components/BlogCard/BlogCard";

const Wrapper = styled.div`
  /* &::after {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 400%;
    height: 400%;
    z-index: -1;
    background-image: url(${({
    url,
  }) =>
    url});
    opacity: 0.1;
    transform: translate(-50%, -50%) rotate(45deg);
  } */
  /* height: auto; */
`;

const FeaturedImage = styled.img`
  scroll-snap-align: start;
  right: 0;
  height: 50vh;
  width: 100vw;
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
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const ImageCard = styled.div``;

const Background = styled.div<{ url: string }>`
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

    // gsap.set(background, { transformOrigin: "50% 50%" });

    // var rotate = gsap
    //   .timeline({
    //     scrollTrigger: {
    //       trigger: background,
    //       pin: true,
    //       scrub: 0.2,
    //       start: "top top",
    //       // end: "+=10000",
    //     },
    //   })
    //   .to(background, {
    //     rotation: 180,
    //     duration: 1,
    //     ease: "none",
    //   });

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
      <Background
        url={data.zigzag.childImageSharp.fixed.src}
        ref={backgroundRef}
      ></Background>
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
