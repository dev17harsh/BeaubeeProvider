import { GETSUBSERVICEAPI_DATA, GETSUBSERVICEAPI_ERROR } from "../type";


const initialState = {
    response: null,
    addUser: false,
  };

  export function AddSubServiceReducer(state = initialState, action) {
    switch (action.type) {
      case GETSUBSERVICEAPI_DATA:
        return {
          ...state,
          addUser: true,
          response: action.payload,
        };
      case GETSUBSERVICEAPI_ERROR:
        return {
          ...state,
          addUser: false,
          response: action.payload,
        };
  
      default:
        return state;
    }
  }