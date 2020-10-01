import React, { useRef, useEffect, useState } from "react";
import Navigation from "../components/Navigation/Navigation";
import { graphql } from "gatsby";
import Image from "gatsby-image";
import styled, { keyframes } from "styled-components";
import { ApolloProvider } from "@apollo/client";
import client from "../gatsby-theme-apollo/client";
import { gsap } from "gsap";
import { Stage, Sprite, PixiComponent } from "@inlet/react-pixi";
import * as PIXI from "pixi.js";
import * as particles from "pixi-particles";

const galaxyMove = keyframes`
  0% { background-position: -150px -150px;
    transform:  translate(-50%, -50%) rotate(0deg);
  }
  25% { background-position: 150px 100px;
    transform:  translate(-50%, -50%) rotate(90deg);
  }
  50% { background-position: -150px 150px;
    transform:  translate(-50%, -50%) rotate(180deg);}
  75% { background-position: 150px -150px;
   transform:  translate(-50%, -50%) rotate(270deg);}
  100% { background-position: -150px -150px;
    transform:  translate(-50%, -50%) rotate(360deg);}
`;

const GalaxyImage = styled.div`
  overflow: hidden;
  width: 1174px;
  height: 1000px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  &::after {
    content: "";
    width: 80%;
    height: 80%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-image: url(${({ backdrop }) => backdrop});
    background-size: contain;
    background-repeat: no-repeat;
    animation: ${galaxyMove} 70s linear infinite;
  }

  mask-image: url(${({ mask }) => mask});
  mask-repeat: no-repeat;
  mask-position: center;
`;
const SignImage = styled.img`
  position: absolute !important;
  top: 50%;
  left: 50%;
  transform: translate(-5%, 20%);
`;
const BackgroundImage = styled(Image)`
  position: absolute !important;
  width: 100% !important;
  height: 100% !important;
  top: 0;
  left: 0;
  z-index: -1;
`;

const StyledStage = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SloganWrapper = styled.div`
  position: absolute;
  top: 50vh;
  transform: translate(0, -50%);
  left: 10vw;
  display: flex;
  color: white;
  font-size: 2rem;
  font-weight: 700;
`;
const Slogan = styled.p`
  margin: 0;
  padding: 0;
  background-color: black;
  padding: 5px;
`;

const IndexPage = ({ data }) => {
  const logoRef = useRef(null);
  const signRef = useRef(null);
  const sloganRef = useRef(null);

  const emitterConfig = {
    alpha: {
      start: 0,
      end: 1,
    },
    scale: {
      start: 0.1,
      end: 0.01,
      minimumScaleMultiplier: 20,
    },
    color: {
      start: "#ff00ea",
      end: "#3fcbff",
    },
    speed: {
      start: 60,
      end: 20,
      minimumSpeedMultiplier: 1,
    },
    acceleration: {
      x: 2,
      y: 4,
    },
    maxSpeed: 0,
    startRotation: {
      min: 0,
      max: 360,
    },
    noRotation: false,
    rotationSpeed: {
      min: 20,
      max: 0,
    },
    lifetime: {
      min: 3,
      max: 4,
    },
    blendMode: "normal",
    frequency: 0.02,
    emitterLifetime: -1,
    maxParticles: 1000,
    pos: {
      x: 300,
      y: 300,
    },
    addAtBack: false,
    spawnType: "circle",
    spawnCircle: {
      x: 0,
      y: 0,
      r: 0,
    },
  };

  const Emitter = PixiComponent("Emitter", {
    create() {
      return new PIXI.Container();
    },
    applyProps(instance, oldProps, newProps) {
      const { image, config } = newProps;

      if (!this._emitter) {
        this._emitter = new particles.Emitter(
          instance,
          [PIXI.Texture.from(image)],
          config
        );

        let elapsed = Date.now();

        const t = () => {
          this._emitter.raf = requestAnimationFrame(t);
          const now = Date.now();

          this._emitter.update((now - elapsed) * 0.001);

          elapsed = now;
        };

        this._emitter.emit = true;
        t();
      }
    },
    willUnmount() {
      if (this._emitter) {
        this._emitter.emit = false;
        cancelAnimationFrame(this._emitter.raf);
      }
    },
  });

  const [sloganString, setSloganString] = useState("Programming");
  const sloganArray = ["Programming", "Graphics", "Electronics"];
  // let sloganString = "Programming";
  let iterator = 1;

  useEffect(() => {
    const logo = logoRef.current;
    const sign = signRef.current;
    gsap.set([logo, sign], { autoAlpha: 0 });
    const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });
    tl.fromTo(
      logo,
      { y: "+=100", rotation: -30 },
      { duration: 1.5, y: "-=100", rotation: 0, autoAlpha: 1 }
    ).fromTo(
      sign,
      { y: "+=100" },
      { duration: 1, y: "-=100", autoAlpha: 1 },
      "-=1"
    );
  }, []);

  let sloganInterval;
  useEffect(() => {
    sloganInterval = setInterval(() => {
      setSloganString(sloganArray[iterator % sloganArray.length]);
      iterator++;
    }, 4000);
    return () => clearInterval(sloganInterval);
  }, []);

  useEffect(() => {
    const slogan = sloganRef.current.children;
    const tl1 = gsap.timeline({ defaults: { ease: "power3.inOut" } });
    tl1
      .fromTo(
        slogan,
        { y: "30", autoAlpha: 0 },
        {
          duration: 0.3,
          stagger: { each: 0.1, from: "random" },
          y: "0",
          autoAlpha: 1,
        }
      )
      .to(
        slogan,
        {
          duration: 0.3,
          stagger: { each: 0.1, from: "random" },
          y: "-30",
          autoAlpha: 0,
        },
        "+=1"
      );
  }, [sloganString, iterator]);

  return (
    <ApolloProvider client={client}>
      <Navigation />
      <StyledStage>
        <Stage width={600} height={600} options={{ transparent: true }}>
          <Emitter
            image={data.particle.childImageSharp.fixed.src}
            config={emitterConfig}
          />
        </Stage>
      </StyledStage>
      <BackgroundImage fixed={data.background.childImageSharp.fixed} />
      <GalaxyImage
        ref={logoRef}
        mask={data.logo.childImageSharp.fluid.src}
        backdrop={data.galaxy.childImageSharp.fixed.src}
      />
      <SignImage ref={signRef} src={data.sign.childImageSharp.fixed.src} />
      <SloganWrapper ref={sloganRef}>
        {sloganString
          .toUpperCase()
          .split("")
          .map((char, i) => (
            <Slogan key={i}>{char}</Slogan>
          ))}
      </SloganWrapper>
    </ApolloProvider>
  );
};

export const query = graphql`
  {
    background: file(name: { eq: "background" }) {
      childImageSharp {
        fixed(width: 1920) {
          ...GatsbyImageSharpFixed_tracedSVG
        }
      }
    }
    logo: file(name: { eq: "logo" }) {
      childImageSharp {
        fluid(maxWidth: 294) {
          src
        }
      }
    }
    galaxy: file(name: { eq: "galaxy" }) {
      childImageSharp {
        fixed(width: 1174) {
          src
        }
      }
    }
    sign: file(name: { eq: "krissdrawing" }) {
      childImageSharp {
        fixed(width: 499) {
          src
        }
      }
    }
    particle: file(name: { eq: "particle" }) {
      childImageSharp {
        fixed(width: 40) {
          src
        }
      }
    }
  }
`;

export default IndexPage;
