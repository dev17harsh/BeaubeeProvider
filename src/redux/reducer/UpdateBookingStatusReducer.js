import { UPDATEBOOKINGSTATUS_DATA, UPDATEBOOKINGSTATUS_ERROR } from "../type";


const initialState = {
  response: null,
  addUser: false,
};

export function UpdateBookingStatusReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATEBOOKINGSTATUS_DATA:
      return {
        ...state,
        addUser: true,
        response: action.payload,
      };
    case UPDATEBOOKINGSTATUS_ERROR:
      return {
        ...state,
        addUser: false,
        response: action.payload,
      };

    default:
      return state;
  }
}