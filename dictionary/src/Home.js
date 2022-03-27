import React from "react";
import Wordcard from "./Wordcard";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div>
        <Wordcard />
      </div>
      <Link to="/word/add">
        <Btn></Btn>
      </Link>
    </div>
  );
};

const Btn = styled.button`
  width: 40px;
  height: 40px;
  background-color: green;
  border-radius: 9999px;
  cursor: pointer;
`;

export default Home;
