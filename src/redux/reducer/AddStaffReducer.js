import { ADDSTAFF_DATA, ADDSTAFF_ERROR } from "../type";


const initialState = {
  response: null,
  addUser: false,
};

export function AddStaffReducer(state = initialState, action) {
  switch (action.type) {
    case ADDSTAFF_DATA:
      return {
        ...state,
        addUser: true,
        response: action.payload,
      };
    case ADDSTAFF_ERROR:
      return {
        ...state,
        addUser: false,
        response: action.payload,
      };

    default:
      return state;
  }
}