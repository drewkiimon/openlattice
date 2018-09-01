import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <div className="row">
    <div className="col">
      <ul className="nav justify-content-center">
        <li className="nav-item">
          <Link to="/edm" className="nav-link text-dark">
            EDM
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/namespace" className="nav-link text-dark">
            Namespace
          </Link>
        </li>
      </ul>
    </div>
  </div>
);
export default Navbar;
