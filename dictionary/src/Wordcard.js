import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteWord,
  completeWord,
  completeWordFB,
  deleteWordFB,
} from "./redux/modules/chineseword";

const Wordcard = () => {
  const dispatch = useDispatch();
  const word_list = useSelector((state) => state.chineseword.list);

  const deletingWord = (event) => {
    const index = event.target.id;

    dispatch(deleteWordFB(word_list[index].id));
  };

  const completingWord = (event) => {
    const index = event.target.id;
    // console.log(word_list[index].id);
    dispatch(completeWordFB(word_list[index].id));
  };

  return (
    <Container>
      {word_list.map((list, index) => {
        return (
          <Wrap key={index} completed={list.completed}>
            <Words completed={list.completed}>
              <span>{list.단어}</span>
              <span>[{list.병음}]</span>
              <span>{list.의미}</span>
              <span style={{ color: "blue" }}>{list.예문}</span>
              <span style={{ color: "blue" }}>{list.해석}</span>
            </Words>
            <Buttons>
              <button id={index} onClick={completingWord}>
                완료
              </button>
              <Link to={`/detail/${index}`}>
                <button>수정</button>
              </Link>
              <button id={index} onClick={deletingWord}>
                삭제
              </button>
            </Buttons>
          </Wrap>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 30% 30% 30%;
  grid-template-rows: 180px; ;
`;

const Wrap = styled.div`
  border: 2px solid black;
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  margin: 10px;
  transition: 0.5s;
  background-color: ${(props) => (props.completed ? "green" : "white")};
`;
const Words = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px;
  margin-top: 20px;
  span {
    transition: 0.5s;
    color: ${(props) => (props.completed ? "white" : null)};
  }
`;
const Buttons = styled.div`
  margin: 17px 10px 0px 0px;
`;
export default Wordcard;
