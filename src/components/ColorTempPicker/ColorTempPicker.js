import React from "react";
import styled from "styled-components";
import { kelvinTable } from "../../utilities/KelvinToRGB";

const Wrapper = styled.div`
  display: flex;
`;
const Button = styled.button`
  background-color: ${({ colorButton }) =>
    `rgb(${colorButton.r}, ${colorButton.g}, ${colorButton.b})`};
  padding: 10px;
  border: none;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
    /* background-color: black; */
  }
  &:hover::after {
    border: 2px solid black;
  }
`;

const ColorTempPicker = ({ setColor }) => {
  const colorButtons = [
    { 2700: kelvinTable["2700"] },
    { 3000: kelvinTable["3000"] },
    { 3500: kelvinTable["3500"] },
    { 4000: kelvinTable["4000"] },
    { 5000: kelvinTable["5000"] },
    { 6500: kelvinTable["6500"] },
  ];

  return (
    <>
      <p>Color Temperature [K]</p>
      <Wrapper>
        {colorButtons.map((colorButton, i) => (
          <Button
            onClick={() =>
              setColor(
                { rgb: { ...colorButton[Object.keys(colorButton)], a: 1 } },
                true
              )
            }
            key={i}
            colorButton={colorButton[Object.keys(colorButton)]}
          >
            {Object.keys(colorButton)}
          </Button>
        ))}
      </Wrapper>
    </>
  );
};

export default ColorTempPicker;
