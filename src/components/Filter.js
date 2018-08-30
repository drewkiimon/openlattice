import React, { Component } from "react";
import Select from "react-select";
import { connect } from "react-redux";

// We are going to filter things based off of what EDM was selected
class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: null };
  }

  handleChange = filter => {
    this.setState({ selected: filter.label });
    console.log("option chose:", this.state.selected);
  };

  render() {
    const { selectedEDM, associations, entities, properties } = this.props.open;
    var data = null;
    if (!selectedEDM) {
      data = [{ value: "none", label: "Please selected an EDM" }];
      var options = data;
    } else if (selectedEDM === "associations") {
      data = associations;
    } else if (selectedEDM === "entities") {
      data = entities;
    } else if (selectedEDM === "properties") {
      data = properties;
    }

    if (selectedEDM) {
      var options = data.map(item => {
        return { value: item.id, label: item.title };
      });
    }

    console.log("Filter EDM:", selectedEDM);
    console.log(options);
    return (
      <div>
        <h4>Filter</h4>
        <Select
          value={this.state.selected}
          isSearchable={true}
          onChange={this.handleChange}
          options={options}
          isClearable={true}
        />
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
