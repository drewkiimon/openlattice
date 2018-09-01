import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ListItem = styled.li`
  font-weight: bold;
  text-decoration: underline;
  text-transform: uppercase;
`;

const Navbar = () => (
  <div className="row">
    <div className="col">
      <ul className="nav justify-content-center">
        <ListItem className="nav-item">
          <Link to="/edm" className="nav-link text-dark">
            EDM
          </Link>
        </ListItem>
        <ListItem className="nav-item">
          <Link to="/namespace" className="nav-link text-dark">
            Namespace
          </Link>
        </ListItem>
      </ul>
    </div>
  </div>
);
export default Navbar;
