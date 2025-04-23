import { DELETEROSTER_DATA, DELETEROSTER_ERROR } from "../type";


const initialState = {
  response: null,
  addUser: false,
};

export function DeleteRosterReducer(state = initialState, action) {
  switch (action.type) {
    case DELETEROSTER_DATA:
      return {
        ...state,
        addUser: true,
        response: action.payload,
      };
    case DELETEROSTER_ERROR:
      return {
        ...state,
        addUser: false,
        response: action.payload,
      };

    default:
      return state;
  }
}