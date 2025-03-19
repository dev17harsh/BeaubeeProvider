import { UPDATEPROMOSTATUS_DATA, UPDATEPROMOSTATUS_ERROR } from "../type";


const initialState = {
  response: null,
  addUser: false,
};

export function UpdatePromoStatusReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATEPROMOSTATUS_DATA:
      return {
        ...state,
        addUser: true,
        response: action.payload,
      };
    case UPDATEPROMOSTATUS_ERROR:
      return {
        ...state,
        addUser: false,
        response: action.payload,
      };

    default:
      return state;
  }
}