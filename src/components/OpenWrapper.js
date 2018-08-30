import React, { Component } from "react";
import "./OpenWrapper.css";
import { connect } from "react-redux";
import { getProperties, getEntities, getAssociations } from "../actions";

class OpenWrapper extends Component {
  componentDidMount() {
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
    return (
      <div className="h-100">
        <div className="container-fluid h-100">
          <div className="row h-100">
            <div className="col-5 offset-1 h-100 p-3">
              <div className="text-center">One Boy</div>
            </div>
            <div className="col-5 h-100 p-3">
              <div className="text-center">Two Boy</div>
            </div>
          </div>
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
  { getProperties, getEntities, getAssociations }
)(OpenWrapper);
