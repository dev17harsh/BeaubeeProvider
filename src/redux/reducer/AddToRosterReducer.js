import { ADDTOROSTER_DATA, ADDTOROSTER_ERROR } from "../type";


const initialState = {
  response: null,
  addUser: false,
};

export function AddToRosterReducer(state = initialState, action) {
  switch (action.type) {
    case ADDTOROSTER_DATA:
      return {
        ...state,
        addUser: true,
        response: action.payload,
      };
    case ADDTOROSTER_ERROR:
      return {
        ...state,
        addUser: false,
        response: action.payload,
      };

    default:
      return state;
  }
}