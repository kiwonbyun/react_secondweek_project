import React from "react";
import styled from "styled-components";
import EmojiFoodBeverageOutlinedIcon from "@mui/icons-material/EmojiFoodBeverageOutlined";
import { AccessAlarm, ThreeDRotation } from "@mui/icons-material";

const Spinner = (props) => {
  return (
    <Outter>
      <EmojiFoodBeverageOutlinedIcon
        style={{ color: "white", fontSize: "150px" }}
      />
    </Outter>
  );
};

const Outter = styled.div`
  background-color: #82ccdd;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Spinner;
