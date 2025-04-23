import { UPDATEQUEUEBTNSTATUS_DATA, UPDATEQUEUEBTNSTATUS_ERROR } from "../type";


const initialState = {
  response: null,
  addUser: false,
};

export function UpdateQueueBtnStatusReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATEQUEUEBTNSTATUS_DATA:
      return {
        ...state,
        addUser: true,
        response: action.payload,
      };
    case UPDATEQUEUEBTNSTATUS_ERROR:
      return {
        ...state,
        addUser: false,
        response: action.payload,
      };

    default:
      return state;
  }
}