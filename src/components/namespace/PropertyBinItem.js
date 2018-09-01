import React, { Component } from "react";

class PropertyBinItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log(this.state.data);
  }

  render() {
    return (
      <tr onClick={this.handleClick}>
        <td>{this.props.title}</td>
        <td>{this.props.namespace}</td>
      </tr>
    );
  }
}

export default PropertyBinItem;
