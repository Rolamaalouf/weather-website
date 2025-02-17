import React from 'react';
import './header.css';
import logo from "./assets/logo.png"; // adjust the path as needed
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <header className="header">
      {/* Use Link components instead of anchor tags */}
      <Link className="nav-item" to="/">Home</Link>
      <Link className="nav-item" to="/about">About Us</Link>
      
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      
      <Link className="nav-item" to="/menu">Menu</Link> {/* Link to Menu page */}
      <Link className="nav-item" to="/contact">Contact Us</Link>
    </header>
  );
};
export default Header;
