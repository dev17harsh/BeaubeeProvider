import { UPDATECUSTOMERSTATUS_DATA, UPDATECUSTOMERSTATUS_ERROR } from "../type";

const initialState = {
    response: null,
    authLogin: false,
  };

  export function UpdateCustomerStatusReducer(state = initialState, action) {
    switch (action.type) {
      case UPDATECUSTOMERSTATUS_DATA:
        return {
          ...state,
          authLogin: true,
          response: action.payload,
        };
      case UPDATECUSTOMERSTATUS_ERROR:
        return {
          ...state,
          authLogin: false,
          response: action.payload,
        };
  
      default:
        return state;
    }
  }