import { UPDATEFUTUREBOOKINGS_DATA, UPDATEFUTUREBOOKINGS_ERROR } from "../type";


const initialState = {
  response: null,
  addUser: false,
};

export function UpdateFutureBookingsReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATEFUTUREBOOKINGS_DATA:
      return {
        ...state,
        addUser: true,
        response: action.payload,
      };
    case UPDATEFUTUREBOOKINGS_ERROR:
      return {
        ...state,
        addUser: false,
        response: action.payload,
      };

    default:
      return state;
  }
}