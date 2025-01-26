import React from "react";
import "../assets/css/header.css";
import logo1 from "../assets/images/logo.png";

const Header = () => {
  return (
    <header className="header">
      {/* <h2 className="hdr-title">Iskcon Chemicals</h2> */}
      <img className="logo" src={logo1} alt="" />
    </header>
  );
};

export default Header;
