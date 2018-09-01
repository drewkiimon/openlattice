import React, { Component } from "react";
import styled from "styled-components";
import Select from "react-select";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProperties, getEntities, getAssociations } from "../../actions";

import PropertyBinItem from "./PropertyBinItem";
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
      selectedPropertyOption: null,
      selectedEntityOption: null,
      propertyNamespaces: {},
      gotPropertyNamespaces: false,
      propertyBins: [],
      entityNamespaces: [],
      gotEntityNamespaces: false,
      entityBins: []
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
      const propertyBins = Object.keys(propertyNamespaces);
      const entityBins = Object.keys(entityNamespaces);

      this.setState({
        propertyNamespaces,
        gotPropertyNamespaces: true,
        propertyBins,
        entityNamespaces,
        gotEntityNamespaces: true,
        entityBins
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

  handlePropertyChange = selectedPropertyOption => {
    this.setState({ selectedPropertyOption });
    console.log("option selected: ", selectedPropertyOption);
  };

  handleEntityChange = selectedEntityOption => {
    this.setState({ selectedEntityOption });
    console.log("option selected: ", selectedEntityOption);
  };

  render() {
    const { gotProperties, gotEntities, gotAssociations } = this.props.open;
    const isDataReady = gotProperties && gotEntities && gotAssociations;
    const {
      propertyBins,
      entityBins,
      selectedPropertyOption,
      selectedEntityOption,
      propertyNamespaces,
      entityNamespaces
    } = this.state;

    var renderMe;

    // Create Options
    const propertyOptions = propertyBins.map(item => {
      const { title } = item;
      return { value: item, label: item };
    });

    const entityOptions = entityBins.map(item => {
      const { title } = item;
      return { value: item, label: item };
    });

    // Create
    if (selectedPropertyOption) {
      var propertiesToDisplay = [];
      for (var i = 0; i < selectedPropertyOption.length; i++) {
        let value = selectedPropertyOption[i].value;
        let namespaceItems = propertyNamespaces[value];
        propertiesToDisplay = [...propertiesToDisplay, ...namespaceItems];
      }
      renderMe = propertiesToDisplay.map(item => (
        <PropertyBinItem
          key={item.id}
          title={item.title}
          namespace={item.type.namespace}
          data={item}
        />
      ));
    }

    if (selectedEntityOption) {
      for (var i = 0; i < selectedEntityOption.length; i++) {
        console.log(selectedEntityOption[i]);
      }
    }

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
                <h2 className="text-center">Property Types</h2>
                <div className="row">
                  <div className="col">
                    <Select
                      value={selectedPropertyOption}
                      onChange={this.handlePropertyChange}
                      options={propertyOptions}
                      isMulti={true}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Title</th>
                            <th>Namespace</th>
                          </tr>
                        </thead>
                        <tbody>{renderMe}</tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </ColumnDiv>
              <ColumnDiv className="col-5 h-100 p-3">
                <h2 className="text-center">Entity Types</h2>
                <div className="row">
                  <div className="col">
                    <Select
                      value={selectedEntityOption}
                      onChange={this.handleEntityChange}
                      options={entityOptions}
                      isMulti={true}
                    />
                  </div>
                </div>
              </ColumnDiv>
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
