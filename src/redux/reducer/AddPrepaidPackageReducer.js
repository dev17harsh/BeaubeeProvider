import { ADDPREPAIDPACKAGE_DATA, ADDPREPAIDPACKAGE_ERROR } from "../type";

const initialState = {
    response: null,
    authLogin: false,
  };

  export function AddPrepaidPackageReducer(state = initialState, action) {
    switch (action.type) {
      case ADDPREPAIDPACKAGE_DATA:
        return {
          ...state,
          authLogin: true,
          response: action.payload,
        };
      case ADDPREPAIDPACKAGE_ERROR:
        return {
          ...state,
          authLogin: false,
          response: action.payload,
        };
  
      default:
        return state;
    }
  }