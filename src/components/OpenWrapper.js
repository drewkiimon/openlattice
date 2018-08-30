import React, { Component } from "react";
import { connect } from "react-redux";
import { getProperties, getEntities, getAssociations } from "../actions";

class OpenWrapper extends Component {
  componentDidMount() {
    console.log("Mounted");
    console.log(this.props.open);
    this.props.getProperties();
    this.props.getEntities();
    this.props.getAssociations();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      console.log("Updated", this.props);
    }
  }
  render() {
    return <div>New Wrapper</div>;
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
)(OpenWrapper);
