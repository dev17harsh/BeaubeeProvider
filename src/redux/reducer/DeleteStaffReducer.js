import { DELETESTAFF_DATA, DELETESTAFF_ERROR } from "../type";


const initialState = {
  response: null,
  addUser: false,
};

export function DeleteStaffReducer(state = initialState, action) {
  switch (action.type) {
    case DELETESTAFF_DATA:
      return {
        ...state,
        addUser: true,
        response: action.payload,
      };
    case DELETESTAFF_ERROR:
      return {
        ...state,
        addUser: false,
        response: action.payload,
      };

    default:
      return state;
  }
}