import { GETALLSERVICES_DATA, GETALLSERVICES_ERROR } from "../type";


const initialState = {
  response: null,
  addUser: false,
};

export function GetAllServicesReducer(state = initialState, action) {
  switch (action.type) {
    case GETALLSERVICES_DATA:
      return {
        ...state,
        addUser: true,
        response: action.payload,
      };
    case GETALLSERVICES_ERROR:
      return {
        ...state,
        addUser: false,
        response: action.payload,
      };

    default:
      return state;
  }
}