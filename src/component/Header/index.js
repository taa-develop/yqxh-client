import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

import SkewButton from "../SkewButton";

const Wrap = styled.div`
  height: 100px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const Title = styled.div`
  position: relative;
  padding: 10px;
  font-weight: bold;
  font-size: 18px;
  color: transparent;
  background-image: linear-gradient(to bottom, #b8dfff, #015fa9);
  -webkit-background-clip: text;
  transform: translateY(-8px);

  ::before {
    position: absolute;
    top: 4px;
    left: -8px;
    content: "";
    display: block;
    width: 16em;
    height: 40px;
    box-shadow: inset 0 0 8px #00a6f3;
    transform: perspective(100px) rotateX(-26deg);
    transform-origin: bottom;
  }

  ::after {
    position: absolute;
    top: 8px;
    left: -9px;
    content: "";
    display: block;
    width: 16em;
    height: 40px;
    transform: perspective(100px) rotateX(-26deg);
    transform-origin: bottom;
    border: 1px solid #00a6f3;
    border-top-color: transparent;
  }
`;

function Header() {
  const location = useLocation();
  return (
    <Wrap>
      <SkewButton to="/" active={location.pathname === "/"} direction="left">
        产量
      </SkewButton>
      <SkewButton
        to="/mushroom"
        active={location.pathname === "/mushroom"}
        direction="left"
      >
        菇房
      </SkewButton>
      <Title>双孢蘑菇工厂生产智能管理平台</Title>
      <SkewButton
        to="/tunnel"
        active={location.pathname === "/tunnel"}
        direction="right"
      >
        隧道
      </SkewButton>
      <SkewButton
        to="/user"
        active={location.pathname === "/user"}
        direction="right"
      >
        人员
      </SkewButton>
    </Wrap>
  );
}

export default Header;
