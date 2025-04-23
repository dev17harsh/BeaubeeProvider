import { GETQUEUE_DATA, GETQUEUE_ERROR } from "../type";


const initialState = {
  response: null,
  addUser: false,
};

export function GetQueueReducer(state = initialState, action) {
  switch (action.type) {
    case GETQUEUE_DATA:
      return {
        ...state,
        addUser: true,
        response: action.payload,
      };
    case GETQUEUE_ERROR:
      return {
        ...state,
        addUser: false,
        response: action.payload,
      };

    default:
      return state;
  }
}