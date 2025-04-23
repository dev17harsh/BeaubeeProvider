import { FINDNEWCUSTOMERPROFILE_DATA, FINDNEWCUSTOMERPROFILE_ERROR } from "../type";


const initialState = {
  response: null,
  addUser: false,
};

export function FindCustomerProfileReducer(state = initialState, action) {
  switch (action.type) {
    case FINDNEWCUSTOMERPROFILE_DATA:
      return {
        ...state,
        addUser: true,
        response: action.payload,
      };
    case FINDNEWCUSTOMERPROFILE_ERROR:
      return {
        ...state,
        addUser: false,
        response: action.payload,
      };

    default:
      return state;
  }
}