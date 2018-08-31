import {
  GET_PROPERTIES,
  GET_ENTITIES,
  GET_ASSOCIATIONS,
  SELECT_EDM,
  SET_FOCUSED,
  HAS_FOCUS,
  DID_RENDER
} from "../actions";

const initialState = {
  properties: [],
  entities: [],
  associations: [],
  gotProperties: false,
  gotEntities: false,
  gotAssociations: false,
  focused: {},
  gotFocused: false,
  selectedEDM: null,
  rendered: false
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
        selectedEDM: action.payload,
        focused: {}
      };
    case SET_FOCUSED:
      return {
        ...state,
        focused: action.payload
      };
    case HAS_FOCUS:
      return {
        ...state,
        gotFocused: action.payload
      };
    case DID_RENDER:
      return {
        ...state,
        rendered: action.payload
      };
    default:
      return state;
  }
}
