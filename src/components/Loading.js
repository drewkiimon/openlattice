import React from "react";
import ReactLoading from "react-loading";

// Loading icon while we wait for data from OpenLattice
const Loading = ({ type, color }) => (
  <ReactLoading
    type={type}
    color={color}
    height={"50%"}
    width={"50%"}
    className={"m-auto"}
  />
);

export default Loading;
