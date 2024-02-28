import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

import dan from "/dan.png";

const Footer = () => {
  return (
    <footer>
      <div className="left">
        <h1>PostIT</h1>
        <p>:)</p>
      </div>
      <div className="right">
        <img src={dan} alt="" />
        <div>
          <h2>Danilo Dante Siqueira</h2>
          <p>Criador desse projeto!</p>
          <Link to="https://github.com/danilosiq" target="blank"> GitHub</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
