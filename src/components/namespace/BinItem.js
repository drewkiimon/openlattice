import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setFocused, hasFocus, selectEDM } from "../../actions";

class BinItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data,
      clicked: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { data, type } = this.props;
    this.props.selectEDM(type);
    this.props.hasFocus(true);
    this.props.setFocused({ data, type });
    this.setState({ clicked: true });
  }

  render() {
    if (this.state.clicked) {
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

const mapStateToProps = state => {
  return {
    open: state.open
  };
};

export default connect(
  mapStateToProps,
  { setFocused, hasFocus, selectEDM }
)(BinItem);
