import React, { useEffect, useRef } from "react";
import Navigation from "../components/Navigation/Navigation";
import Image from "gatsby-image";
import styled from "styled-components";
import PortfolioCard from "../components/Portfolio/PortfolioCard";
import PortfolioSkills from "../components/Portfolio/PortfolioSkills";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContactForm from "../components/ContactForm/ContactForm";

const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Background = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-color: black;
  background-image: url(${({ url }) => url});
  background-size: 20%;
  opacity: 0.5;
  transform: translate(-50%, -50%);
`;
const CardWrapper = styled.div`
  margin: 20px;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
`;
const Header = styled.h2`
  font-size: 50px;
  z-index: 1;
  text-shadow: 3px 3px 10px black;
  color: white;
  margin-top: -100px;

  @media (min-width: 768px) {
    font-size: 100px;
    margin-top: -10s0px;
  }
`;

const HeadingImage = styled(Image)`
  width: 100%;
  min-height: 40vh !important;
  max-height: 70vh !important;
`;

const Portfolio = ({ data }) => {
  const projects = [
    {
      title: "Twitch stream - overlay",
      tech:
        "js, gatsby, gsap, graphql, firestore, node, apollo-server-express, twitch api",
      desc: `Aplikacja do odczytywania eventów z twitch.tv (follow, subskrypcja), chat bot oraz nakładka na stream obrazująca dane eventy przy pomocy animowanych postaci.`,
      code: "https://github.com/KrissDrawing/KrissDrawing-twitch-server",
      live: "https://www.twitch.tv/krissdrawing",
      img: data.twitchOverlay.childImageSharp.fixed,
    },
    {
      title: "Personal Webpage",
      tech: "js, gatsby, gsap, DatoCMS",
      desc: `Personalna strona internetowa połączona z blogiem i portfolio. Dotatkowo UI do sterowania oświetleniem i overlay streama na twitch.tv`,
      code: "https://github.com/KrissDrawing/golden-rule",
      live: "https://krissdrawing.github.io/golden-rule/#/",
      img: data.blogMain.childImageSharp.fixed,
    },
    {
      title: "CrossyRoad Wannabe",
      tech: "js, three.js, firebase functions",
      desc: `Kopia popularnej gry CrossyRoad zrobiona w three.js. Wyniki zapisywane są w firestore przy pomocy cloud functions.
      Projekt treningowy.
      Sterowanie WSAD`,
      code: "https://github.com/KrissDrawing/blog",
      live: "https://krissdrawing.pl/",
      img: data.crossyRoad.childImageSharp.fixed,
    },
    {
      title: "5min rule",
      tech: "js, react, firebase auth, firestore, context API",
      desc: `Aplikacja do planowania zadań i odmierzania 5 minutowych interwałów.
      Umożliwia logowanie w celu zapisu tasków`,
      code: "https://github.com/KrissDrawing/golden-rule",
      live: "https://krissdrawing.github.io/golden-rule/#/",
      img: data.fivemin.childImageSharp.fixed,
    },
  ];
  const cardsRef = useRef([]);
  const wrapperRef = useRef(null);
  const headingRef = useRef(null);
  useEffect(() => {
    const cards = cardsRef.current;
    const wrapper = wrapperRef.current;
    const heading = headingRef.current;

    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(
      cards[0],
      { y: +250 },
      {
        yPercent: -200,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          scrub: true,
        },
      }
    );
    cards.forEach((card, i) => {
      if (i > 0) {
        gsap.fromTo(
          card,
          { scale: 0.8 },
          {
            y: "-=100",
            scale: 1,
            scrollTrigger: {
              trigger: cards[i - 1],
              start: "-200 top", // the default values
              end: "center top",
              scrub: true,
            },
          }
        );
      }
      gsap.to(card, {
        scrollTrigger: {
          trigger: card,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });
  }, []);
  return (
    <Wrapper bg={data.portfoliobg.childImageSharp.fixed.src} ref={wrapperRef}>
      <Navigation />
      <HeadingImage fluid={data.headingImage.childImageSharp.fluid} />
      <Header ref={headingRef}>Projekty</Header>
      {projects.map((project, i) => (
        <CardWrapper key={i} ref={el => (cardsRef.current[i] = el)}>
          <PortfolioCard index={i} project={project} />
        </CardWrapper>
      ))}
      <Background url={data.portfoliobg.childImageSharp.fixed.src} />
      <Header>Umiejętności</Header>
      <PortfolioSkills />
      <ContactForm />
    </Wrapper>
  );
};

export const query = graphql`
  {
    headingImage: file(name: { eq: "portfolio" }) {
      childImageSharp {
        fluid(maxWidth: 1920) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
    portfoliobg: file(name: { eq: "portfoliobg" }) {
      childImageSharp {
        fixed(width: 700) {
          src
        }
      }
    }
    crossyRoad: file(name: { eq: "crossyRoad" }) {
      childImageSharp {
        fixed(width: 700) {
          ...GatsbyImageSharpFixed_tracedSVG
        }
      }
    }
    fivemin: file(name: { eq: "5minrule" }) {
      childImageSharp {
        fixed(width: 700) {
          ...GatsbyImageSharpFixed_tracedSVG
        }
      }
    }
    twitchOverlay: file(name: { eq: "twitchOverlay" }) {
      childImageSharp {
        fixed(width: 700) {
          ...GatsbyImageSharpFixed_tracedSVG
        }
      }
    }
    blogMain: file(name: { eq: "blogMain" }) {
      childImageSharp {
        fixed(width: 700) {
          ...GatsbyImageSharpFixed_tracedSVG
        }
      }
    }
  }
`;

export default Portfolio;
