import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { completeWordFB, deleteWordFB } from "./redux/modules/chineseword";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";

const Wordcard = () => {
  const dispatch = useDispatch();
  const word_list = useSelector((state) => state.chineseword.list);

  const deletingWord = (event) => {
    const index = event.target.id;

    dispatch(deleteWordFB(word_list[index].id));
  };

  const completingWord = (event) => {
    const index = event.target.id;
    dispatch(completeWordFB(word_list[index].id));
  };

  return (
    <Container>
      {word_list.map((list, index) => {
        return (
          <Wrap key={index} completed={list.completed}>
            <Words completed={list.completed}>
              <span id="word1">{list.단어}</span>
              <span id="word2">[{list.병음}]</span>
              <span id="word3">{list.의미}</span>
              <span id="word4" style={{ color: "blue" }}>
                {list.예문}
              </span>
              <span id="word4" style={{ color: "blue" }}>
                {list.해석}
              </span>
            </Words>
            <Buttons>
              <button onClick={completingWord}>
                <CheckRoundedIcon id={index} />
              </button>
              <Link to={`/detail/${index}`}>
                <button>
                  <EditRoundedIcon />
                </button>
              </Link>
              <button onClick={deletingWord}>
                <DeleteForeverRoundedIcon id={index} />
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
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 180px;
  grid-column-gap: 20px;
`;

const Wrap = styled.div`
  border: 2px solid blue;
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  margin: 10px;
  transition: 0.5s;
  background-color: ${(props) => (props.completed ? "#82ccdd" : "white")};
  height: 150px;
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
  #word1 {
    font-size: 25px;
    margin-bottom: 3px;
    font-weight: 600;
  }
  #word2 {
    font-size: 15px;
    margin-bottom: 5px;
  }
  #word3 {
    margin-bottom: 15px;
  }
  #word4 {
    margin-bottom: 5px;
  }
`;
const Buttons = styled.div`
  margin: 17px 10px 0px 0px;
  button {
    background: rgba(113, 193, 213, 0.2);
    border: none;
    cursor: pointer;
    border-radius: 7px;
  }
`;
export default Wordcard;
