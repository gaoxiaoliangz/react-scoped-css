import React from "react";
import Title from "./Title/Title";

const Header = ({ title }) => {
  return (
    <header className="header">
      <Title>{title}</Title>
    </header>
  );
};

export default Header;
