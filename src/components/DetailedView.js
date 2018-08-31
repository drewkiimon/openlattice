import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const PROPERTY = "properties";
const ENTITY = "entities";
const ASSOCIATION = "associations";

const EDMTitle = styled.h3`
  text-decoration: underline;
  margin: 0;
`;

const SmallDetail = styled.h5`
  text-transform: uppercase;
  margin: 0;
`;

const LargerDetail = styled.h4`
  text-transform: uppercase;
  font-weight: bold;
`;

class DetailedView extends Component {
  constructor(props) {
    super(props);
    this.generateView = this.generateView.bind(this);
  }
  generateView(data) {
    const type = this.props.open.selectedEDM;
    if (type === PROPERTY) {
      return (
        <div>
          <EDMTitle>Property Type</EDMTitle>
          <p>An object that serves as a field definition for a dataset.</p>
          <SmallDetail>ID</SmallDetail>
          <p>{data.id}</p>
          {data.type.namespace ? (
            <div>
              <SmallDetail>Namespace</SmallDetail>
              <p>{data.type.namespace}</p>
            </div>
          ) : (
            ""
          )}
          {data.type.name ? (
            <div>
              <SmallDetail>Name</SmallDetail>
              <p>{data.type.name}</p>
            </div>
          ) : (
            ""
          )}
          <SmallDetail>Title</SmallDetail>
          <p>{data.title}</p>
          <SmallDetail>Description</SmallDetail>
          <p>{data.description}</p>
          <SmallDetail>Datatype</SmallDetail>
          <p>{data.datatype}</p>
        </div>
      );
    } else if (type === ENTITY) {
      const { key, properties } = data;
      const keyValues = key.map(item => <li key={item}>{item}</li>);
      const propertyValues = properties.map(item => <li key={item}>{item}</li>);
      return (
        <div>
          <EDMTitle>Entity Type</EDMTitle>
          <p>A collection of Property Types that define a specific dataset.</p>
          <SmallDetail>ID</SmallDetail>
          <p>{data.id}</p>
          {data.type.namespace ? (
            <div>
              <SmallDetail>Namespace</SmallDetail>
              <p>{data.type.namespace}</p>
            </div>
          ) : (
            ""
          )}
          {data.type.name ? (
            <div>
              <SmallDetail>Name</SmallDetail>
              <p>{data.type.name}</p>
            </div>
          ) : (
            ""
          )}
          <SmallDetail>Title</SmallDetail>
          <p>{data.title}</p>
          <SmallDetail>Description</SmallDetail>
          <p>{data.description}</p>
          <SmallDetail>Key</SmallDetail>
          <ul>{keyValues}</ul>
          <SmallDetail>Properties</SmallDetail>
          <ul>{propertyValues}</ul>
        </div>
      );
    } else if (type === ASSOCIATION) {
      const { entityType } = data;
      const { key, properties } = entityType;
      const { src, dst } = data;
      const keyValues = key.map(item => <li key={item}>{item}</li>);
      const propertyValues = properties.map(item => <li key={item}>{item}</li>);
      const sources = src.map(item => <li key={item}>{item}</li>);
      const destinations = src.map(item => <li key={item}>{item}</li>);
      return (
        <div>
          <EDMTitle>Association Type</EDMTitle>
          <p>
            An Entity Type that connects one Entity Type, a source, to another
            Entity Type, a destination.
          </p>
          <LargerDetail>Entity Type Details</LargerDetail>
          <SmallDetail>ID</SmallDetail>
          <p>{entityType.id}</p>
          {entityType.type.namespace ? (
            <div>
              <SmallDetail>Namespace</SmallDetail>
              <p>{entityType.type.namespace}</p>
            </div>
          ) : (
            ""
          )}
          {entityType.type.name ? (
            <div>
              <SmallDetail>Name</SmallDetail>
              <p>{entityType.type.name}</p>
            </div>
          ) : (
            ""
          )}
          <SmallDetail>Title</SmallDetail>
          <p>{entityType.title}</p>
          <SmallDetail>Description</SmallDetail>
          <p>{entityType.description}</p>
          <SmallDetail>Key</SmallDetail>
          <ul>{keyValues}</ul>
          <SmallDetail>Properties</SmallDetail>
          <ul>{propertyValues}</ul>
          <LargerDetail>Sources</LargerDetail>
          <ul>{sources}</ul>
          <LargerDetail>Destinations</LargerDetail>
          <ul>{destinations}</ul>
        </div>
      );
    }
  }

  render() {
    const { gotFocused, focused } = this.props.open;
    if (!gotFocused) {
      return <div>Nothing to show... Yet</div>;
    } else {
      const { type, data } = focused;

      return <div>{this.generateView(data)}</div>;
    }
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
)(DetailedView);
