import axios from "axios";

export const GET_PROPERTIES = "get_properties";
export const GET_ENTITIES = "get_entities";
export const GET_ASSOCIATIONS = "get_associations";

const BASE_URL = "https://api.openlattice.com/datastore/edm/";
const TYPE = "type";

export function getProperties() {
  const request = axios.get(`${BASE_URL}property/${TYPE}`);

  return {
    type: GET_PROPERTIES,
    payload: request
  };
}

// Get entities
export function getEntities() {
  const request = axios.get(`${BASE_URL}entity/${TYPE}`);

  return {
    type: GET_ENTITIES,
    payload: request
  };
}

// Get associations
export function getAssociations() {
  const request = axios.get(`${BASE_URL}association/${TYPE}`);

  return {
    type: GET_ASSOCIATIONS,
    payload: request
  };
}
