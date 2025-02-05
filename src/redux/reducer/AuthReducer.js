import { AUTH_ERROR, AUTH_LOGIN, AUTH_REMOVE } from "../type";

const initialState = {
    response: null,
    authLogin: false,
  };

  export function AuthReducer(state = initialState, action) {
    switch (action.type) {
      case AUTH_LOGIN:
        return {
          ...state,
          authLogin: true,
          response: action.payload,
        };
      case AUTH_ERROR:
        return {
          ...state,
          authLogin: false,
          response: action.payload,
        };
        case AUTH_REMOVE:
        return {
          ...state,
          authLogin: false,
          response: action.payload,
        };
  
      default:
        return state;
    }
  }