import { GETPREPAIDPACKAGE_DATA, GETPREPAIDPACKAGE_ERROR } from "../type";


const initialState = {
  response: null,
  addUser: false,
};

export function GetPrepaidPackageReducer(state = initialState, action) {
  switch (action.type) {
    case GETPREPAIDPACKAGE_DATA:
      return {
        ...state,
        addUser: true,
        response: action.payload,
      };
    case GETPREPAIDPACKAGE_ERROR:
      return {
        ...state,
        addUser: false,
        response: action.payload,
      };

    default:
      return state;
  }
}