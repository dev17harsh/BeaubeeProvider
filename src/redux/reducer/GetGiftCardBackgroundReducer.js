import { GETGIFTCARDBACKGROUND_DATA, GETGIFTCARDBACKGROUND_ERROR } from "../type";


const initialState = {
  response: null,
  addUser: false,
};

export function GetGiftCardBackgroundReducer(state = initialState, action) {
  switch (action.type) {
    case GETGIFTCARDBACKGROUND_DATA:
      return {
        ...state,
        addUser: true,
        response: action.payload,
      };
    case GETGIFTCARDBACKGROUND_ERROR:
      return {
        ...state,
        addUser: false,
        response: action.payload,
      };

    default:
      return state;
  }
}