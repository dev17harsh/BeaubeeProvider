import { GETSTAFF_DATA, GETSTAFF_ERROR } from "../type";

const initialState = {
    response: null,
    authLogin: false,
  };

  export function GetStaffReducer(state = initialState, action) {
    switch (action.type) {
      case GETSTAFF_DATA:
        return {
          ...state,
          authLogin: true,
          response: action.payload,
        };
      case GETSTAFF_ERROR:
        return {
          ...state,
          authLogin: false,
          response: action.payload,
        };
  
      default:
        return state;
    }
  }