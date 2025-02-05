import { GETSELECTEDSERVICES_DATA, GETSELECTEDSERVICES_ERROR } from "../type";

const initialState = {
    response: null,
    authLogin: false,
  };

  export function GetSelectedServiceReducer(state = initialState, action) {
    switch (action.type) {
      case GETSELECTEDSERVICES_DATA:
        return {
        ...state,
          authLogin: true,
          response: action.payload,
        };
      case GETSELECTEDSERVICES_ERROR:
        return {
          ...state,
          authLogin: false,
          response: action.payload,
        };
  
      default:
        return state;
    }
  }