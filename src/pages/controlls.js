import { ApolloProvider, gql, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import client from "../gatsby-theme-apollo/client";
import { HuePicker, AlphaPicker } from "react-color";
import { FaPowerOff } from "react-icons/fa";
import Login from "../components/Login/Login";
import Logout from "../components/Login/Logout";
import ColorTempPicker from "../components/ColorTempPicker/ColorTempPicker";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionPickerWrapper = styled.div`
  display: flex;
  color: white;
`;
const SectionInput = styled.input`
  margin: 5px;
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

const mutateQueryColorAmbient = gql`
  mutation setColorAmbient(
    $r: Int = 0
    $g: Int = 0
    $b: Int = 0
    $a: Float = 0
  ) {
    setColorAmbient(topic: "test/1/env", r: $r, g: $g, b: $b, a: $a) {
      r
      g
      b
      a
    }
  }
`;
const mutateQueryColorMain = gql`
  mutation setColorMain($r: Int = 0, $g: Int = 0, $b: Int = 0, $a: Float = 0) {
    setColorMain(r: $r, g: $g, b: $b, a: $a) {
      r
      g
      b
      a
    }
  }
`;

const getUser = gql`
  {
    me {
      email
    }
  }
`;

const Controlls = () => {
  const windowGlobal = typeof window !== "undefined" && window;
  const localStorage = windowGlobal.localStorage;

  const [mutateColorAmbient] = useMutation(mutateQueryColorAmbient);
  const [mutateColorMain] = useMutation(mutateQueryColorMain);
  const [onOff, setOnOff] = useState(true);
  const [lightSections, setLightSections] = useState([
    { name: "main", isChecked: false },
    { name: "ambient", isChecked: false },
  ]);
  const [memoryBrightness, setMemoryBrightness] = useState(0.1);

  const { loading, error, data } = useQuery(getUser);
  // if (loading) return "Loading...";
  // if (error) return `Error! ${error.message}`;

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
    if (lightSections[1].isChecked) {
      mutateColorAmbient({
        variables: {
          r: lightColor.r,
          g: lightColor.g,
          b: lightColor.b,
          a: lightColor.a,
        },
      });
    }
    if (lightSections[0].isChecked) {
      mutateColorMain({
        variables: {
          r: lightColor.r,
          g: lightColor.g,
          b: lightColor.b,
          a: lightColor.a,
        },
      });
    }

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

  const handleCheckChieldElement = event => {
    let sections = lightSections;
    sections.forEach(section => {
      if (section.name === event.target.name)
        section.isChecked = event.target.checked;
    });
    setLightSections({ ...lightSections, sections });
  };

  let content;

  if (data && data.me) {
    content = (
      <>
        <Logout />

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
          <SectionPickerWrapper>
            <div>
              <SectionInput
                onClick={handleCheckChieldElement}
                type="checkbox"
                name="main"
              />
              <label htmlFor="main">Main</label>
            </div>

            <div>
              <SectionInput
                onClick={handleCheckChieldElement}
                type="checkbox"
                name="ambient"
              />
              <label htmlFor="ambient">Ambient</label>
            </div>
          </SectionPickerWrapper>
          <p>Pick Color</p>
          <HuePicker
            width="100%"
            height="40px"
            pointer={CustomPointer}
            color={lightColor}
            onChangeComplete={handleChangeComplete}
          />
          <ColorTempPicker setColor={handleChangeComplete} />
          <p>Pick Brightness: {Math.round(lightColor.a * 100)}%</p>
          <AlphaPicker
            color={lightColor}
            onChangeComplete={color => handleChangeComplete(color, true)}
            width="100%"
            height="40px"
            pointer={CustomPointer}
          />
          {lightSections[1].isChecked === true ? <h1>ITS WORKIN</h1> : null}
        </ColorPickers>
      </>
    );
  } else {
    content = <Login />;
  }

  return (
    <ApolloProvider client={client}>
      <Wrapper>{content}</Wrapper>
    </ApolloProvider>
  );
};

export default Controlls;
