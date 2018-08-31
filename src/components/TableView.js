import React, { Component } from "react";
import styled from "styled-components";
import TableElement from "./TableElement";
import { connect } from "react-redux";

const MyDiv = styled.div`
  max-height: 80%;
  overflow-y: scroll;
`;

const PROPERTY = "properties";
const ENTITY = "entities";
const ASSOCIATION = "associations";

class TableView extends Component {
  render() {
    const { selectedEDM, associations, entities, properties } = this.props.open;
    // What data are we going to display?
    if (selectedEDM === PROPERTY) {
      var data = properties.map(item => (
        <TableElement
          key={item.id}
          title={item.title}
          type={PROPERTY}
          data={item}
          description={item.description}
        />
      ));
    } else if (selectedEDM === ENTITY) {
      var data = entities.map(item => (
        <TableElement
          key={item.id}
          title={item.title}
          type={ENTITY}
          data={item}
          description={item.description}
        />
      ));
    } else if (selectedEDM === ASSOCIATION) {
      // Had to use index, since the same keys are also used in Entities
      var data = associations.map((item, i) => (
        <TableElement
          key={i}
          title={item.entityType.title}
          type={ASSOCIATION}
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
