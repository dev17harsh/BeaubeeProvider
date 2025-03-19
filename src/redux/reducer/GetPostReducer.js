import { GETPOST_DATA, GETPOST_ERROR } from "../type";

const initialState = {
    response: null,
    authLogin: false,
  };

  export function GetPostReducer(state = initialState, action) {
    switch (action.type) {
      case GETPOST_DATA:
        return {
          ...state,
          authLogin: true,
          response: action.payload,
        };
      case GETPOST_ERROR:
        return {
          ...state,
          authLogin: false,
          response: action.payload,
        };
  
      default:
        return state;
    }
  }