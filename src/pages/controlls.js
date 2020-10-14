import { ApolloProvider, gql, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import client from "../gatsby-theme-apollo/client";
import { HuePicker, AlphaPicker } from "react-color";
import { FaPowerOff } from "react-icons/fa";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ColorPickers = styled.div`
  width: 500px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 20px;

  & > p {
    color: white;
    margin: 5px;
  }
`;

const CustomPointer = styled.div`
  width: 20px;
  height: 40px;
  border: 4px solid white;
  transform: translateX(-50%);
  overflow: hidden;
`;

const PowerButton = styled.button`
  width: 50px;
  height: 50px;
  display: flex;
  background: none;
  border: 2px solid ${({ onOff }) => (onOff ? "green" : "black")};
  color: ${({ onOff }) => (onOff ? "green" : "black")};
  & > * {
    margin: auto;
  }
  margin: 20px;
`;

const mutateQueryBrightness = gql`
  mutation setBrightness($brightness: Int = 0) {
    setBrightness(topic: "test/1/env", brightness: $brightness) {
      brightness
    }
  }
`;

const mutateQueryColor = gql`
  mutation setColor($r: Int = 0, $g: Int = 0, $b: Int = 0, $a: Float = 0) {
    setColor(topic: "test/1/env", r: $r, g: $g, b: $b, a: $a) {
      r
      g
      b
      a
    }
  }
`;

const Controlls = () => {
  const windowGlobal = typeof window !== "undefined" && window;
  const localStorage = windowGlobal.localStorage;

  const [mutateColor, { colorData }] = useMutation(mutateQueryColor);
  const [onOff, setOnOff] = useState(true);
  const [memoryBrightness, setMemoryBrightness] = useState(0.1);

  const [lightColor, setLightColor] = useState({
    r: 255,
    g: 0,
    b: 0,
    a: 1,
  });

  let colorMemory;

  useEffect(() => {
    colorMemory = JSON.parse(localStorage.getItem("colorMemory"));
    setLightColor({
      r: colorMemory.r,
      g: colorMemory.g,
      b: colorMemory.b,
      a: colorMemory.a,
    });
  }, []);
  useEffect(() => {
    mutateColor({
      variables: {
        r: lightColor.r,
        g: lightColor.g,
        b: lightColor.b,
        a: lightColor.a,
      },
    });

    return () => {
      localStorage.setItem("colorMemory", JSON.stringify(lightColor));
    };
  }, [lightColor]);

  const handleChangeComplete = (color, isAlpha) => {
    setLightColor({
      r: color.rgb.r,
      g: color.rgb.g,
      b: color.rgb.b,
      a: isAlpha ? color.rgb.a : lightColor.a,
    });
    color.rgb.a !== 0 ? setOnOff(true) : setOnOff(false);
  };

  return (
    <ApolloProvider client={client}>
      <Wrapper>
        <PowerButton
          onOff={onOff}
          onClick={() => {
            if (lightColor.a !== 0) setMemoryBrightness(lightColor.a);
            setOnOff(prev => !prev);
            handleChangeComplete(
              {
                rgb: {
                  r: lightColor.r,
                  g: lightColor.g,
                  b: lightColor.b,
                  a: onOff === true ? 0 : memoryBrightness,
                },
              },
              true
            );
          }}
        >
          <FaPowerOff />
        </PowerButton>
        <ColorPickers>
          <p>Pick Color</p>
          <HuePicker
            width="100%"
            height="40px"
            pointer={CustomPointer}
            color={lightColor}
            onChangeComplete={handleChangeComplete}
          />
          <p>Pick Brightness: {Math.round(lightColor.a * 100)}%</p>
          <AlphaPicker
            color={lightColor}
            onChangeComplete={color => handleChangeComplete(color, true)}
            width="100%"
            height="40px"
            pointer={CustomPointer}
          />
        </ColorPickers>
      </Wrapper>
    </ApolloProvider>
  );
};

export default Controlls;
