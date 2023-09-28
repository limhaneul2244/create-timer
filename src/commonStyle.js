//styled components 공통부 정의
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import dotImg from "./imgs/dot.svg";
import boxImg from "./imgs/box.svg";

export const GlobalStyle = createGlobalStyle`
  ${reset}
  html {
    background: radial-gradient(293.21% 130.49% at 3.59% 5.28%, #f0f4ff 0%, #a5b6ee 100%);
  }
  body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    color: #fff;
  }
  h1 {
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`
export const ImgLayout = styled.span`
  ${(props) =>
    props.name === "countBox"
      ? `content: url(${boxImg})`
      : `content: url(${dotImg}); padding: 0 10px;`};
`;