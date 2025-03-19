import { SENDGIFTS_DATA, SENDGIFTS_ERROR } from "../type";


const initialState = {
  response: null,
  addUser: false,
};

export function SendGiftsReducer(state = initialState, action) {
  switch (action.type) {
    case SENDGIFTS_DATA:
      return {
        ...state,
        addUser: true,
        response: action.payload,
      };
    case SENDGIFTS_ERROR:
      return {
        ...state,
        addUser: false,
        response: action.payload,
      };

    default:
      return state;
  }
}