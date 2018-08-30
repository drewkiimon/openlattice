import React, { Component } from "react";

class TableElement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type,
      data: this.props.data
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log("id", this.state);
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

export default TableElement;
