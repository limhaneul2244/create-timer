import './App.css';
import styled, { createGlobalStyle } from "styled-components"
import reset from "styled-reset"
import dotImg from './imgs/dot.svg';
import boxImg from './imgs/box.svg';
import { useCallback, useEffect, useRef, useState } from 'react';

const GlobalStyle = createGlobalStyle`
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
const TimeWrap = styled.article`
  margin: auto auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 400px;
  height: 360px;
  box-shadow: 20px 20px 60px 10px rgba(55, 75, 124, 0.4);
  border-radius: 16px;
  background: linear-gradient(144deg, #5572bb 2.13%, #374b7c 102.97%);
  padding: 40px 44px;
  box-sizing: border-box;
`
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
`
const Time = styled.div`
  display: flex;
  align-items: center;
  margin-top: 33px;
  margin-bottom: 40px;
`
const TimerBox = styled.div`
  position: relative;

  &::before {
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    color: #A5B6EE;
  }
  &:nth-of-type(1)::before {
    content: 'HRS';
  }
  &:nth-of-type(2)::before {
    content: 'MIN';
  }
  &:nth-of-type(3)::before {
    content: 'SEC';
  }
`
const ImgLayout = styled.span`
  ${(props) => props.name === 'countBox' ?
    `content: url(${boxImg})` : `content: url(${dotImg}); padding: 0 10px;`};
`
const BtnStyle = styled.button`
  padding: 16px 23px;
  border-radius: 30px;
  border: none;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: #fff;
  ${(props) => props.name === 'start' ?
    `background-color: #5180ff; margin-right: 10px;` :
    `background-color: #fb7099`};
`
function App() {
  const [count, setCount] = useState(10);
  const [toggle, setToggle] = useState(true);
  const [start, setStart] = useState('START');
  const interValId = useRef(null);

  const clearIntervalFn = () => {
    if (!interValId.current) {
      console.log('log2')
      return;
    }
    console.log('log3')
    clearInterval(interValId.current);
    interValId.current = null;
  };

  //숫자를 화면에 그려줌
  function render(count) {
    if (count >= 10) {
      setCount(count);
      return;
    }
    setCount(`0${count}`);
  }

  const handleCountDown = () => {
    setCount(prev => {
      if (prev <= 0) { //1보다 작을경우
        console.log("prev : ", prev)
        clearIntervalFn();
        alert('종료');
        setStart('START');
        render(10);
        return 0;
      }
      return render(prev - 1);
    });
  };

  useEffect(() => {
    if (!toggle) {//toggle버튼이 pause일때
      clearIntervalFn(); //setInterval 정리
      const timerId = setInterval(handleCountDown, 1000);
      interValId.current = timerId;
    } else { // toggle이 true일 때 (PAUSE 상태)
      clearIntervalFn();
    }
    return () => clearIntervalFn();
  }, [toggle]);


  const handleStart = () => {
    if (toggle) {
      setStart('PAUSE');
      setToggle(false);
      return;
    }
    setStart('START');
    setToggle(true);
  }
  const handleReset = () => { }
  return (
    <>
      <GlobalStyle />
      <TimeWrap>
        <h1>TIMER</h1>
        <Time>
          <TimerBox>
            <Number>00</Number>
            <ImgLayout name='countBox'></ImgLayout>
          </TimerBox>
          <ImgLayout name='dot'></ImgLayout>
          <TimerBox>
            <Number>00</Number>
            <ImgLayout name='countBox'></ImgLayout>
          </TimerBox>
          <ImgLayout name='dot'></ImgLayout>
          <TimerBox>
            <Number>{count}</Number>
            <ImgLayout name='countBox'></ImgLayout>
          </TimerBox>
        </Time>
        <div className="btnWrap">
          <BtnStyle type="button" name="start" onClick={handleStart}>{start}</BtnStyle>
          <BtnStyle type="button" name="reset" onClick={handleReset}>RESET</BtnStyle>
        </div>
      </TimeWrap>
    </>
  );
}

export default App;
