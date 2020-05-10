import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrap = styled(Link)`
  border: 1px solid #00a6f3;
  padding: 8px 64px;
  display: inline-block;
  cursor: pointer;
  /* color: #00a6f3; */
  color: ${(props) => (props["data-active"] ? "#ffffff" : "#00a6f3")};
  background-color: ${(props) =>
    props["data-active"] ? "rgba(0,166,243,0.25)" : "transparent"};
  box-shadow: inset 0 0 8px #00a6f3;
  transform: skew(
    ${(props) => (props["data-direction"] === "left" ? "30" : "-30")}deg
  );
`;
const Content = styled.div`
  transform: skew(${(props) => (props.direction === "left" ? "-30" : "30")}deg);
`;

function SkewButton({ children, active, to, direction }) {
  return (
    <Wrap to={to} data-active={active} data-direction={direction}>
      <Content direction={direction}>{children}</Content>
    </Wrap>
  );
}

export default SkewButton;
