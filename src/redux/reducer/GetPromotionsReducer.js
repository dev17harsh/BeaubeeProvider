import { GETPROMO_DATA, GETPROMO_ERROR } from "../type";

const initialState = {
    response: null,
    authLogin: false,
  };

  export function GetPromotionsReducer(state = initialState, action) {
    switch (action.type) {
      case GETPROMO_DATA:
        return {
          ...state,
          authLogin: true,
          response: action.payload,
        };
      case GETPROMO_ERROR:
        return {
          ...state,
          authLogin: false,
          response: action.payload,
        };
  
      default:
        return state;
    }
  }