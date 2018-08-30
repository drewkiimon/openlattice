import { GET_PROPERTIES, GET_ENTITIES, GET_ASSOCIATIONS } from "../actions";

const initialState = {
  properties: [],
  entities: [],
  associations: [],
  focusedProperty: [],
  focusedEntity: [],
  focusedAssociation: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROPERTIES:
      return { ...state, properties: action.payload.data };
    case GET_ENTITIES:
      return { ...state, entities: action.payload.data };
    case GET_ASSOCIATIONS:
      return { ...state, associations: action.payload.data };
    default:
      return state;
  }
}
