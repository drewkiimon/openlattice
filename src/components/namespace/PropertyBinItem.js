import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class PropertyBinItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data,
      clicked: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ clicked: true });
    console.log(this.state.data);
  }

  render() {
    if (this.state.clicked) {
      this.setState({ clicked: false });
      return <Redirect push to="/edm" />;
    }
    return (
      <tr onClick={this.handleClick}>
        <td>{this.props.title}</td>
        <td>{this.props.namespace}</td>
      </tr>
    );
  }
}

export default PropertyBinItem;
