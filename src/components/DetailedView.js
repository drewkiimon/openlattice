import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Property from "./Property";
import Entity from "./Entity";
import { PROPERTY, ENTITY, ASSOCIATION } from "../edmTypes";

// Custom components made with styled-components
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

const HorizontalLine = styled.hr`
  border: 0;
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.75),
    rgba(0, 0, 0, 0)
  );
  margin: 0.25em 0;
`;

const TableValues = styled.div`
  max-height: 100px;
  min-height: 33px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  &::-webkit-scrollbar-thumb {
    background: #888;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

// The right hand view to show details of clicked Typed
class DetailedView extends Component {
  generateView(data, type) {
    if (type === PROPERTY) {
      return (
        <div>
          <EDMTitle>Property Type</EDMTitle>
          <p className="m-0">
            An object that serves as a field definition for a dataset.
          </p>
          <HorizontalLine />
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
      const keyValues = key.map(item => <Property key={item} id={item} />);
      const propertyValues = properties.map(item => (
        <Property key={item} id={item} />
      ));
      return (
        <div>
          <EDMTitle>Entity Type</EDMTitle>
          <p className="m-0">
            A collection of Property Types that define a specific dataset.
          </p>
          <HorizontalLine />
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
          <TableValues className="table-responsive">
            <table className="table table-sm table-borderless">
              <tbody>{keyValues}</tbody>
            </table>
          </TableValues>
          <SmallDetail>Properties</SmallDetail>
          <TableValues className="table-responsive">
            <table className="table table-sm table-borderless">
              <tbody>{propertyValues}</tbody>
            </table>
          </TableValues>
        </div>
      );
    } else if (type === ASSOCIATION) {
      const { entityType } = data;
      const { key, properties } = entityType;
      const { src, dst } = data;
      const keyValues = key.map(item => <Property key={item} id={item} />);
      const propertyValues = properties.map(item => (
        <Property key={item} id={item} />
      ));
      const sources = src.map(item => <Entity key={item} id={item} />);
      const destinations = dst.map(item => <Entity key={item} id={item} />);
      return (
        <div>
          <EDMTitle>Association Type</EDMTitle>
          <p className="m-0">
            An Entity Type that connects one Entity Type, a source, to another
            Entity Type, a destination.
          </p>
          <HorizontalLine />
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
          <TableValues className="table-responsive">
            <table className="table table-sm table-borderless">
              <tbody>{keyValues}</tbody>
            </table>
          </TableValues>
          <SmallDetail>Properties</SmallDetail>
          <TableValues className="table-responsive">
            <table className="table table-sm table-borderless">
              <tbody>{propertyValues}</tbody>
            </table>
          </TableValues>
          <LargerDetail>Sources</LargerDetail>
          <TableValues className="table-responsive">
            <table className="table table-sm table-borderless">
              <tbody>{sources}</tbody>
            </table>
          </TableValues>
          <LargerDetail>Destinations</LargerDetail>
          <TableValues className="table-responsive">
            <table className="table table-sm table-borderless">
              <tbody>{destinations}</tbody>
            </table>
          </TableValues>
        </div>
      );
    }
  }

  render() {
    const { gotFocused, focused } = this.props.open;
    if (!gotFocused) {
      return <div />;
    } else {
      const { type, data } = focused;

      return <div>{this.generateView(data, type)}</div>;
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
