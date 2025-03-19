import { CREATEPOST_DATA, CREATEPOST_ERROR} from "../type";

const initialState = {
    response: null,
    authLogin: false,
  };

  export function CreatePostReducer(state = initialState, action) {
    switch (action.type) {
      case CREATEPOST_DATA:
        return {
          ...state,
          authLogin: true,
          response: action.payload,
        };
      case CREATEPOST_ERROR:
        return {
          ...state,
          authLogin: false,
          response: action.payload,
        };
  
      default:
        return state;
    }
  }