import { GETCHECKOTP_DATA, GETCHECKOTP_ERROR } from "../type";

const initialState = {
    response: null,
    authLogin: false,
  };

  export function CheckOTPReducer(state = initialState, action) {
    switch (action.type) {
      case GETCHECKOTP_DATA:
        return {
          ...state,
          authLogin: true,
          response: action.payload,
        };
      case GETCHECKOTP_ERROR:
        return {
          ...state,
          authLogin: false,
          response: action.payload,
        };
  
      default:
        return state;
    }
  }