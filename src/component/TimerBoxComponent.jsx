import React from "react";
import styled from "styled-components";
import dotImg from "../imgs/dot.svg";
import boxImg from "../imgs/box.svg";

const TimerBox = styled.div`
  position: relative;

  &::before {
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    color: #a5b6ee;
  }
  &:nth-of-type(1)::before {
    content: "HRS";
  }
  &:nth-of-type(2)::before {
    content: "MIN";
  }
  &:nth-of-type(3)::before {
    content: "SEC";
  }
`;
const Number = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-align: center;
`;
const ImgLayout = styled.span`
  ${(props) =>
    props.name === "countBox"
      ? `content: url(${boxImg})`
      : `content: url(${dotImg}); padding: 0 10px;`};
`;

export default function TimerBoxComponent() {
  return (
    <>
      <TimerBox>
        <Number>00</Number>
        <ImgLayout name="countBox"></ImgLayout>
      </TimerBox>
    </>
  );
}
