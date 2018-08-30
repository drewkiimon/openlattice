import {
  GET_PROPERTIES,
  GET_ENTITIES,
  GET_ASSOCIATIONS,
  SELECT_EDM
} from "../actions";

const initialState = {
  properties: [],
  entities: [],
  associations: [],
  gotProperties: false,
  gotEntities: false,
  gotAssociations: false,
  focusedProperty: [],
  focusedEntity: [],
  selectedEDM: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROPERTIES:
      return { ...state, properties: action.payload.data, gotProperties: true };
    case GET_ENTITIES:
      return { ...state, entities: action.payload.data, gotEntities: true };
    case GET_ASSOCIATIONS:
      return {
        ...state,
        associations: action.payload.data,
        gotAssociations: true
      };
    case SELECT_EDM:
      return {
        ...state,
        selectedEDM: action.payload
      };
    default:
      return state;
  }
}
