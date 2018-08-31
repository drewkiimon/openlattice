import axios from "axios";

export const GET_PROPERTIES = "get_properties";
export const GET_ENTITIES = "get_entities";
export const GET_ASSOCIATIONS = "get_associations";
export const SELECT_EDM = "select_edm";
export const SET_FOCUSED = "set_focused";
export const HAS_FOCUS = "has_focus";
export const SET_FILTER = "set_filter";

const BASE_URL = "https://api.openlattice.com/datastore/edm/";
const TYPE = "type";

export function getProperties() {
  const request = axios.get(`${BASE_URL}property/${TYPE}`);

  return {
    type: GET_PROPERTIES,
    payload: request
  };
}

export function getEntities() {
  const request = axios.get(`${BASE_URL}entity/${TYPE}`);

  return {
    type: GET_ENTITIES,
    payload: request
  };
}

export function getAssociations() {
  const request = axios.get(`${BASE_URL}association/${TYPE}`);

  return {
    type: GET_ASSOCIATIONS,
    payload: request
  };
}

export function selectEDM(payload) {
  return {
    type: SELECT_EDM,
    payload
  };
}

export function setFocused(payload) {
  return {
    type: SET_FOCUSED,
    payload
  };
}

export function hasFocus(payload) {
  return {
    type: HAS_FOCUS,
    payload
  };
}

export function setFilter(payload) {
  return {
    type: SET_FILTER,
    payload
  };
}
