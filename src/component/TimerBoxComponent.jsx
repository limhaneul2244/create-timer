import React from "react";
import styled from "styled-components";
import { ImgLayout } from "../commonStyle";

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


/**
 * 
 * @returns 숫자가 카운트되는 timerBox
 */
export default function TimerBoxComponent({count}) {
  return (
    <>
      <TimerBox>
        <Number>{count}</Number>
        <ImgLayout name="countBox"></ImgLayout>
      </TimerBox>
    </>
  );
}
