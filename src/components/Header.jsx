import React from "react";
import "../assets/css/header.css";
import logo from "../assets/images/logo.png";

const Header = () => {
  return (
    <header className="header">
      <img className="logo" src={logo} alt="Iskcon Chemicals" />
    </header>
  );
};

export default Header;
