import { GETCUSTOMERDETAILS_DATA, GETCUSTOMERDETAILS_ERROR } from "../type";


const initialState = {
  response: null,
  addUser: false,
};

export function GetCustomerDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case GETCUSTOMERDETAILS_DATA:
      return {
        ...state,
        addUser: true,
        response: action.payload,
      };
    case GETCUSTOMERDETAILS_ERROR:
      return {
        ...state,
        addUser: false,
        response: action.payload,
      };

    default:
      return state;
  }
}