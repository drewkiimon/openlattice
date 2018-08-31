import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { selectEDM, hasFocus, setFocused } from "../actions";

const Link = styled.span`
  color: #0645ad;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
`;

// Entity types to help us navigate EDM Types
class Entity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      type: null,
      found: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    // Search for the ID
    const { entities } = this.props.open;
    const entity = entities.filter(item => item.id === this.props.id);
    // Set it in state if we find only one
    if (entity.length === 1) {
      this.setState({ data: entity[0], type: "entities", found: true });
    }
  }

  handleClick(event) {
    const { type, data } = this.state;
    const focusData = { type, data };
    // Set in Redux State
    this.props.selectEDM(type);
    this.props.hasFocus(true);
    this.props.setFocused(focusData);
  }

  render() {
    const { found, data, type } = this.state;
    return (
      <tr onClick={this.handleClick}>
        <td>{found ? <Link>{data.title}</Link> : "No"}</td>
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
  { selectEDM, hasFocus, setFocused }
)(Entity);
