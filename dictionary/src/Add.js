import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createWordFB } from "./redux/modules/chineseword";
const Add = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const 단어 = React.useRef("");
  const 병음 = React.useRef("");
  const 의미 = React.useRef("");
  const 예문 = React.useRef("");
  const 해석 = React.useRef("");
  console.log(useSelector((state) => state));
  const creatingWord = () => {
    dispatch(
      createWordFB({
        단어: 단어.current.value,
        병음: 병음.current.value,
        의미: 의미.current.value,
        예문: 예문.current.value,
        해석: 해석.current.value,
        completed: false,
      })
    );
    history.goBack();
  };
  return (
    <Container>
      <div>
        <h1 style={{ fontSize: "20px" }}>단어추가하기</h1>
      </div>
      <Inputgroup>
        <span>단어</span>
        <input type="text" ref={단어}></input>
        <span>병음</span>
        <input type="text" ref={병음}></input>
        <span>의미</span>
        <input type="text" ref={의미}></input>
        <span>예문</span>
        <input type="text" ref={예문}></input>
        <span>해석</span>
        <input type="text" ref={해석}></input>
      </Inputgroup>
      <Btngroup>
        <button onClick={creatingWord}>저장하기</button>
        <button
          onClick={() => {
            history.goBack();
          }}
        >
          뒤로가기
        </button>
      </Btngroup>
    </Container>
  );
};

const Btngroup = styled.div`
  margin-top: 20px;
  width: 200px;
  display: flex;
  justify-content: space-between;
  button {
    background-color: green;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
  }
`;

const Container = styled.div`
  width: 40%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const Inputgroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  span {
    margin-top: 10px;
  }
  input {
    font-size: 20px;
    background-color: inherit;
    border: none;
    border-bottom: 1px solid green;
    width: 400px;
    margin: 10px 0px;
    &:focus {
      outline: none;
    }
  }
`;

export default Add;
