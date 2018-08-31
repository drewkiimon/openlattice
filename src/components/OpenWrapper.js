import React, { Component } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  getProperties,
  getEntities,
  getAssociations,
  selectEDM,
  hasFocus
} from "../actions";

// Custom Components
import Loading from "./Loading";
import Filter from "./Filter";
import TableView from "./TableView";
import DetailedView from "./DetailedView";

const options = [
  { value: "properties", label: "Properties" },
  { value: "entities", label: "Entities" },
  { value: "associations", label: "Associations" }
];

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

const InputTitle = styled.h5`
  margin: 0;
`;

class OpenWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null
    };
  }

  componentDidMount() {
    this.props.getProperties();
    this.props.getEntities();
    this.props.getAssociations();
  }

  componentDidUpdate() {
    if (
      this.state.selectedOption &&
      this.state.selectedOption.value !== this.props.open.selectedEDM
    ) {
      // Set it the same as redux state
      const { selectedEDM } = this.props.open;
      if (selectedEDM === "properties") {
        this.setState({
          selectedOption: { value: "properties", label: "Properties" }
        });
      } else if (selectedEDM === "entities") {
        this.setState({
          selectedOption: { value: "entities", label: "Entities" }
        });
      } else if (selectedEDM === "associations") {
        this.setState({
          selectedOption: { value: "associations", label: "Associations" }
        });
      }
    }
  }

  handleChange = selectedEDM => {
    // Set into Redux Store
    this.props.hasFocus(false);
    this.props.selectEDM(selectedEDM.value);
    // Set into state our selected EDM
    this.setState({
      selectedOption: selectedEDM,
      selectedOptionLabel: selectedEDM.value
    });
  };

  render() {
    const { selectedOption } = this.state;
    const {
      gotProperties,
      gotEntities,
      gotAssociations,
      selectedEDM
    } = this.props.open;
    const isDataReady = gotProperties && gotEntities && gotAssociations;

    return (
      <WrapperDiv>
        <div className="container-fluid h-100">
          {isDataReady ? (
            <div className="row h-100">
              <ColumnDiv className="col-6 offset-1 h-100 mr-2 p-3 ">
                <div className="row">
                  <div className="col">
                    <h2 className="text-center">EDM</h2>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <InputTitle>Select EDM</InputTitle>
                    <Select
                      value={selectedOption}
                      onChange={this.handleChange}
                      options={options}
                    />
                  </div>
                </div>
                <Filter />
                <TableView />
              </ColumnDiv>
              <ColumnDiv className="col-4 h-100 p-3">
                <div className="row">
                  <div className="col">
                    <h2 className="text-center">Detailed View</h2>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <DetailedView />
                  </div>
                </div>
              </ColumnDiv>
            </div>
          ) : (
            <Loading />
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
  {
    getProperties,
    getEntities,
    getAssociations,
    selectEDM,
    hasFocus
  }
)(OpenWrapper);
