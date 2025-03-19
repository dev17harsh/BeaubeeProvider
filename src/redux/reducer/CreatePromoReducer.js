import { CREATEPROMO_DATA, CREATEPROMO_ERROR } from "../type";

const initialState = {
    response: null,
    authLogin: false,
  };

  export function CreatePromoReducer(state = initialState, action) {
    switch (action.type) {
      case CREATEPROMO_DATA:
        return {
          ...state,
          authLogin: true,
          response: action.payload,
        };
      case CREATEPROMO_ERROR:
        return {
          ...state,
          authLogin: false,
          response: action.payload,
        };
  
      default:
        return state;
    }
  }