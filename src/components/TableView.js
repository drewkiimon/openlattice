import React, { Component } from "react";
import styled from "styled-components";
import TableElement from "./TableElement";
import { connect } from "react-redux";

const MyDiv = styled.div`
  max-height: 80%;
  background-color: gray;
  overflow-y: scroll;
`;

const PROPERTY = "properties";
const ENTITY = "entities";
const ASSOCIATION = "associations";

class TableView extends Component {
  render() {
    const { selectedEDM, associations, entities, properties } = this.props.open;
    console.log("selectedEDM: ", selectedEDM);
    // What data are we going to display?
    if (selectedEDM === PROPERTY) {
      var data = properties.map(item => (
        <TableElement
          key={item.id}
          title={item.title}
          data={item}
          description={item.description}
        />
      ));
    } else if (selectedEDM === ENTITY) {
      var data = entities.map(item => (
        <TableElement
          key={item.id}
          title={item.title}
          data={item}
          description={item.description}
        />
      ));
    } else if (selectedEDM === ASSOCIATION) {
      var data = associations.map(item => (
        <TableElement
          key={item.entityType.id}
          title={item.entityType.title}
          data={item}
          description={item.entityType.description}
        />
      ));
    }
    return (
      <MyDiv className="row check">
        <div className="col">
          {selectedEDM ? (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>{data}</tbody>
              </table>
            </div>
          ) : (
            "Nothing to see yet"
          )}
        </div>
      </MyDiv>
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
  {}
)(TableView);
