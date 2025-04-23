import { GETGIFTCARDCUSTOMER_DATA, GETGIFTCARDCUSTOMER_ERROR } from "../type";


const initialState = {
  response: null,
  addUser: false,
};

export function GetGiftCardForCustomerReducer(state = initialState, action) {
  switch (action.type) {
    case GETGIFTCARDCUSTOMER_DATA:
      return {
        ...state,
        addUser: true,
        response: action.payload,
      };
    case GETGIFTCARDCUSTOMER_ERROR:
      return {
        ...state,
        addUser: false,
        response: action.payload,
      };

    default:
      return state;
  }
}