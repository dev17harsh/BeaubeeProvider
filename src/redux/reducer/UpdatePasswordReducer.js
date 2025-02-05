import { GETUPDATEPASSWORD_DATA, GETUPDATEPASSWORD_ERROR } from "../type";

const initialState = {
    response: null,
    authLogin: false,
  };

  export function UpdatePasswordReducer(state = initialState, action) {
    switch (action.type) {
      case GETUPDATEPASSWORD_DATA:
        return {
          ...state,
          authLogin: true,
          response: action.payload,
        };
      case GETUPDATEPASSWORD_ERROR:
        return {
          ...state,
          authLogin: false,
          response: action.payload,
        };
  
      default:
        return state;
    }
  }