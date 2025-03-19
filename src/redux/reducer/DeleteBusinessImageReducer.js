import { DELETEBUSINESSIMAGE_DATA, DELETEBUSINESSIMAGE_ERROR } from "../type";


const initialState = {
  response: null,
  addUser: false,
};

export function DeleteBusinessImageReducer(state = initialState, action) {
  switch (action.type) {
    case DELETEBUSINESSIMAGE_DATA:
      return {
        ...state,
        addUser: true,
        response: action.payload,
      };
    case DELETEBUSINESSIMAGE_ERROR:
      return {
        ...state,
        addUser: false,
        response: action.payload,
      };

    default:
      return state;
  }
}