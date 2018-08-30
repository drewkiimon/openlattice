import React, { Component } from "react";
import Select from "react-select";
import "./OpenWrapper.css";
import { connect } from "react-redux";
import {
  getProperties,
  getEntities,
  getAssociations,
  selectEDM
} from "../actions";

// Custom Components
import Loading from "./Loading";
import Filter from "./Filter";

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

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      console.log("Updated", this.props.open);
    }
  }

  handleChange = selectedEDM => {
    // Set into state our selected EDM
    this.setState({ selectedOption: selectedEDM });
    // Set into Redux State
    this.props.selectEDM(selectedEDM.value);
    console.log("option chose:", this.props.open.selectedEDM);
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
    //          <Filter />
    return (
      <div className="h-100">
        <div className="container-fluid h-100">
          {isDataReady ? (
            <div className="row h-100">
              <div className="col-5 offset-1 h-100 p-3">
                <h2 className="text-center">EDM</h2>
                <Select
                  value={selectedOption}
                  onChange={this.handleChange}
                  options={options}
                />
              </div>
              <div className="col-5 h-100 p-3">
                <div className="text-center">Two Boy</div>
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
  { getProperties, getEntities, getAssociations, selectEDM }
)(OpenWrapper);
