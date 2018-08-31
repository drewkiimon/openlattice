import React, { Component } from "react";
import Select from "react-select";
import { connect } from "react-redux";
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

class OpenWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedOption: null };
  }

  componentDidMount() {
    this.props.getProperties();
    this.props.getEntities();
    this.props.getAssociations();
  }

  handleChange = selectedEDM => {
    // Set into Redux Store
    this.props.hasFocus(false);
    this.props.selectEDM(selectedEDM.value);
    // Set into state our selected EDM
    this.setState({ selectedOption: selectedEDM });
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
      <div className="h-100">
        <div className="container-fluid h-100">
          {isDataReady ? (
            <div className="row h-100">
              <div className="col-5 offset-1 h-100 p-3">
                <div className="row">
                  <div className="col">
                    <h2 className="text-center">EDM</h2>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <h4>Select EDM</h4>
                    <Select
                      value={selectedOption}
                      onChange={this.handleChange}
                      options={options}
                    />
                  </div>
                </div>
                <Filter />
                <TableView />
              </div>
              <div className="col-5 h-100 p-3">
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
              </div>
            </div>
          ) : (
            <Loading />
          )}
        </div>
      </div>
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
