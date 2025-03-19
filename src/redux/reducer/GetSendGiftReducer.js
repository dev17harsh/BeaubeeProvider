import { GETSENDGIFT_DATA, GETSENDGIFT_ERROR } from "../type";

const initialState = {
    response: null,
    authLogin: false,
  };

  export function GetSendGiftReducer(state = initialState, action) {
    switch (action.type) {
      case GETSENDGIFT_DATA:
        return {
          ...state,
          authLogin: true,
          response: action.payload,
        };
      case GETSENDGIFT_ERROR:
        return {
          ...state,
          authLogin: false,
          response: action.payload,
        };
  
      default:
        return state;
    }
  }