import { ADDPREPAID_DATA, ADDPREPAID_ERROR } from "../type";

const initialState = {
    response: null,
    authLogin: false,
  };

  export function AddPrepaidReducer(state = initialState, action) {
    switch (action.type) {
      case ADDPREPAID_DATA:
        return {
          ...state,
          authLogin: true,
          response: action.payload,
        };
      case ADDPREPAID_ERROR:
        return {
          ...state,
          authLogin: false,
          response: action.payload,
        };
  
      default:
        return state;
    }
  }