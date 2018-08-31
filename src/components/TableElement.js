import React, { Component } from "react";
import { connect } from "react-redux";
import { setFocused, hasFocus } from "../actions";

class TableElement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      type: this.props.type
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.hasFocus(true);
    this.props.setFocused(this.state);
  }

  render() {
    return (
      <tr onClick={this.handleClick}>
        <td>{this.props.title}</td>
        <td>{this.props.description}</td>
      </tr>
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
  { setFocused, hasFocus }
)(TableElement);
