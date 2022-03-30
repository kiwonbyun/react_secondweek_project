import React from "react";
import Wordcard from "./Wordcard";
import styled from "styled-components";
import { Link } from "react-router-dom";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

const Home = () => {
  return (
    <div>
      <div style={{ display: "grid", placeItems: "center", width: "100%" }}>
        <Wordcard />
      </div>
      <Link to="/word/add">
        <Btn>
          <AddRoundedIcon style={{ fontSize: "40px", color: "white" }} />
        </Btn>
      </Link>
    </div>
  );
};

const Btn = styled.button`
  width: 50px;
  height: 50px;
  background-color: #82ccdd;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  position: fixed;
  bottom: 80px;
  right: 80px;
  z-index: 9999;
`;

export default Home;
