import { GETSERVICESDETAIL_DATA, GETSERVICESDETAIL_ERROR } from "../type";

const initialState = {
    response: null,
    authLogin: false,
  };

  export function GetServicesDetailReducer(state = initialState, action) {
    switch (action.type) {
      case GETSERVICESDETAIL_DATA:
        return {
          ...state,
          authLogin: true,
          response: action.payload,
        };
      case GETSERVICESDETAIL_ERROR:
        return {
          ...state,
          authLogin: false,
          response: action.payload,
        };
  
      default:
        return state;
    }
  }