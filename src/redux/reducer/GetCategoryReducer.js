import { GETCATEGORY_DATA, GETCATEGORY_ERROR } from "../type";

const initialState = {
    response: null,
    authLogin: false,
  };

  export function GetCategoryReducer(state = initialState, action) {
    switch (action.type) {
      case GETCATEGORY_DATA:
        return {
          ...state,
          authLogin: true,
          response: action.payload,
        };
      case GETCATEGORY_ERROR:
        return {
          ...state,
          authLogin: false,
          response: action.payload,
        };
  
      default:
        return state;
    }
  }