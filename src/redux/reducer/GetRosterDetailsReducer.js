import { GETROSTERDETAILS_DATA, GETROSTERDETAILS_ERROR } from "../type";


const initialState = {
  response: null,
  addUser: false,
};

export function GetRosterDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case GETROSTERDETAILS_DATA:
      return {
        ...state,
        addUser: true,
        response: action.payload,
      };
    case GETROSTERDETAILS_ERROR:
      return {
        ...state,
        addUser: false,
        response: action.payload,
      };

    default:
      return state;
  }
}