import { GETNOTIFICATION_DATA, GETNOTIFICATION_ERROR } from "../type";

const initialState = {
    response: null,
    authLogin: false,
  };

  export function GetNotificationReducer(state = initialState, action) {
    switch (action.type) {
      case GETNOTIFICATION_DATA:
        return {
          ...state,
          authLogin: true,
          response: action.payload,
        };
      case GETNOTIFICATION_ERROR:
        return {
          ...state,
          authLogin: false,
          response: action.payload,
        };
  
      default:
        return state;
    }
  }