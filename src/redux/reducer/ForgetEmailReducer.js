import { GETFORGETEMAILRES_DATA, GETFORGETEMAILRES_ERROR } from "../type";

const initialState = {
    response: null,
    authLogin: false,
  };

  export function ForgetEmailReducer(state = initialState, action) {
    switch (action.type) {
      case GETFORGETEMAILRES_DATA:
        return {
          ...state,
          authLogin: true,
          response: action.payload,
        };
      case GETFORGETEMAILRES_ERROR:
        return {
          ...state,
          authLogin: false,
          response: action.payload,
        };
  
      default:
        return state;
    }
  }