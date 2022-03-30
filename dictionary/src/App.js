import React from "react";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
//
import Home from "./Home";
import Add from "./Add";
import Detail from "./Detail";
import "./reset.css";
import { useDispatch, useSelector } from "react-redux";

import { loadWordFB } from "./redux/modules/chineseword";
import Spinner from "./Spinner";

function App() {
  const dispatch = useDispatch();
  const is_loaded = useSelector((state) => state.chineseword.is_loaded);
  React.useEffect(() => {
    dispatch(loadWordFB());
  }, []);
  return (
    <div
      className="App"
      style={{ backgroundColor: "aliceblue", height: "100vh" }}
    >
      <Switch>
        <>
          <Header>
            <h1>중국어 단어장</h1>
          </Header>
          <Route path="/word/add" exact>
            <Add />
          </Route>
          <Route path="/detail/:id" exact>
            <Detail />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
          {is_loaded ? null : <Spinner />}
        </>
      </Switch>
    </div>
  );
}

const Header = styled.header`
  border-bottom: 1px solid skyblue;
  margin-bottom: 20px;
  background-color: #82ccdd;
  h1 {
    font-size: 30px;
    text-align: center;
    padding: 10px 0px;
  }
`;

export default App;
