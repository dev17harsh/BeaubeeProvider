import { GETBOOKINGS_DATA, GETBOOKINGS_ERROR } from "../type";


const initialState = {
  response: null,
  addUser: false,
};

export function GetBookingsReducer(state = initialState, action) {
  switch (action.type) {
    case GETBOOKINGS_DATA:
      return {
        ...state,
        addUser: true,
        response: action.payload,
      };
    case GETBOOKINGS_ERROR:
      return {
        ...state,
        addUser: false,
        response: action.payload,
      };

    default:
      return state;
  }
}