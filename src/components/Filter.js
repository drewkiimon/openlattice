import React, { Component } from "react";
import Select from "react-select";
import styled from "styled-components";
import { connect } from "react-redux";

const InputTitle = styled.h5`
  margin: 0;
  margin-top: 0.25em;
`;

// We are going to filter things based off of what EDM was selected
class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedOption: null };
  }

  componentDidUpdate(prevProps) {
    // If the user selects a different EDM, we reload filter
    if (prevProps.open.selectedEDM !== this.props.open.selectedEDM) {
      this.setState({ selectedOption: null });
    }
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption });
  };

  render() {
    const { selectedOption } = this.state;
    const { selectedEDM, associations, entities, properties } = this.props.open;
    var data = null;
    if (!selectedEDM) {
      data = [{ value: "none", label: "Please selected an EDM" }];
      var options = data;
    } else if (selectedEDM === "associations") {
      data = associations;
      var options = data.map(item => {
        return { value: item.entityType.id, label: item.entityType.title };
      });
    } else if (selectedEDM === "entities") {
      data = entities;
      var options = data.map(item => {
        return { value: item.id, label: item.title };
      });
    } else if (selectedEDM === "properties") {
      data = properties;
      var options = data.map(item => {
        return { value: item.id, label: item.title };
      });
    }

    return (
      <div className="row">
        <div className="col">
          <InputTitle>Filter</InputTitle>
          <Select
            value={selectedOption}
            onChange={this.handleChange}
            options={options}
            isSearchable={true}
            isClearable={true}
          />
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
  {}
)(Filter);
