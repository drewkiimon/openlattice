import React, { Component } from "react";

class TableElement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id
    };
  }

  render() {
    return <div>I am the data</div>;
  }
}

export default TableElement;
