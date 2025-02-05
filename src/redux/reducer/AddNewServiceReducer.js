import { ADDNEWSERVICE_DATA, ADDNEWSERVICE_ERROR } from "../type";

const initialState = {
    response: null,
    addUser: false,
  };

  export function AddNewServiceReducer(state = initialState, action) {
    switch (action.type) {
      case ADDNEWSERVICE_DATA:
        return {
          ...state,
          addUser: true,
          response: action.payload,
        };
      case ADDNEWSERVICE_ERROR:
        return {
          ...state,
          addUser: false,
          response: action.payload,
        };
  
      default:
        return state;
    }
  }