import { SIGNUP_ERROR, SIGNUP_REMOVE, SIGNUP_USER } from "../type";


const initialState = {
    response: null,
    addUser: false,
  };

  export function SignUpReducer(state = initialState, action) {
    switch (action.type) {
      case SIGNUP_USER:
        return {
          ...state,
          addUser: true,
          response: action.payload,
        };
      case SIGNUP_ERROR:
        return {
          ...state,
          addUser: false,
          response: action.payload,
        };
        case SIGNUP_REMOVE:
        return {
          ...state,
          addUser: false,
          response: action.payload,
        };
  
      default:
        return state;
    }
  }