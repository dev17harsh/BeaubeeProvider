import { GETBUSINESSTYPE_DATA, GETBUSINESSTYPE_ERROR } from "../type";

const initialState = {
    response: null,
    authLogin: false,
  };

  export function GetBusinessTypeReducer(state = initialState, action) {
    switch (action.type) {
      case GETBUSINESSTYPE_DATA:
        return {
          ...state,
          authLogin: true,
          response: action.payload,
        };
      case GETBUSINESSTYPE_ERROR:
        return {
          ...state,
          authLogin: false,
          response: action.payload,
        };
  
      default:
        return state;
    }
  }