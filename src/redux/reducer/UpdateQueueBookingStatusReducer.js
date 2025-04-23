import { UPDATEQUEUEBOOKINGSTATUS_DATA, UPDATEQUEUEBOOKINGSTATUS_ERROR } from "../type";


const initialState = {
  response: null,
  addUser: false,
};

export function UpdateQueueBookingStatusReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATEQUEUEBOOKINGSTATUS_DATA:
      return {
        ...state,
        addUser: true,
        response: action.payload,
      };
    case UPDATEQUEUEBOOKINGSTATUS_ERROR:
      return {
        ...state,
        addUser: false,
        response: action.payload,
      };

    default:
      return state;
  }
}