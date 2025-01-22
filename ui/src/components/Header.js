import React from "react";
import useStickyHeader from "../hooks/useStickyHeader";
import "../styles/HeaderStyles.css";
import logo from "../assets/hacksoftlogo.svg";
import avatar from "../assets/avatar.png";

const Header = () => {
  const sticky = useStickyHeader();

  return (
    <header className={`header ${sticky ? "sticky" : ""}`}>
      <img src={logo} alt="HackSoft Logo" className="logo" />
      <div className="profile-icon">
        <img src={avatar} alt="Profile" />
      </div>
    </header>
  );
};

export default Header;
