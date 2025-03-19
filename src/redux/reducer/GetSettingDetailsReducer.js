import { GETSETTINGDETAILS_DATA, GETSETTINGDETAILS_ERROR } from "../type";

const initialState = {
    response: null,
    authLogin: false,
  };

  export function GetSettingDetailsReducer(state = initialState, action) {
    switch (action.type) {
      case GETSETTINGDETAILS_DATA:
        return {
          ...state,
          authLogin: true,
          response: action.payload,
        };
      case GETSETTINGDETAILS_ERROR:
        return {
          ...state,
          authLogin: false,
          response: action.payload,
        };
  
      default:
        return state;
    }
  }