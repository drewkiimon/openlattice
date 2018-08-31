import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProperties, getEntities, getAssociations } from "../../actions";

import Loading from "../Loading";

const WrapperDiv = styled.div`
  height: 92%;
  background-color: #e0ffff;
  padding: 0.5em 0;
`;

class Namespace extends Component {
  componentDidMount() {
    const { gotProperties, gotEntities, gotAssociations } = this.props.open;
    // If we do not have the data in state, go get it
    if (!(gotProperties && gotEntities && gotAssociations)) {
      this.props.getProperties();
      this.props.getEntities();
      this.props.getAssociations();
    }
  }
  render() {
    const {
      gotProperties,
      gotEntities,
      gotAssociations,
      selectedEDM
    } = this.props.open;
    const isDataReady = gotProperties && gotEntities && gotAssociations;
    return (
      <WrapperDiv>
        <div
          className={
            isDataReady
              ? "container-fluid h-100"
              : "container-fluid h-100 d-flex"
          }
        >
          {isDataReady ? (
            <div className="row h-100">Woof</div>
          ) : (
            <Loading type={"bubbles"} color={"black"} />
          )}
        </div>
      </WrapperDiv>
    );
  }
}

const mapStateToProps = state => {
  return {
    open: state.open
  };
};

export default connect(
  mapStateToProps,
  { getProperties, getEntities, getAssociations }
)(Namespace);
