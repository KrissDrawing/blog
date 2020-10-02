import React from "react";
import * as PIXI from "pixi.js";
import * as particles from "pixi-particles";
import { PixiComponent, Stage } from "@inlet/react-pixi";
import { graphql, useStaticQuery } from "gatsby";
import styled from "styled-components";

const StyledStage = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoParticle = () => {
  const data = useStaticQuery(graphql`
    query {
      particle: file(name: { eq: "particle" }) {
        childImageSharp {
          fixed(width: 40) {
            src
          }
        }
      }
    }
  `);

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

  return (
    <StyledStage>
      <Stage width={600} height={600} options={{ transparent: true }}>
        <Emitter
          image={data.particle.childImageSharp.fixed.src}
          config={emitterConfig}
        />
      </Stage>
    </StyledStage>
  );
};

export default LogoParticle;
