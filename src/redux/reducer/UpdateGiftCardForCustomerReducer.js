import { UPDATEGIFTCARDCUSTOMER_DATA, UPDATEGIFTCARDCUSTOMER_ERROR } from "../type";


const initialState = {
  response: null,
  addUser: false,
};

export function UpdateGiftCardForCustomerReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATEGIFTCARDCUSTOMER_DATA:
      return {
        ...state,
        addUser: true,
        response: action.payload,
      };
    case UPDATEGIFTCARDCUSTOMER_ERROR:
      return {
        ...state,
        addUser: false,
        response: action.payload,
      };

    default:
      return state;
  }
}