import { UPDATEBUSINESSPROFILE_DATA, UPDATEBUSINESSPROFILE_ERROR } from "../type";


const initialState = {
  response: null,
  addUser: false,
};

export function UpdateBusinessProfileReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATEBUSINESSPROFILE_DATA:
      return {
        ...state,
        addUser: true,
        response: action.payload,
      };
    case UPDATEBUSINESSPROFILE_ERROR:
      return {
        ...state,
        addUser: false,
        response: action.payload,
      };

    default:
      return state;
  }
}