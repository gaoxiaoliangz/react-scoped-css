// @ts-check
import React from "react";
import Title from "./Title/Title";
import "./Header.scoped.sass";

const Header = ({ title }) => {
  return (
    <header className="header">
      <Title>{title}</Title>
    </header>
  );
};

export default Header;
