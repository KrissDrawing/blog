import { ApolloProvider, gql, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import client from "../gatsby-theme-apollo/client";
import { HuePicker, AlphaPicker } from "react-color";

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

  const [brightness, setBrightness] = useState(0);
  const [mutateBrightness, { brightnessData }] = useMutation(
    mutateQueryBrightness
  );
  const [mutateColor, { colorData }] = useMutation(mutateQueryColor);
  const [lightColor, setLightColor] = useState({
    r: 255,
    g: 0,
    b: 0,
    a: 1,
  });

  let colorMemory;

  useEffect(() => {
    colorMemory = JSON.parse(localStorage.getItem("colorMemory"));
    console.log(colorMemory);
    setLightColor({
      r: colorMemory.r,
      g: colorMemory.g,
      b: colorMemory.b,
      a: colorMemory.a,
    });
    console.log(lightColor);
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
  };

  return (
    <ApolloProvider client={client}>
      <button
        onClick={() =>
          handleChangeComplete({ rgb: { r: 0, g: 0, b: 0, a: 0 } }, true)
        }
      >
        ON/OFF
      </button>
      <input
        value={brightness}
        onChange={e => setBrightness(e.target.value)}
        type="number"
        min="0"
        max="255"
      />
      <button>Set Brightness</button>
      <HuePicker color={lightColor} onChangeComplete={handleChangeComplete} />
      <AlphaPicker
        color={lightColor}
        onChangeComplete={color => handleChangeComplete(color, true)}
      />
      {/* {console.log(brightness)} */}
    </ApolloProvider>
  );
};

export default Controlls;
