import { GETUSERDETAIL_DATA, GETUSERDETAIL_ERROR } from "../type";

const initialState = {
    response: null,
    authLogin: false,
  };

  export function GetUserDetailReducer(state = initialState, action) {
    switch (action.type) {
      case GETUSERDETAIL_DATA:
        return {
          ...state,
          authLogin: true,
          response: action.payload,
        };
      case GETUSERDETAIL_ERROR:
        return {
          ...state,
          authLogin: false,
          response: action.payload,
        };
  
      default:
        return state;
    }
  }