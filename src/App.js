import './App.css';
import styled from "styled-components";
import { GlobalStyle, ImgLayout } from "./commonStyle";
import { useEffect, useRef, useState } from 'react';
import TimerBoxComponent from './component/TimerBoxComponent';

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
const Time = styled.div`
  display: flex;
  align-items: center;
  margin-top: 33px;
  margin-bottom: 40px;
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
  ${props => {
    if (props.name === 'START') {
      return `background-color: #5180ff; margin-right: 10px;`;
    } else if (props.name === 'PAUSE') {
      return `background-color: #fb7099; margin-right: 10px;`;
    } else {
      return `background-color: #14B9AE;`;
    }
  }
  };
`
function App() {
  const [count, setCount] = useState(10);
  const [toggle, setToggle] = useState(true);
  const [start, setStart] = useState('START');
  const interValId = useRef(null);

  const clearIntervalFn = () => {
    if (!interValId.current) {
      return;
    }
    console.log('log test 3')
    clearInterval(interValId.current);
    interValId.current = null;
  };

  //숫자를 화면에 그려줌
  function upDateRender(count) {
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
        upDateRender(10);
        setToggle(true);
        return 0;
      }
      return upDateRender(prev - 1);
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
      console.log(toggle)
      setStart('PAUSE');
      setToggle(false);
      return;
    }
    setStart('START');
    setToggle(true);
  }
  const handleReset = () => { upDateRender(10); }
  return (
    <>
      <GlobalStyle />
      <TimeWrap>
        <h1>TIMER</h1>
        <Time>
          <TimerBoxComponent count = {'00'}/>
          <ImgLayout name='dot'></ImgLayout>
          <TimerBoxComponent count = {'00'}/>
          <ImgLayout name='dot'></ImgLayout>
          <TimerBoxComponent count = {count}/>
        </Time>
        <div className="btnWrap">
          <BtnStyle type="button" name={start} onClick={handleStart}>{start}</BtnStyle>
          <BtnStyle type="button" name="reset" onClick={handleReset}>RESET</BtnStyle>
        </div>
      </TimeWrap>
    </>
  );
}

export default App;
