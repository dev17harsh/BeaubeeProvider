import { GETLEFTBOOKINGS_DATA, GETLEFTBOOKINGS_ERROR } from "../type";


const initialState = {
  response: null,
  addUser: false,
};

export function GetLeftBookingsReducer(state = initialState, action) {
  switch (action.type) {
    case GETLEFTBOOKINGS_DATA:
      return {
        ...state,
        addUser: true,
        response: action.payload,
      };
    case GETLEFTBOOKINGS_ERROR:
      return {
        ...state,
        addUser: false,
        response: action.payload,
      };

    default:
      return state;
  }
}