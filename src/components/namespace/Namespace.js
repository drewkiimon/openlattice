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

const ColumnDiv = styled.div`
  background-color: white;
  box-sizing: border-box;
  border: 1px solid gray;
  border-radius: 5px;
  -webkit-box-shadow: 6px 9px 22px -10px rgba(0, 0, 0, 0.69);
  -moz-box-shadow: 6px 9px 22px -10px rgba(0, 0, 0, 0.69);
  box-shadow: 6px 9px 22px -10px rgba(0, 0, 0, 0.69);
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  &::-webkit-scrollbar-thumb {
    background: #888;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

class Namespace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      propertyNamespaces: {},
      gotPropertyNamespaces: false,
      entityNamespaces: [],
      gotEntityNamespaces: false
    };
    this.createNamespaces = this.createNamespaces.bind(this);
  }

  componentDidUpdate() {
    const { gotProperties, gotEntities, gotAssociations } = this.props.open;
    const { gotPropertyNamespaces, gotEntityNamespaces } = this.state;
    if (
      gotProperties &&
      gotEntities &&
      gotAssociations &&
      !gotPropertyNamespaces & !gotEntityNamespaces
    ) {
      const { properties, entities } = this.props.open;
      const propertyNamespaces = this.createNamespaces(properties);
      const entityNamespaces = this.createNamespaces(entities);
      this.setState({
        propertyNamespaces,
        gotPropertyNamespaces: true,
        entityNamespaces,
        gotEntityNamespaces: true
      });
    }
  }

  createNamespaces(properties) {
    const namespace = {};
    for (var i = 0; i < properties.length; i++) {
      let item = properties[i];
      if (!namespace[item.type.namespace]) {
        namespace[item.type.namespace] = [item];
      } else {
        namespace[item.type.namespace] = [
          ...namespace[item.type.namespace],
          item
        ];
      }
    }
    return namespace;
  }

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
            <div className="row h-100">
              <ColumnDiv className="col-5 offset-1 h-100 mr-2 p-3">
                Hello
              </ColumnDiv>
              <ColumnDiv className="col-5 h-100 p-3">Goodbye</ColumnDiv>
            </div>
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
